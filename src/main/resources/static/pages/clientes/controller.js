var api=backend+'/clientes';

var state ={
    list: new Array(),
    item : {id:"", nombre:"",correo:"",telefono:""},
    mode: "" // ADD, EDIT
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
    //document.getElementById("new").addEventListener("click",ask);

    //document.getElementById("itemoverlay").addEventListener("click",toggle_itemview);

    document.querySelector("#itemview #Crear").addEventListener("click",add);
    //document.querySelector("#itemview #cancelar").addEventListener("click",toggle_itemview);

    // state_json = sessionStorage.getItem("clientes");
    // if(!state_json) {
    //}
   // else{
    //    state = JSON.parse(state_json);
        document.getElementById("search").value = state.item.id;
     //   render_list_Clientes();
   // }
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
    listado.innerHTML="";
    state.list.forEach( item=>render_list_Clientes_item(listado,item));
}

function render_list_Clientes_item(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td></td><td>${item.id}</td>
					<td>${item.nombre}</td>
					<td>${item.correo}</td>
					<td>${item.telefono}</td>`;
    listado.append(tr);
}
