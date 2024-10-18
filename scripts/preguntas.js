//eliminar una pregunta
document.getElementById('listadoPreguntas').addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminarPregunta')) {
      const elemento = event.target.closest('#pregunta');
      if (elemento) {
        elemento.remove();
      }
    }
  });


//editar pregunta
document.getElementById('listadoPreguntas').addEventListener('click', function(event) {
  if (event.target.classList.contains('editarPregunta')) {
    let pregunta = event.target.closest('#pregunta');
    let tituloPregunta = pregunta.querySelector('input');
   let contenidoPregunta = pregunta.querySelector('textarea');
    let errorPregunta = pregunta.querySelector("#errorPregunta")
    if( tituloPregunta.value && contenidoPregunta.value){
      errorPregunta.classList.add("oculto")
      if(tituloPregunta.classList.contains('edicionDeshabilitada')){
          tituloPregunta.classList.remove("edicionDeshabilitada")
          contenidoPregunta.classList.remove("edicionDeshabilitada")
          tituloPregunta.focus();
      }else {
          tituloPregunta.classList.add("edicionDeshabilitada")
          contenidoPregunta.classList.add("edicionDeshabilitada")

      }
  }else{
      errorPregunta.classList.remove("oculto")
  }
  }
});


  //agregar nueva  pregunta

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
        AnadirNuevaPregunta()

    });




    function AnadirNuevaPregunta(){
      let error = document.getElementById("errorCamposNuevaPregunta")
      let contenidoPregunta = document.getElementById("contenidoNuevaPregunta").value
      let nuevaPregunta = document.getElementById("nuevaPregunta").value
      const listadoPreguntas = document.getElementById('listadoPreguntas');
      if( nuevaPregunta && contenidoPregunta){
          error.classList.add("oculto")
          //obtengo el total de preguntas y lo uso como id de la nueva pregunta
          let cantidadPreguntas = listadoPreguntas.children.length++;
  
            // Crear el nuevo bloque de HTML que se va a insertar que representa una nuevo tipo de entrada
        const pregunta = `
        <div class="mb-3 row" id="pregunta">
          <div class="modal fade" id="exampleModal${cantidadPreguntas}" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar</h1>
                </div>
                <div class="modal-body">
                  ¿Está seguro que desea eliminar el elemento?
                  </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary eliminarPregunta" data-bs-dismiss="modal" >Aceptar</button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="container col-lg-12">
            <div id="errorPregunta" class="form-text text-danger oculto">Complete todos los campos.</div>
            <label for="contenido" class="form-label">Título</label>
            <input type="text" value="${nuevaPregunta}" class="form-control edicionDeshabilitada" id="tituloPregunta">
            <label for="contenido" class="form-label mt-3">Descripción de la pregunta</label>
              <textarea  class="form-control edicionDeshabilitada contenidoPregunta mt-3" placeholder="Descripción" id="contenidoPregunta">
              ${contenidoPregunta}
              </textarea>
          </div>
          <div class="container col-lg-12 mt-5 mb-5">
            <button type="button" class="btn btn-primary editarPregunta" >Editar</button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${cantidadPreguntas}">Eliminar</button>
          </div>
          <hr>
        </div>`
      // Crear un contenedor temporal para el HTML
      const contenedorTemporal = document.createElement('div');
      contenedorTemporal.innerHTML = pregunta;
      listadoPreguntas.appendChild(contenedorTemporal)
      nuevoTipo.classList.add('oculto');  // oculto el div

      document.getElementById('formulario').reset()
      }else{
          error.classList.remove("oculto")
      }
  
  }


  })();  // Inmediatamente invocada para encapsular las variables



