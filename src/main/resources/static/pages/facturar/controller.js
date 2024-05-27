var api = backend + '/facturar';

var state = {
    listProductos: [],
    Cliente: { id: "", nombre: "", correo: "", telefono: "", proveedoridc: "" },
    Producto: { codigo: "", nombre: "", cantidad: "", precio: 0, proveedor: "" },
    pp:"",
    itemF: { codigo: "", total: 0, cliente: "", precio: 0, proveedor: "" },
    item: { cantidad: 0, monto: 0, producto: "", cliente: "", facturaID: "", codigo: "" },
    mode: "" // ADD, EDIT
}

document.addEventListener("DOMContentLoaded", loaded);
document.addEventListener('visibilitychange', unloaded);

async function loaded(event) {
    try { await menu(); } catch (error) { return; }

    document.getElementById("prov").textContent = loginstate.user.id;

    document.getElementById("edit2").addEventListener("click", searchC);
    document.getElementById("edit4").addEventListener("click", searchP);
    document.getElementById("guardar").addEventListener("click", add);


    let state_json = sessionStorage.getItem("factura");

    if (state_json) {
        state = JSON.parse(state_json);
    }

    let client = sessionStorage.getItem("idCliente");

    if (client) {
        state.Cliente.id = client;
        sessionStorage.removeItem("idCliente");
    }

    let product = sessionStorage.getItem("idProducto");

    if (product) {
        state.pp = product;
        searchP();
        sessionStorage.removeItem("idProducto");
    }

    render();
}

async function unloaded(event) {
    if (document.visibilityState == "hidden" && loginstate.logged) {
        sessionStorage.setItem("factura", JSON.stringify(state));
    }
}

function render() {
    const listFac = document.getElementById("listFac");
    listFac.innerHTML = ''; // Limpiar todo el contenido existente

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
                <a href="/pages/clientes/View.html"><img id="edit1" src="../../Images/iconoBuscar.png"/></a>
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
                <a href="/pages/productos/view.html"><img id="edit5" src="../../Images/iconoBuscar.png"/></a>
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

    state.listProductos.forEach((itemP, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <img id="edit6" src="../../Images/delete.png"/>
            </td>
            <td>${itemP.cantidad}</td>
            <td>${itemP.nombre}</td>
            <td>${itemP.precio}</td>
            <td>${itemP.cantidad * itemP.precio}</td>
            <td>
                <img id="edit7" src="../../Images/subir.png"/>
                <img id="edit8" src="../../Images/bajar.png"/>
            </td>
        `;

        tr.querySelectorAll("td").forEach(td => {
            td.style.textAlign = "center";
        });

        tr.querySelector(`#edit6`).addEventListener("click", () => { deleteD(itemP.codigo); });
        tr.querySelector(`#edit7`).addEventListener("click", () => { Aumentar(itemP.codigo); });
        tr.querySelector(`#edit8`).addEventListener("click", () => { Disminuir(itemP.codigo); });

        listFac.appendChild(tr);
    });

    const totalRow = `
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Total:</th>
            <th>${state.itemF.total}</th>
            <th></th>
        </tr>
    `;
    listFac.insertAdjacentHTML('beforeend', totalRow);

    document.getElementById("edit2").addEventListener("click", searchC);
    document.getElementById("edit4").addEventListener("click", searchP);
    document.getElementById("guardar").addEventListener("click", add);
}

function deleteD(codigo) {
    state.listProductos = state.listProductos.filter(item => item.codigo !== codigo);
    total();
    render();
}

function Aumentar(codigo){
    let productoExistente2 = state.listProductos.find(item => item.codigo === codigo);
    document.getElementById("search2").value = productoExistente2.codigo;
    searchP();
}

function Disminuir(codigo){
    getP(codigo);
}

function searchP() {
    state.nombreP = document.getElementById("search2").value;
    if(state.nombreP===""){
        state.nombreP=state.pp;
    }
    state.mode = "search";
    const request = new Request(api + `/searchP?nombreC=${state.nombreP}`, { method: 'GET', headers: {} });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) { errorMessageF(407); return; }
        state.Producto = await response.json();
        let productoExistente = state.listProductos.find(item => item.codigo === state.Producto.codigo);
        if (productoExistente) {
            productoExistente.cantidad += 1;
            productoExistente.monto = productoExistente.cantidad * productoExistente.precio;
        } else {
            const nuevoItem = {
                codigo: state.Producto.codigo,
                nombre: state.Producto.nombre,
                cantidad: 1,
                precio: state.Producto.precio,
                monto: state.Producto.precio
            };
            state.listProductos.push(nuevoItem);
        }
        total();
        render();
    })();
}

function getP(id){
    let request = new Request(api+`/get/${id}`,
        {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.Producto = await response.json();
        let productoExistente3 = state.listProductos.find(item => item.codigo === state.Producto.codigo);
        if (productoExistente3&&productoExistente3.cantidad>1) {
            productoExistente3.cantidad -= 1;
            productoExistente3.monto = productoExistente3.cantidad * productoExistente3.precio;
        } else {
            state.item.cantidad=productoExistente3.cantidad-1;
            deleteD()
        }
        //state.listProductos.push(state.Producto);
        total();
        render();
    })();
}

function searchC() {
    state.nombreC = document.getElementById("search").value;
    state.mode = "search";
    const request = new Request(api + `/searchC?nombreC=${state.nombreC}`, { method: 'GET', headers: {} });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) { errorMessageF(408); return; }
        state.Cliente = await response.json();
        render();
    })();
}

function total() {
    let total = 0;
    state.listProductos.forEach(item => {
        total += item.monto;
    });
    state.itemF.total = total;
}

function add() {
    load_item();
    state.mode = "ADD";
    if (!validate_item()) return;
    const request = new Request(api + `/addF?cl=${state.Cliente.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.itemF)
    });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) { errorMessage(response.status); return; }
        addDetalles();
    })();
}

function addDetalles(){
    let request = new Request(api+`/addD`, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state.listProductos)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.listProductos=[];
        state.itemF.total=0;
        state.Cliente.id = "";
        render();
    })();
}

function load_item() {
    state.itemF = {
        cliente: state.Cliente.id,
        total: state.itemF.total,
    };
}

function validate_item() {
    let error = false;
    document.querySelectorAll('input').forEach(i => { i.classList.remove("invalid"); });

    if (state.Cliente.id === "") {
        //document.querySelector("#codigo").classList.add("invalid");
        error = true;
        errorMessageF(405);
    }
    if (state.listProductos.length === 0) {
        //document.querySelector("#nombre").classList.add("invalid");
        error = true;
        errorMessageF(406);
    }
    return !error;
}

function errorMessageF(code) {
    let message;
    switch (code) {
        case 405:
            message = "Por favor, agregue un cliente.";
            break;
        case 406:
            message = "Por favor, agregue al menos 1 producto.";
            break;
        case 407:
            message = "Por favor, agregue un producto.";
            break;
        case 408:
            message = "Por favor, agregue un cliente.";
            break;
        default:
            message = "Ha ocurrido un error.";
    }
    window.alert(message);
}
