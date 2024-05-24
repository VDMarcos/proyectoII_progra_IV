var api=backend+'/facturas';

var state ={
    list: new Array(),
    item: { codigo: "", total: 0, cliente: "", proveedor: "" },
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
    state.list.forEach( item=>render_list_item(listado,item));
}

function render_list_item(listado,item){
    var tr =document.createElement("tr");

    tr.innerHTML = `
        <td>${item.codigo}</td>
        <td>${item.proveedor}</td>
        <td>${item.cliente}</td>
        <td>${item.total}</td>
        <td id="xml"><img src="../../Images/xml.png"/></td>
        <td id="pdf"><img src="../../Images/pdf.png"/></td>
    `;
    //tr.querySelector("#xml").addEventListener("click",()=>{aprove(item.id);});
    //tr.querySelector("#pdf").addEventListener("click",()=>{reject(item.id);});
    listado.append(tr);
}

