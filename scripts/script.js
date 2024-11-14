function ReiniciarFormulario(){
    const elementos = document.querySelectorAll('.text-danger');
    elementos.forEach(elemento => {
    elemento.classList.add('oculto');
    });
    document.getElementById('formulario').reset();
    let notificacion = document.getElementById("notificacion")
    notificacion.classList.remove("oculto")

}

function ValidarNombre(nombre){
    let nombreRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+( [A-Za-záéíóúÁÉÍÓÚñÑ]+)+$/;   
    let errorNombre = document.getElementById("errorNombre")
    let esValido = true
    console.log(nombreRegex.test(nombre))
    if(!nombreRegex.test(nombre)){
        esValido = false
        errorNombre.classList.remove("oculto")
    }else{
        errorNombre.classList.add("oculto")

    }
    return esValido

}

function ValidarEmail(email){
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    let emailError = document.getElementById("errorEmail")
    let esValido = true
    console.log(emailRegex.test(email))
    if(!emailRegex.test(email)){
        esValido = false
        emailError.classList.remove("oculto")
    }else{
        emailError.classList.add("oculto")

    }
    return esValido


}
function ValidarContrasena(){
    let contrasena = document.getElementById("contrasena")
    if(contrasena.value.length>=4){
        return true
    }else{
        return false
    }
}
function ValidarMensaje(){
    let mensaje = document.getElementById("mensaje").value
    let mensajeError = document.getElementById("errorMensaje")
    let esValido = true

    if(!mensaje){
        esValido = false
        mensajeError.classList.remove("oculto")
    }else{
        mensajeError.classList.add("oculto")
    }
    return esValido
}


function ValidarFormularioContacto(){
    let errorCampos = document.getElementById("errorCampos")
    let email = document.getElementById("email").value
    let nombre = document.getElementById("nombre").value
    let mensaje = document.getElementById("mensaje").value

    if(!email || !nombre || !mensaje){
        errorCampos.classList.remove("oculto")
    }else{
        errorCampos.classList.add("oculto")
        if(ValidarNombre(nombre) == true && ValidarEmail(email) == true && ValidarMensaje() == true){
            ReiniciarFormulario()

        }

    }



}
    
//eliminar un elemento
document.getElementById('formulario').addEventListener('click', function(event) {
  if (event.target.classList.contains('row')) {
    const elemento = event.target.parentElement;
    elemento.remove();
  }
});

/*añadir nuevo administrador de eventos
(function() {
    // Referencias locales a los elementos
    const btnMostrar = document.getElementById('btnMostrar');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnAgregar= document.getElementById('btnAgregar');


    const nuevoTipo = document.getElementById('agregarNuevo');

    // Mostrar el div cuando se hace clic en "Mostrar"
    btnMostrar.addEventListener('click', function() {
      nuevoTipo.classList.remove('oculto');  // Muestra el div
    });

    // Mostrar el div cuando se hace clic en "Mostrar"
     btnCancelar.addEventListener('click', function() {
         nuevoTipo.classList.add('oculto');  // Muestra el div
    });

    // Mostrar el div cuando se hace clic en "Mostrar"
    btnAgregar.addEventListener('click', function() {
        AnadirNuevoAdministrador()

    });
    function AnadirNuevoAdministrador(){
        let errorCampos = document.getElementById("errorCampos")
        let errorNombre = document.getElementById("errorNombre")
        let errorEmail = document.getElementById("errorEmail")
        let nombre = document.getElementById("nombreNuevo").value
        let email = document.getElementById("emailNuevo").value
        const formulario = document.getElementById('formulario');
        if(ValidarNombre(nombre) == true && ValidarEmail(email) == true 
        && ValidarContrasena()==true){
            errorNombre.classList.add("oculto")
            errorEmail.classList.add("oculto")
            errorCampos.classList.add("oculto")

        }

    }
            //obtengo el total de administradores y lo uso como id del nuevo administrador
            let cantidadAdministradores = formulario.children.length++;
        
          // Crear el nuevo bloque de HTML que se va a insertar que representa una nuevo tipo de entrada
          const nuevoElementoHTML = `
                <div class="row ">
        <div class="col-md-3">Nombre           
          <input value="${nombre}" pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ]+( [A-Za-záéíóúÁÉÍÓÚñÑ]+)+$" placeholder="Nombre Completo" type="text" class="form-control edicionDeshabilitada " id="nombre1" aria-describedby="emailHelp">
        </div>
        <div class="col-md-3">Email           
          <input value="${email}" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="email@ejemplo.com" type="email" class="form-control edicionDeshabilitada " id="email1" aria-describedby="emailHelp">
        </div>
        <div class="col-md-3">Estado 
          <select class="form-select" onchange="EliminarAdmin(this.value,'estadoAdmin1')" id="estadoAdmin1" aria-label="Default select example">
            <option  value="1" selected>Activo</option>
            <option  value="0">Inactivo</option>
        </select>
        </div>
        <div class="col-md-3">
          <div class="d-flex justify-content-center">
            <button class="btn btn-primary btn-sm me-2">
              Guardar
            </button>
          </div>
        </div>
      </div>
      <hr>
        
        
          
        
          // Crear un contenedor temporal para el HTML
          const contenedorTemporal = document.createElement('div');
          contenedorTemporal.innerHTML = nuevoElementoHTML;
        
        
        
          // Obtener el antepenúltimo lugar
          const antepenultimoElemento = formulario.children[formulario.children.length - 2];
        
          // Insertar el nuevo bloque en el antepenúltimo lugar
          formulario.insertBefore(contenedorTemporal.firstElementChild, antepenultimoElemento);
          nuevoTipo.classList.add('oculto');  // oculto el div


          document.getElementById('formulario').reset()

    
        }else{
            errorCampos.classList.remove("oculto")
        }
      }

 

        const btnNuevo = document.getElementById('btnNuevo');
        const agregarNuevo = document.getElementById('agregarNuevo');

        btnNuevo.addEventListener('click', () => {
            agregarNuevo.classList.toggle('d-none');
        });*/

     




