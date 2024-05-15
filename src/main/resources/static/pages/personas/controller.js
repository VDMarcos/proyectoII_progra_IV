var api=backend+'/personas';

var state ={
    list: new Array(),
    item : {cedula:"", nombre:"",sexo:""},
    mode: "" // ADD, EDIT
}

document.addEventListener("DOMContentLoaded",loaded);
document.addEventListener("visibilitychange", unloaded);

async function loaded(event){
    try{ await menu();} catch(error){return;}

    document.getElementById("search").addEventListener("click",search);
    document.getElementById("new").addEventListener("click",ask);

    document.getElementById("itemoverlay").addEventListener("click",toggle_itemview);

    document.querySelector("#itemview #registrar").addEventListener("click",add);
    document.querySelector("#itemview #cancelar").addEventListener("click",toggle_itemview);

    state_json = sessionStorage.getItem("personas");
    if(!state_json) {
        fetchAndList();
    }
    else{
        state = JSON.parse(state_json);
        document.getElementById("nombreBusqueda").value = state.item.nombre;
        render_list();
    }
}

async function unloaded(event){
    if(document.visibilityState==="hidden" && loginstate.logged){
        sessionStorage.setItem("personas", JSON.stringify(state));
    }
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
    tr.innerHTML=`<td>${item.cedula}</td>
					<td>${item.nombre}</td>
					<td><img src='/images/${item.sexo}.png' class='icon' ></td>
					<td id='edit'><img src='/images/edit.png'></td>
                    <td id='delete'><img src='/images/delete.png'></td>`;
    tr.querySelector("#edit").addEventListener("click",()=>{edit(item.cedula);});
    tr.querySelector("#delete").addEventListener("click",()=>{remove(item.cedula);});
    listado.append(tr);
}

function search(){
    nombreBusqueda = document.getElementById("nombreBusqueda").value;
    const request = new Request(api+`/search?nombre=${nombreBusqueda}`,
        {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        render_list();
    })();
}

function ask(){
    empty_item();
    toggle_itemview();
    state.mode="ADD";
    render_item()
}

function toggle_itemview(){
    document.getElementById("itemoverlay").classList.toggle("active");
    document.getElementById("itemview").classList.toggle("active");
}

function empty_item(){
    state.item={cedula:"", nombre:"",sexo:""};
}

function render_item(){
    document.querySelectorAll('#itemview input').forEach( (i)=> {i.classList.remove("invalid");});
    document.getElementById("cedula").value = state.item.cedula;
    document.getElementById("nombre").value = state.item.nombre;
    if ( (['M','F'].includes(state.item.sexo))){
        document.querySelector("input[name='sexo'][value='"+state.item.sexo+"']").checked=true;
    }
    else{
        document.querySelectorAll("input[name='sexo']").forEach( (r)=>{r.checked=false;});
    }
    if(state.mode=="ADD"){
        document.querySelector("#itemview #registrar").hidden=false;
    }
    else{
        document.querySelector("#itemview #registrar").hidden=true;
    }
}

function add(){
    load_item();
    if(!validate_item()) return;
    let request = new Request(api, {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)});  //
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        toggle_itemview();
        fetchAndList();
    })();
}

function load_item(){
    state.item={
        cedula:document.getElementById("cedula").value,
        nombre:document.getElementById("nombre").value,
        sexo:(document.querySelector("input[name='sexo']:checked"))?   // recordar que '?' es como un if, es decir, revisa la primera condicion, si se cumple, realiza
                                                                                // document.querySelector("input[name='sexo']:checked").value
            document.querySelector("input[name='sexo']:checked").value : ""
    };
}

function validate_item(){
    var error=false;

    document.querySelectorAll('input').forEach( (i)=> {i.classList.remove("invalid");});

    if (state.item.cedula.length==0){
        document.querySelector("#cedula").classList.add("invalid");
        error=true;
    }

    if (state.item.nombre.length==0){
        document.querySelector("#nombre").classList.add("invalid");
        error=true;
    }

    if ( !(['M','F'].includes(state.item.sexo))){
        document.querySelectorAll("input[name='sexo']").forEach(e=>e.classList.add("invalid"));
        error=true;
    }

    return !error;
}

function edit(id){
      let request = new Request(backend+`/personas/${id}`,
          {method: 'GET', headers: {}});
      (async ()=>{
          const response = await fetch(request);
          if (!response.ok) {errorMessage(response.status);return;}
          state.item = await response.json();
          toggle_itemview();
          state.mode="EDIT";
          render_item();
      })();
  }

function remove(id){
      let request = new Request(backend+`/personas/${id}`,
          {method: 'DELETE', headers: {}});
      (async ()=>{
          const response = await fetch(request);
          if (!response.ok) {errorMessage(response.status);return;}
          fetchAndList();
      })();
  }





   



