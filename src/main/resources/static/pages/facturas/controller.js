var api=backend+'/facturas';

var state ={
    list: new Array(),
    item: { codigo: "", total: 0, cliente: "", proveedor: "" },
    itemF: {codigo:"" , proveedoridf: "", clientenum: "", total:0},
    mode: ""
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;}
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

function render_list(){
    var listado=document.getElementById("list");
    listado.innerHTML="";
    state.list.forEach( itemF=>render_list_item(listado,itemF));
}

function render_list_item(listado,itemF){
    var tr =document.createElement("tr");

    tr.innerHTML = `
        <td>${itemF.codigo}</td>
        <td>${itemF.proveedoridf}</td>
        <td>${itemF.clientenum}</td>
        <td>${itemF.total}</td>
        <td id="xml"><img src="../../Images/xml.png"/></td>
        <td id="pdf"><a href='/api/facturas/${itemF.codigo}/pdf' target="_blank"><img src="../../Images/pdf.png"/></a></td>
    `;
    tr.querySelector("#xml").addEventListener("click",()=>{xml(itemF);});
    //tr.querySelector("#pdf").addEventListener("click",()=>{pdf(itemF.codigo);});

    listado.append(tr);
}

function xml(itemF){
    contenido=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Factura>
        <codigo>${itemF.codigo}</codigo>
        <proveedoridf>${itemF.proveedoridf}</proveedoridf>
        <clientenum>${itemF.clientenum}</clientenum>
        <total>${itemF.total}</total>
    </Factura>`;
    var blob = new Blob([contenido], {type: "text/xml"});
    window.open(URL.createObjectURL(blob));
}
