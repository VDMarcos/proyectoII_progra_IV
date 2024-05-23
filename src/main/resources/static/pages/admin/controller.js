var api=backend+'/admin';

var state ={
    list: new Array(),
    item: {id:"",nombre:"", correo:"",telefono:"",estado:false},
    mode: ""
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menuA();} catch(error){return;}
    document.getElementById("iconoBuscar").addEventListener("click", search)
    fetchAndList();
}

function fetchAndList(){
    const request = new Request(api, {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        render_list();
    })();
}

async function menuA(){
    render_menuA();
}

function render_list(){
    var listado=document.getElementById("list");
    listado.innerHTML="";
    state.list.forEach( item=>render_list_item(listado,item));
}

function render_list_item(listado,item){
    var tr =document.createElement("tr");
    // Determinar el estado del item
  var estado;

  if(item.estado){
      estado="Aprovado";
  }
  else{
      estado="Pendiente";
  }

    tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nombre}</td>
        <td>${item.correo}</td>
        <td>${item.telefono}</td>
        <td>${estado}</td>
        <td id="aprove"><img src="../../Images/check.png"/></td>
        <td id="reject"><img src="../../Images/Rechazo.jpg"/></td>
    `;
    tr.querySelector("#aprove").addEventListener("click",()=>{aprove(item.id);});
    tr.querySelector("#reject").addEventListener("click",()=>{reject(item.id);});
    listado.append(tr);
}

function aprove(id){
    let request = new Request(api+`/aprove/${id}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        fetchAndList();
    })();
}

function reject(id){
    let request = new Request(api+`/reject/${id}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        fetchAndList();
    })();
}

function search(){
    nombreBusqueda = document.getElementById("search").value;
    const request = new Request(api+`/search?nombre=${nombreBusqueda}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        render_list();
    })();
}