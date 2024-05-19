var api=backend+'/productos';

var state ={
    list: new Array(),
    item : {codigo:"", nombre:"",cantidad:"", precio:0,proveedor:""},
    mode: "" // ADD, EDIT
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{await menu();} catch(error){return;}

    document.getElementById("iconoBuscar").addEventListener("click",search);
    document.getElementById("crear").addEventListener("click",add);

    fetchAndListProductos(loginstate.user.id);
}

function fetchAndListProductos(proveedor){
    const request = new Request(api+`/${proveedor}`, {method: 'GET', headers: { }});

    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        render_list();
    })();
}

function render_list(){
    var listado=document.getElementById("list");
    listado.innerHTML="";

    state.list.forEach( item=>render_list_item(listado,item));
}

function render_list_item(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td id='check'><img src='../../Images/check.png'></td>
                    <td>${item.codigo}</td>
					<td>${item.nombre}</td>
					<td>${item.cantidad}</td>
					<td>${item.precio}</td>
					<td id='edit4'><img src='../../Images/editar.png'></td>`;
    tr.querySelector("#edit4").addEventListener("click",()=>{edit(item.codigo);});

    listado.append(tr);
}

function edit(codigo){
    proveedorId=loginstate.user.id;
    let request = new Request(api+`/edit/${codigo}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.item = await response.json();
        state.mode="EDIT";
        render_item();
    })();
}

function render_item(){
    document.getElementById("codigo").value = state.item.codigo;
    document.getElementById("nombre").value = state.item.nombre;
    document.getElementById("cantidad").value=state.item.cantidad;
    document.getElementById("precio").value=state.item.precio;

}

function add(){
    load_item();

    //if(!validate_item()) return;
    let request = new Request(api, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        fetchAndListProductos(loginstate.user.id);
    })();
}

function load_item(){
    state.item={
        codigo:document.getElementById("codigo").value,
        nombre:document.getElementById("nombre").value ,
        cantidad:document.getElementById("cantidad").value,
        precio:document.getElementById("precio").value,

    };
}

function search(){
    nombreBusqueda = document.getElementById("search").value;

    const request = new Request(api+`/search?nombre=${nombreBusqueda}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        console.log("Response list: ", state.list);
        render_list();
    })();
}