//eliminar un tipo de entrada
document.getElementById('formulario').addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminarTipo')) {
      const elemento = event.target.closest('#tipoEntrada');
      if (elemento) {
        elemento.remove();
      }
    }
  });

//editar un tipo de entrada
document.getElementById('formulario').addEventListener('click', function(event) {
    if (event.target.classList.contains('editarTipo')) {
      let tipoEntrada = event.target.closest('#tipoEntrada');
     const nombreEntrada = tipoEntrada.querySelector('input');

      let errorNombre = document.getElementById("errorNombre")
      if( nombreEntrada.value){
        errorNombre.classList.add("oculto")
        if(nombreEntrada.classList.contains('edicionDeshabilitada')){
            nombreEntrada.classList.remove("edicionDeshabilitada")
            nombreEntrada.focus();
        }else {
            nombreEntrada.classList.add("edicionDeshabilitada")
        }
    }else{
        errorNombre.classList.remove("oculto")
    }
    }
  });

  //agregar nuevo tipo de entrada

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
        AnadirNuevoTipoEntrada()

    });




    function AnadirNuevoTipoEntrada(){
        let errorNombre = document.getElementById("errorNombre")
        let nombreEntrada = document.getElementById("entradaNueva").value
        const formulario = document.getElementById('formulario');
        if( nombreEntrada){
            errorNombre.classList.add("oculto")
            //obtengo el total de entradas y lo uso como id de la nuevo tipo de entrada
            let cantidadEntrada = formulario.children.length++;
        
          // Crear el nuevo bloque de HTML que se va a insertar que representa una nuevo tipo de entrada
          const nuevoElementoHTML = `
          <div class="row" id="tipoEntrada">
            <div class="modal fade" id="exampleModal${cantidadEntrada}" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar</h1>
                  </div>
                  <div class="modal-body">
                    ¿Está seguro que desea eliminar el elemento?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary eliminarTipo" data-bs-dismiss="modal">Aceptar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3">Nombre de la entrada        
              <input value="${nombreEntrada}" placeholder="Nombre del tipo de entrada" type="text" class="form-control edicionDeshabilitada" id="nombreEntrada">
            </div>
            <div class="col-md-3">
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary btn-sm me-2 editarTipo" >Editar</button>
                <button type="button" class="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal${cantidadEntrada}">Eliminar</button>
              </div>
            </div>
            <hr>
          </div>`;
        
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
            errorNombre.classList.remove("oculto")
        }
      }


  })();  // Inmediatamente invocada para encapsular las variables








