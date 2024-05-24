var backend="http://localhost:8080/api";
var api_login=backend+'/login';

var loginstate ={
    logged: false,
    user : {id:"", rol:""}
}

async function checkuser(){
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
    await checkuser();
    if (!loginstate.logged
            && document.location.pathname != "/pages/login/view.html") {
        document.location = "/pages/login/view.html";
        throw new Error("Usuario no autorizado");
    }
    render_menu();
}
function render_menuA() {
        html = `
            <div class="logo">
                <span>Personas</span>
                 <img src="/Images/logo.png">
            </div>
            <div>
                <ul class="Menu">
                    <li id="bienvenidalink"><a href="#"> Bienvenida</a></li>          
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
}



function render_menu() {
    if (!loginstate.logged) {
        html = `
            <div class="logo">
                <span>Sistema <span></span></span>
                <img src="/Images/logo.png">
                <span></span>
            </div>
            <div>
                <ul class="Menu">
                    <li id="loginlink"><a href="#"> Login</a></li>
                    <li id="bienvenidalink"><a href="#"> Bienvenida</a></li>
                </ul>
            </div>
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
        document.querySelector("#menu #loginlink").addEventListener('click', ask);
        render_loginoverlay();
        render_loginview();
    }
    else {
        html = `
            <div class="logo">
                <span>Personas</span>
                 <img src="/Images/logo.png">
            </div>
            <div>
                <ul class="Menu">
                    <li id="bienvenidalink"><a href="#"> Bienvenida</a></li>
                    <li id="clienteslink"><a href="#"> Clientes</a></li>
                    <li id="productoslink"><a href="#"> Productos</a></li>  
                    <li id="facturarlink"><a href="#"> Facturar</a></li>  
                     <li id="facturaslink"><a href="#"> Facturas</a></li>          
                    <li id="logoutlink"><a href="#"> Logout</a></li>
                </ul>
            </div>
            <div class="user" id="user">&nbsp &nbsp ${loginstate.user.id}</div>
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
        document.querySelector("#menu #facturarlink").addEventListener('click', e => {
            document.location = "/pages/facturar/view.html";
        });
        document.querySelector("#menu #facturaslink").addEventListener('click', e => {
            document.location = "/pages/facturas/view.html";
        });
        document.getElementById("user").addEventListener('click', e => {
            document.location = "/pages/usuario/view.html";
        });
    }
}

function render_loginoverlay() {
    html = `
        <div id="loginoverlay" class="loginoverlay"></div>
    `;
    overlay=document.createElement('div');
    overlay.innerHTML=html;
    document.body.appendChild(overlay);
    document.querySelector("#loginoverlay").addEventListener("click",toggle_loginview);
}

function render_loginview() {
    html = `
    <div id="loginview" class='loginview'>
        <div class='col-12'>
            <div>
                <form name="formulario">
                    <div class='container'>
                        <div><img class="logoForm" src="/Images/logo.png"></div>  
                        <div class='row'><div class='col-12 text-centered cooper'>Login</div></div>
                        <div class='row'><div class='col-3 text-right'>Id</div><div class='col-6'><input type="text" name="id" id="id" value=""></div></div>
                        <div class='row'><div class='col-3 text-right'>Clave</div><div class='col-6'><input type="password" name="password" id="clave" value=""></div></div>
                        <div class='row'>
                            <div class='col-6 text-centered cooper'>
                                <input id="login" class="boton" type="button" value="Login">
                                &nbsp
                                <input id="cancelar" class="boton" type="button" value="Cancelar">
                                <input id="registro" class="boton" type="button" value="registrarse">
                            </div>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>    
    `;
    view=document.createElement('div');
    view.innerHTML=html;
    document.body.appendChild(view);
    document.querySelector("#loginview #login").addEventListener("click",login);
    document.querySelector("#loginview #cancelar").addEventListener("click",toggle_loginview);
    document.getElementById("registro").addEventListener("click", registro )
}

function ask(event){
    event.preventDefault();
    toggle_loginview();
    document.querySelectorAll('#loginview input').forEach( (i)=> {i.classList.remove("invalid");});
    document.querySelector("#loginview #id").value = "";
    document.querySelector("#loginview #password").value = "";
}

function toggle_loginview(){
    document.getElementById("loginoverlay").classList.toggle("active");
    document.getElementById("loginview").classList.toggle("active");
}

function login(){
    let user={id:document.getElementById("id").value,
        clave:document.getElementById("clave").value
    };
    let request = new Request(api_login+'/login', {method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        loginstate.user = await response.json();
        if(loginstate.user.rol==="PRO"){document.location="/pages/clientes/view.html";}
        else{
            loginstate.logged=true;
            document.location="/pages/admin/view.html";

        }

    })();
}

function registro(){
        document.location="/pages/registro/view.html";
}

function logout(event){
    event.preventDefault();
    let request = new Request(api_login+'/logout', {method: 'POST'});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}

        sessionStorage.clear();
        loginstate.logged = false;

        document.location="/pages/login/view.html";
    })();
}

function errorMessage(status,place){
    switch(status){
        case 404: error= "Registro no encontrado"; break;
        case 409: error="Registro duplicado"; break;
        case 401: error="Usuario no autorizado"; break;
        case 403: error="Usuario no tiene derechos"; break;
        case 405: error="Campos vacios";break;
    }
    window.alert(error);
}


