var api=backend+'/facturar';

var state ={
    listProductos: new Array(),
    Cliente: {id:"", nombre:"", correo:"", telefono:"", proveedoridc:""},
    Producto: {codigo:"", nombre:"",cantidad:"", precio:0,proveedor:""},
    itemF : {codigo:"", total:0,cliente:"", precio:0,proveedor:""},
    item : {cantidad:0, monto:0, producto:"", cliente:"", facturaID:""},
    mode: "" // ADD, EDIT
}

document.addEventListener("DOMContentLoaded",loaded);
document.addEventListener('visibilitychange',unloaded)

async function loaded(event){
    try{await menu();} catch(error){return;}

    document.getElementById("prov").textContent=loginstate.user.id;

    document.getElementById("edit2").addEventListener("click",searchC);
    document.getElementById("edit1").addEventListener("click",searchC);
    document.getElementById("edit4").addEventListener("click",searchP);
    document.getElementById("edit5").addEventListener("click",searchP);
    //document.getElementById("edit6").addEventListener("click",removeProducto);
   // document.getElementById("edit7").addEventListener("click",subir);
   // document.getElementById("edit8").addEventListener("click",bajar);
    document.getElementById("guardar").addEventListener("click",add);


    state_json=sessionStorage.getItem("factura");

    if(!state_json){
        //render();
    }else{
        state=JSON.parse(state_json);
        if(state.mode=="EDIT"){render();}
    }
    state.listProductos=[];
    state.Cliente.codigo="undefined";
}

async function unloaded(event){
    if (document.visibilityState=="hidden"&& loginstate.logged){
        sessionStorage.setItem("factura",JSON.stringify(state));
    }
}


function F(){
    var listado=document.getElementById("listFac");
    listado.innerHTML="";

    state.listProductos.forEach( itemP=>render_factura(listado,itemP));

}

function render() {
    const listFac = document.getElementById("listFac");
    listFac.innerHTML = ''; // Limpiar todo el contenido existente

    // Agregar elementos estáticos como el encabezado de Proveedor, Cliente y Producto
    const staticRows = `
        <tr>
            <th></th>
            <th>Proveedor:</th>
            <th id="prov">${loginstate.user.id}</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
        <tr id="formClienteRow">
            <th></th>
            <th>Cliente: </th>
            <th>
                <input type="text" id="search" name="nombre" placeholder="Buscar cliente por codigo...">
            </th>
            <td>
                <img id="edit2" src="../../Images/check.png"/>
            </td>
            <td>
                <img id="edit1" src="../../Images/iconoBuscar.png"/>
            </td>
            <td>${state.Cliente.id}</td>
            <th></th>
        </tr>
        <tr id="formProductoRow">
            <th></th>
            <th>Producto: </th>
            <th>
                <input type="text" id="search2" name="nombre" placeholder="Buscar producto por codigo...">
            </th>
            <td>
                <img id="edit4" src="../../Images/check.png"/>
            </td>
            <td>
                <img id="edit5" src="../../Images/iconoBuscar.png"/>
            </td>
            <th></th>
        </tr>
        <tr>
            <th></th>
            <th>Cant.</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Monto</th>
            <th>...</th>
        </tr>
    `;

    listFac.insertAdjacentHTML('beforeend', staticRows);

    // Agregar detalles de productos
    state.listProductos.forEach((itemP, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <img id="edit6" src="../../Images/delete.png"/>
            </td>
            <td>${state.item.cantidad}</td>
            <td>${state.item.producto}</td>
            <td>${state.item.precio}</td>
            <td>${state.item.monto}</td>
            <td>
                <img id="edit7" src="../../Images/subir.png"/>
                <img id="edit8" src="../../Images/bajar.png"/>
            </td>
        `;

        // Añadir estilo de alineación centrada a todas las celdas de la fila
        tr.querySelectorAll("td").forEach(td => {
            td.style.textAlign = "center";
        });

        // Agregar la fila al tbody
        listFac.appendChild(tr);
    });

    // Agregar elementos estáticos como el total
    const totalRow = `
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Total:</th>
            <th id="total"></th>
            <th></th>
        </tr>
    `;
    listFac.insertAdjacentHTML('beforeend', totalRow);

    // Asignar eventos después de que el contenido ha sido agregado al DOM
    document.getElementById("edit2").addEventListener("click", searchC);
    document.getElementById("edit1").addEventListener("click", searchC);
    document.getElementById("edit4").addEventListener("click", searchP);
    document.getElementById("edit5").addEventListener("click", searchP);
    document.getElementById("guardar").addEventListener("click", add);

    // Asignar eventos a los botones de edición de cada producto
    state.listProductos.forEach((itemP, index) => {
        document.getElementById(`edit6-${index}`).addEventListener("click", () => removeProducto(index));
        document.getElementById(`edit7-${index}`).addEventListener("click", () => modificarCantidad(index, 1));
        document.getElementById(`edit8-${index}`).addEventListener("click", () => modificarCantidad(index, -1));
    });
}



// function render() {
//     const detalles = document.getElementById("detalles");
//     while (detalles.firstChild) detalles.removeChild(detalles.firstChild);
//
//     state.listProductos.forEach((itemP, index) => {
//         const tr = document.createElement("tr");
//         tr.className = "table-row-centered"; // Set the class name to match the original table rows
//         tr.innerHTML = `
//             <td>
//                 <img id="edit6" src="../../Images/delete.png"/>
//             </td>
//             <td>${state.item.cantidad}</td>
//             <td>${state.item.producto}</td>
//             <td>${state.item.precio}</td>
//             <td>${state.item.monto}</td>
//             <td>
//                 <img id="edit7" src="../../Images/subir.png"/>
//                 <img id="edit8" src="../../Images/bajar.png"/>
//             </td>
//         `;
//
//         tr.querySelectorAll("td").forEach(td => {
//             td.style.textAlign = "center";
//         });
//
//         // tr.querySelector(`#edit6-${index}`).addEventListener("click", () => {
//         //     removeProducto(index);
//         // });
//         // tr.querySelector(`#edit7-${index}`).addEventListener("click", () => {
//         //     modificarCantidad(index, 1);
//         // });
//         // tr.querySelector(`#edit8-${index}`).addEventListener("click", () => {
//         //     modificarCantidad(index, -1);
//         // });
//         detalles.appendChild(tr);
//     });
//

    //actualizarTotal();
//}

// function render() {
//     const detalles = document.getElementById("detalles");
//     detalles.innerHTML = '';
//
//     state.listProductos.forEach((itemP, index) => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td>
//                 <img id="edit6" src="../../Images/delete.png"/>
//             </td>
//             <td>${state.item.cantidad}</td>
//             <td>${state.item.producto}</td>
//             <td>${state.item.precio}</td>
//             <td>${state.item.monto}</td>
//             <td>
//                 <img id="edit7" src="../../Images/subir.png"/>
//                 <img id="edit8" src="../../Images/bajar.png"/>
//             </td>
//             </tr>
//         `;
//
//         tr.querySelectorAll("td").forEach(td => {
//             td.style.textAlign = "center";
//         });
//         // tr.querySelector(`#edit6-${index}`).addEventListener("click", () => {
//         //     removeProducto(index);
//         // });
//         // tr.querySelector(`#edit7-${index}`).addEventListener("click", () => {
//         //     modificarCantidad(index, 1);
//         // });
//         // tr.querySelector(`#edit8-${index}`).addEventListener("click", () => {
//         //     modificarCantidad(index, -1);
//         // });
//
//         detalles.appendChild(tr);
//     });
//
//     //actualizarTotal();
// }


function render_item() {
    document.getElementById("codigo").value = state.item.codigo;
    document.getElementById("nombre").value = state.item.nombre;
    document.getElementById("cantidad").value = state.item.cantidad;
    document.getElementById("precio").value = state.item.precio;

}

function add() {
    load_item();
    state.mode = "ADD"
    if (!validate_item()) return;
    let request = new Request(api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

function searchC(){
    state.nombreC = document.getElementById("search").value;
    state.mode="search";
    const request = new Request(api+`/searchC?nombreC=${state.nombreC}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.Cliente = await response.json();
        render();
    })();
}

function searchP(){
    state.nombreP = document.getElementById("search2").value;
    state.mode="search";
    const request = new Request(api+`/searchP?nombreC=${state.nombreP}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.Producto = await response.json();
        state.item.producto=state.Producto.nombre;
        state.item.cantidad=1;
        state.item.precio=state.Producto.precio;
        state.item.monto= state.item.cantidad*state.item.precio;
        state.listProductos.push(state.Producto);
        render();
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