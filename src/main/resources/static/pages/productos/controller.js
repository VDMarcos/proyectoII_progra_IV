var api=backend+'/productos';

var state ={
    list: new Array(),
    item : {codigo:"", nombre:"",cantidad:"", precio:0,proveedor:""},
    mode: "" // ADD, EDIT
}

document.addEventListener("DOMContentLoaded",loaded);
document.addEventListener('visibilitychange',unloaded)
async function loaded(event){
    try{await menu();} catch(error){return;}

    document.getElementById("iconoBuscar").addEventListener("click",search);
    document.getElementById("crear").addEventListener("click",add);

    state_json=sessionStorage.getItem("productos");

    if(!state_json){
        fetchAndListProductos();
    }else{
        state=JSON.parse(state_json);
        if(state.mode=="search"){
            document.getElementById("search").value=state.nombre;
        }
        if(state.mode=="EDIT"){render_item();}
        render_list();
    }
}

async function unloaded(event){
    if (document.visibilityState=="hidden"&& loginstate.logged){
        sessionStorage.setItem("productos",JSON.stringify(state));
    }
}

function fetchAndListProductos(){
    const request = new Request(api, {method: 'GET', headers: { }});

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
    state.mode="ADD"
    if(!validate_item()) return;
    let request = new Request(api, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        fetchAndListProductos();
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
    state.nombre = document.getElementById("search").value;
    state.mode="search";
    const request = new Request(api+`/search?nombre=${state.nombre}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        console.log("Response list: ", state.list);
        render_list();
    })();
}

function validate_item(){
    var error=false;

    document.querySelectorAll('input').forEach( (i)=> {i.classList.remove("invalid");});

    if (state.item.codigo.length==0){
        document.querySelector("#codigo").classList.add("invalid");
        error=true;
    }

    if (state.item.nombre.length==0){
        document.querySelector("#nombre").classList.add("invalid");
        error=true;
    }
    if (state.item.cantidad.length==0){
        document.querySelector("#cantidad").classList.add("invalid");
        error=true;
    }
    if (state.item.precio.length==0){
        document.querySelector("#precio").classList.add("invalid");
        error=true;
    }


    return !error;
}