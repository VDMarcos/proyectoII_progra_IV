var api=backend+'/registro';

var state ={
    list: new Array(),
    item : {id:"", clave:""},
    mode: "" // ADD, EDIT
}

var state1 ={
    list: new Array(),
    item: {id:"",nombre:"", correo:"",telefono:""},
    mode: ""
}

document.addEventListener("DOMContentLoaded",loaded);
async function loaded(event){
    try{await menuR();} catch(error){return;}

    document.getElementById("crear").addEventListener("click",addUser);
    document.getElementById("proveedor").addEventListener("click",addProveedor);
    //document.getElementById("itemoverlay").addEventListener("click",toggle_itemview);
}

async function menuR(){
    render_menuA();
}

function addUser(){
    load_item();
    //if(!validate_item()) return;
    let request = new Request(api, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        toggle_itemview();
    })();
}

function load_item(){
    state.item={
        id:document.getElementById("idUser").value,
        clave:document.getElementById("claveUser").value
    };
    document.getElementById("idP").value=state.item.id;
}

function toggle_itemview(){

    document.getElementById("itemview").classList.toggle("active");
}

function addProveedor(){
    load_itemP();
    if(!validate_itemp()) return;
    let request = new Request(api+"/proveedor", {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state1.item)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        toggle_itemview();
        document.location="/pages/login/view.html";
    })();
}

function load_itemP(){
    state1.item={
        id:document.getElementById("idP").value,
        nombre:document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value
    };
}

function validate_itemp(){
    var error=false;

    document.querySelectorAll('input').forEach( (i)=> {i.classList.remove("invalid");});

    if (state1.item.id.length==0){
        document.querySelector("#idP").classList.add("invalid");
        error=true;
    }

    if (state1.item.nombre.length==0){
        document.querySelector("#nombre").classList.add("invalid");
        error=true;
    }
    if (state1.item.correo.length==0){
        document.querySelector("#correo").classList.add("invalid");
        error=true;
    }
    if (state1.item.telefono.length==0){
        document.querySelector("#telefono").classList.add("invalid");
        error=true;
    }


    return !error;
}

function validate_item(){
    var error=false;

    document.querySelectorAll('input').forEach( (i)=> {i.classList.remove("invalid");});

    if (state.item.id.length==0){
        document.querySelector("#id").classList.add("invalid");
        error=true;
    }

    if (state.item.clave.length==0){
        document.querySelector("#claveUser").classList.add("invalid");
        error=true;
    }
    return !error;
}