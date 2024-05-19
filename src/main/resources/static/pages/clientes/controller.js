var api=backend+'/clientes';

var state ={
    list: new Array(),
    item : {id:"", nombre:"", correo:"", telefono:"", proveedoridc:""},
    itemE: {id:"", nombre:"", correo:"", telefono:"", proveedoridc:""},
    mode: "", // ADD, EDIT
    nomBus: ""
}

async function checkuserC(){
    let request = new Request(api_login+'/current-user', {method: 'GET'});
    const response = await fetch(request);
    if (response.ok) {
        loginstate.logged = true;
        loginstate.user = await response.json();
    }
    else {
        loginstate.logged = false;
    }
}

async function menu(){
    await checkuserC();
    if (!loginstate.logged
        && document.location.pathname != "/pages/login/view.html") {
        document.location = "/pages/login/view.html";
        throw new Error("Usuario no autorizado");
    }

    await fetchAndListClientes(loginstate.user.id);
    await render_menuC();
}

function render_menuC() {
        html = `
            <div class="logo">
                <span>Sistema<span></span></span>
                 <img src="/Images/logo.png">
            </div>
            <div>
                <ul class="Menu">
                    <li id="bienvenidalink"><a href="#"> Bienvenida</a></li>
                    <li id="clienteslink"><a href="#"> Clientes</a></li>
                    <li id="productoslink"><a href="#"> Productos</a></li>                    
                    <li id="logoutlink"><a href="#"> Logout</a></li>
                </ul>
            </div>
            <div class="user">&nbsp &nbsp ${loginstate.user.id}</div>
        `;

        html2 = `
            <div class="Footer">
            <div class="logoF">
                <span>@factura_electronica.com</span>
                 <img class ="logoF" src="/Images/logo.png">
            </div>
        `;
        document.querySelector('#menu').innerHTML = html;
        document.querySelector('#footer').innerHTML = html2;
        document.querySelector("#menu #logoutlink").addEventListener('click', logout);
        document.querySelector("#menu #bienvenidalink").addEventListener('click', e => {
            document.location = "/pages/login/view.html";
        });
        document.querySelector("#menu #clienteslink").addEventListener('click', e => {
            document.location = "/pages/clientes/view.html";
        });
        document.querySelector("#menu #productoslink").addEventListener('click', e => {
            document.location = "/pages/productos/view.html";
        });
}

document.addEventListener("DOMContentLoaded",loaded);
document.addEventListener("visibilitychange", unloaded);

async function loaded(event){
    try{ await menu();} catch(error){return;}

    document.getElementById("iconoBuscar").addEventListener("click",search);
    //document.getElementById("EditarB").hidden=true;
    //document.getElementById("new").addEventListener("click",ask);

    //document.getElementById("itemoverlay").addEventListener("click",toggle_itemview);

    document.getElementById("Crear").addEventListener("click",add);
    //document.querySelector("#itemview #cancelar").addEventListener("click",toggle_itemview);

    state_json = sessionStorage.getItem("clientes");
    if(!state_json) {
        fetchAndListClientes(loginstate.user.id);
    }
   else{
       state = JSON.parse(state_json);
        if(state.mode=="EDIT") {
            render_item();
            render_list();
            //state.mode=="";
        }
        else
        {
            document.getElementById("search").value = state.nomBus;
            await search();
            sessionStorage.setItem("clientes", JSON.stringify(state));
        }
        sessionStorage.setItem("clientes", JSON.stringify(state));
    }
}

async function unloaded(event){
    if(document.visibilityState==="hidden" && loginstate.logged){
        sessionStorage.setItem("clientes", JSON.stringify(state));
    }
}

function fetchAndListClientes(id){
    const request = new Request(api + `/${id}`, {method: 'GET', headers: { }});
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
    state.mode="search";
    nombreBusqueda = document.getElementById("search").value;
    state.nomBus = nombreBusqueda;
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
    if(validate()) return;
    let request = new Request(api+`/add`, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessageC(response.status);return;}
        //toggle_itemview()
       await fetchAndListClientes(loginstate.user.id);
        document.getElementById("Crear").value = "Crear";
    })();
}

function toggle_itemview(){
    document.getElementById("itemoverlay").classList.toggle("active");
    document.getElementById("itemview").classList.toggle("active");
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
    document.querySelectorAll('#itemview input').forEach( (i)=> {i.classList.remove("invalid");});
    document.getElementById("idForm").value = state.itemE.id;
    document.getElementById("nombreForm").value = state.itemE.nombre;
    document.getElementById("correoForm").value = state.itemE.correo;
    document.getElementById("telForm").value = state.itemE.telefono;
}