var api=backend+'/clientes';

var state ={
    list: new Array(),
    item : {id:"", nombre:"", correo:"", telefono:"", proveedoridc:""},
    itemE: {id:"", nombre:"", correo:"", telefono:"", proveedoridc:""},
    mode: "", // ADD, EDIT
    nomBus: ""
}

document.addEventListener("DOMContentLoaded",loaded);
document.addEventListener("visibilitychange", unloaded);

async function loaded(event){
    try{ await menu();} catch(error){return;}

    document.getElementById("iconoBuscar").addEventListener("click",search);

    document.getElementById("Crear").addEventListener("click",add);

    state_json = sessionStorage.getItem("ListaClientes");
    if(!state_json) {
        fetchAndListClientes();
    }
    else{
        state=JSON.parse(state_json);
        if(state.mode=="search"){
            document.getElementById("search").value=state.nomBus;
            //await search();
        }
        if(state.mode=="EDIT"){render_item();}
        if(state.mode=="ADD"){fetchAndListClientes();}
        render_list_Clientes();
    }
}

async function unloaded(event){
    if(document.visibilityState==="hidden" && loginstate.logged){
        sessionStorage.setItem("ListaClientes", JSON.stringify(state));
    }
}

function fetchAndListClientes(){
    const request = new Request(api + '/get', {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        render_list_Clientes();
    })();
}

function render_list_Clientes(){
    var listado=document.getElementById("listClientes");
    listado.innerHTML='';
    state.list.forEach( item=>render_list_Clientes_item(listado,item));
}

function render_list_Clientes_item(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=  `<td id="checkC"><img src="../../Images/check.png" id="edit2"></td>
                    <td>${item.id}</td>
					<td>${item.nombre}</td>
					<td>${item.correo}</td>
					<td>${item.telefono}</td>
                    <td id="editC"><img src="../../Images/editar.png" id="edit1"></td>`;
    tr.querySelector("#editC").addEventListener("click",()=>{edit(item.id);});
    //tr.querySelector("#checkC").addEventListener("click",()=>{remove(item.id);})   // aca hay que agregar la funcionalidad del check
    listado.append(tr);
}

function search(){
    nombreBusqueda = document.getElementById("search").value;
    state.nomBus = nombreBusqueda;
    state.mode="search";
    const request = new Request(api+`/search?nombre=${nombreBusqueda}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        await render_list_Clientes();
    })();
}

function add(){
    load_item();
    state.mode="ADD";
    if(validate()) return;
    let request = new Request(api+`/add`, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessageC(response.status);return;}
        fetchAndListClientes();
        document.getElementById("Crear").value = "Crear";
    })();
}

function load_item(){
    state.item = {
        id:document.getElementById("idForm").value,
        nombre:document.getElementById("nombreForm").value,
        correo:document.getElementById("correoForm").value,
        telefono:document.getElementById("telForm").value,
        proveedoridc:loginstate.user.id
    };
}

function validate(){
    let error = false;

    // Limpiar cualquier clase de error previa
    document.querySelectorAll('input').forEach((i) => { i.classList.remove("invalid"); });

    if (state.item.nombre.length === 0) {
        document.querySelector("#nombreForm").classList.add("invalid");
        error = true;
    }

    if (state.item.id.length === 0) {
        document.querySelector("#idForm").classList.add("invalid");
        error = true;
    }

    if (state.item.correo.length === 0) {
        document.querySelector("#correoForm").classList.add("invalid");
        error = true;
    }

    if (state.item.telefono.length === 0) {
        document.querySelector("#telForm").classList.add("invalid");
        error = true;
    }

    if (error) {
        errorMessageC(405);
    }
    return error;
}

function errorMessageC(code) {
    let message;
    switch (code) {
        case 405:
            message = "Por favor, complete todos los campos.";
            break;
        case 409:
            message = "Error al añadir el item, debido a que, esta repetido. Intente nuevamente.";
            break;
        default:
            message = "Ha ocurrido un error.";
    }
    window.alert(message);
}

function edit(id){
    let request = new Request(api+`/get/${id}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.itemE = await response.json();
        //toggle_itemview();
        state.mode="EDIT";
        document.getElementById("Crear").value = "Editar";
        render_item();
    })();
}

function render_item(){
    //document.querySelectorAll('#itemview input').forEach( (i)=> {i.classList.remove("invalid");});
    document.getElementById("idForm").value = state.itemE.id;
    document.getElementById("nombreForm").value = state.itemE.nombre;
    document.getElementById("correoForm").value = state.itemE.correo;
    document.getElementById("telForm").value = state.itemE.telefono;
}