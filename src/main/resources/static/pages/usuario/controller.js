var api=backend+'/usuario';

var state ={
    list: new Array(),
    item: {id:"",nombre:"", correo:"",telefono:"",estado: true},
    mode: ""
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;}

    document.getElementById("crear").addEventListener("click", add);

    edit();
}

function add(){
    load_item();
    if(!validate_item()) return;
    let request = new Request(api, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        document.location="/pages/clientes/view.html";
    })();
}

function load_item(){
    state.item={
        id:document.getElementById("id").value,
        nombre:document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value
    };
}

function edit(){
    let request = new Request(api, {method: 'GET', headers: {}});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.item = await response.json();
        state.mode="EDIT";
        render_item();

    })();
}

function render_item(){
    //document.querySelectorAll(' input').forEach( (i)=> {i.classList.remove("invalid");});
    document.getElementById("id").value = state.item.id;
    document.getElementById("nombre").value = state.item.nombre;
    document.getElementById("correo").value = state.item.correo;
    document.getElementById("telefono").value = state.item.telefono;

}

function validate_item(){
    var error=false;

    document.querySelectorAll('input').forEach( (i)=> {i.classList.remove("invalid");});

    if (state.item.id.length==0){
        document.querySelector("#id").classList.add("invalid");
        error=true;
    }

    if (state.item.nombre.length==0){
        document.querySelector("#nombre").classList.add("invalid");
        error=true;
    }
    if (state.item.correo.length==0){
        document.querySelector("#correo").classList.add("invalid");
        error=true;
    }
    if (state.item.telefono.length==0){
        document.querySelector("#telefono").classList.add("invalid");
        error=true;
    }


    return !error;
}