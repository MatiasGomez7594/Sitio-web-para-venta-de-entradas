document.addEventListener("DOMContentLoaded", function() {
    cargarDatos();
    CargarCategorias()
    CargarProvincias();
    CargarCiudades()
    CargarTiposEntradas();
});

function cargarDatos() {
    fetch('../BBDD/cargar_eventos.php')
        .then(response => response.json())
        .then(data => {
            mostrarDatos(data);
            CargarEvento(data)
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}




function  CargarCategorias() {
  fetch('../BBDD/obtener-categorias.php')
      .then(response => response.json())
      .then(data => {
          MostrarCategorias(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
}


function  CargarProvincias() {
  fetch('../BBDD/obtener-provincias.php')
      .then(response => response.json())
      .then(data => {
          MostrarProvincias(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
}

function  CargarCiudades() {
  fetch('../BBDD/obtener-ciudades.php')
      .then(response => response.json())
      .then(data => {
          MostrarCiudades(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
}
function  CargarTiposEntradas() {
  fetch('../BBDD/obtener-tipos-entradas.php')
      .then(response => response.json())
      .then(data => {
          MostrarTiposEntradas(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
}
function MostrarTiposEntradas(datos) {
  const tipoEntradaSelect = document.getElementById('tipoEntrada');
  tipoEntradaSelect.innerHTML = ''; // Limpiar contenido previo
  tipoEntradaSelect.innerHTML='<option selected value="0">Tipo</option>'
  datos.forEach(registro => {
      let tipoEntrada =`
          <option value="${registro.id_tipo}">${registro.nombre_tipo}</option> `
      tipoEntradaSelect.innerHTML += tipoEntrada;

  });
}


function MostrarProvincias(datos) {
  const provinciasSelect = document.getElementById('provincias');
  provinciasSelect.innerHTML = ''; // Limpiar contenido previo
  provinciasSelect.innerHTML='<option selected value="0">Provincia</option>'
  datos.forEach(registro => {
      let provincia =`
          <option value="${registro.id_provincia}">${registro.nombre}</option> `
      provinciasSelect.innerHTML += provincia;

  });
}

function MostrarCiudades(datos) {
  const ciudadSelect = document.getElementById('ciudades');
  ciudadSelect.innerHTML = ''; // Limpiar contenido previo
  ciudadSelect.innerHTML='<option selected value="0">Ciudad</option>'
  datos.forEach(registro => {
      let ciudad =`
          <option data-provincia=${registro.id_provincia}  value="${registro.id_ciudad}">${registro.nombre}</option> `
      ciudadSelect.innerHTML += ciudad;

  });
}

function MostrarCategorias(datos) {
  const categoriaSelect = document.getElementById('categoria');
  categoriaSelect.innerHTML = ''; // Limpiar contenido previo
  categoriaSelect.innerHTML='<option selected value="0">Categoría</option>'
  datos.forEach(registro => {
      let categoria =`
          <option value="${registro.id_categoria}">${registro.nombre_categoria}</option> `
      categoriaSelect.innerHTML += categoria;

  });
}


//funcion para cambiar el formato de la fecha
function cambiarFormatoFecha(fechaOriginal) {
    let partesFechaHora = fechaOriginal.split(" "); // Dividir la fecha y la hora
    let fecha = partesFechaHora[0]; // "2024-09-24"
    let hora = partesFechaHora[1].split(":"); // "10:20"     
     hora = hora[0]+":"+hora[1]
     // Dividir la fecha (YYYY-MM-DD)
    let partesFecha = fecha.split("-");
    let anio = partesFecha[0];
    let mes = partesFecha[1];
    let dia = partesFecha[2];
     
     // Formato deseado: "DD/MM/YYYY - HH:MM"
    let fechaFormateada = dia + "/" + mes + "/" + anio + " - " + hora;
     
     return fechaFormateada
 }
function mostrarDatos(datos) {
    const tabla = document.getElementById('listadoEventos');
    tabla.innerHTML = ''; // Limpiar contenido previo
    datos.forEach(registro => {
        let evento =`        
        <div class="container row  mt-3 evento" data-id="${registro.id_evento}">
                <div class="modal fade" id="exampleModal${registro.id_evento}" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar</h1>
                      </div>
                      <div class="modal-body">
                        ¿Está seguro que desea eliminar el evento?
                        </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary eliminarEvento" data-bs-dismiss="modal" >Aceptar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-lg-3 col-sm-12">
                      <h6>Nombre del evento</h6>
                      <p id="nombreEvento1">${registro.nombre_evento}</p>
                    </div>
                    <div class="col col-lg-3 col-sm-12">
                      <h6>Lugar</h6>
                      <p id="recinto">${registro.nombre_recinto}</p>
                    </div>
                    <div class="col col-lg-3 col-sm-12">
                      <h6>Fecha y hora</h6>
                      <p id="fechaEvento">${cambiarFormatoFecha(registro.fecha_inicio) }</p>
                    </div>
                    <div class="col col-lg-3 col-sm-12">
                      <h6>Configuración del evento</h6>
                      <!-- Botón que abre el modal -->
                        <button type="button" data-id="${registro.id_evento}" class="btn btn-primary btn-sm me-2 btnEditarEvento" data-bs-toggle="modal" data-bs-target="#modalEditarEvento">
                            Editar
                        </button>
                          <button type="button" class="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal${registro.id_evento}" >
                            Eliminar
                          </button>
                    </div>
        </div> `

        tabla.innerHTML += evento;

    });
    
}

document.getElementById('listadoEventos').addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminarEvento')) {
        const elemento = event.target.closest('.evento');
        let id = elemento.getAttribute('data-id');
        //console.log(elemento.dataset.id);
        //console.log(dataID)
        
        eliminarRegistro(id) 
        if (elemento) {
          elemento.remove();
        }
      }
    
  });





function eliminarRegistro(id) {
    // Confirmar la eliminación
    // Enviar solicitud de eliminación
    fetch('../BBDD/eliminar_evento.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_evento=${id}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
          console.log(data.status)
            return data.status
            
        } else {
            console.error('Error al eliminar el registro:', data.message);
            alert('No se pudo eliminar el registro.');
        }
    })
    .catch(error => console.error('Error en la solicitud de eliminación:', error));
}



function CerrarModalEditarEvento() {
  const modalElement = document.getElementById("modalEditarEvento");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);

  if (modalInstance) {
    modalInstance.hide(); // Cierra el modal si existe la instancia activa
  }
}

function EditarEvento() {
  const formData = new FormData(document.getElementById("formEvento"));
  // Agregar datos de entradas en formato JSON (por ejemplo)
  const entradasEvento = [];
  let tipoEntradas = document.querySelectorAll(".entradaItem")

  // Crea un array para almacenar los tipos de entradas del evento
  tipoEntradas.forEach(tipo => {
    let inputs = tipo.querySelectorAll('input[type="text"]');
    let checkbox = tipo.querySelector('input[type="checkbox"]')
    
    // Almacena los valores de los inputs en un array temporal
    let valoresInputs = Array.from(inputs).map(input => input.value);
     // Selecciona el checkbox dentro de cada item y verifica si está seleccionado
     const estanNumeradas = checkbox && checkbox.checked ? "si" : "no";
     
     // Agrega los tipos y si estan numeradas segun el checkbox
     entradasEvento.push({
         valoresInputs: valoresInputs,
         opcionSeleccionada: estanNumeradas
     });

})
  formData.append("entradas", JSON.stringify(entradasEvento));

    // Comprobar el contenido de FormData antes de enviar
for (const [key, value] of formData.entries()) {
  console.log(key, value);
}


  // Enviar la solicitud
  fetch('../BBDD/editar_evento.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(data.message);

      document.getElementById("formEvento").reset()
      let listadoTipoEntradas = document.getElementById('listadoTipoEntradas');
      listadoTipoEntradas.innerHTML = ''; // Limpiar la lista
      var modalElement = document.getElementById('successModal');
      var modal = new bootstrap.Modal(modalElement);
      
      modal.show();
         // Escuchar el evento cuando el modal se oculta
        modalElement.addEventListener('hidden.bs.modal', function () {
          CerrarModalEditarEvento()
      });
      //oculto el formulario de edicion


    } else {
      console.error("Error:", data.message);
    }
  })
  .catch(error => console.error("Error:", error));
}


function ValidarFechaEvento(){
  let fechaInicio = new Date(document.getElementById('fechaInicio').value);
  let fechaFin = new Date(document.getElementById('fechaFin').value);
  let errorFecha = document.getElementById("errorFecha")
  let resultado = true
  if (fechaInicio >= fechaFin) {
      errorFecha.classList.remove("oculto")
      resultado = false
  } else{
      errorFecha.classList.add("oculto")
      
  }
  return resultado
  
  
}

function ValidarDatosEvento(){
  let formularioValido = true;
    
  // Seleccionar todos los campos del formulario
  const camposRequeridos = [
    { id: 'nombreEvento', tipo: 'input', mensaje: 'Complete este campo' },
    { id: 'recinto2', tipo: 'input', mensaje: 'Complete este campo' },
    { id: 'categoria', tipo: 'select', mensaje: 'Seleccione una categoría' },
    { id: 'fechaInicio', tipo: 'input', mensaje: 'Seleccione la fecha y hora de inicio' },
    { id: 'fechaFin', tipo: 'input', mensaje: 'Seleccione la fecha y hora de finalización' },
    { id: 'provincias', tipo: 'select', mensaje: 'Seleccione una provincia' },
    { id: 'ciudades', tipo: 'select', mensaje: 'Seleccione una ciudad' },
    { id: 'direccion', tipo: 'input', mensaje: 'Complete este campo' },
    /*{ id: 'tipoEntrada', tipo: 'select', mensaje: 'Seleccione un tipo de entrada' },
    { id: 'totalEntradas', tipo: 'input', mensaje: 'Ingrese el total de localidades/entradas' }
    { id: 'totalEntradaTipo', tipo: 'input', mensaje: 'Ingrese el total por el tipo de entrada' },
    { id: 'precioEntrada', tipo: 'input', mensaje: 'Ingrese el precio de la entrada' }*/];
        // Agregar datos de entradas en formato JSON (por ejemplo)
        const entradasEvento = [];
        let tipoEntradas = document.querySelectorAll(".entradaItem")
    
        // Crea un array para almacenar los tipos de entradas del evento
        tipoEntradas.forEach(tipo => {
          let inputs = tipo.querySelectorAll('input[type="text"]');
          let checkbox = tipo.querySelector('input[type="checkbox"]')
          
          // Almacena los valores de los inputs en un array temporal
          let valoresInputs = Array.from(inputs).map(input => input.value);
           // Selecciona el checkbox dentro de cada item y verifica si está seleccionado
           const estanNumeradas = checkbox && checkbox.checked ? "si" : "no";
           
           // Agrega los tipos y si estan numeradas segun el checkbox
           entradasEvento.push({
               valoresInputs: valoresInputs,
               opcionSeleccionada: estanNumeradas
           });
      
      })

  // Limpiar mensajes de error previos
  document.querySelectorAll('.text-danger').forEach(el => el.classList.remove('text-danger'));
  document.querySelectorAll('.mensaje-error').forEach(el => el.remove());

  // Validar campos
  camposRequeridos.forEach(campo => {
      const elemento = document.getElementById(campo.id);
      
      if ((campo.tipo === 'input' && !elemento.value.trim()) ||
          (campo.tipo === 'select' && elemento.value === '0' ||  !entradasEvento 
            
          )) {

          formularioValido = false;
          elemento.classList.add('is-invalid');

          // Crear y mostrar mensaje de error
          const mensajeError = document.createElement('div');
          mensajeError.className = 'form-text text-danger mensaje-error';
          mensajeError.textContent = campo.mensaje;
          elemento.parentElement.appendChild(mensajeError);
      }
  });
  console.log("hay entradas: "+entradasEvento)
  let fechaValida = ValidarFechaEvento()

  if (formularioValido && fechaValida==true && entradasEvento) {
      // Limpiar todas las clases de error y mensajes al enviar el formulario
      document.querySelectorAll('.text-danger').forEach(el => el.classList.remove('text-danger'));
      document.querySelectorAll('.mensaje-error').forEach(el => el.remove());

      // Aquí puedes proceder a enviar el formulario
      console.log("Formulario válido. Proceder con la creación del evento.");
      document.getElementById("errorCampos").classList.add("oculto")
      EditarEvento()

  } else {
      console.log("Formulario inválido. Corrige los campos resaltados.");
      document.getElementById("errorCampos").classList.add("text-danger")
      document.getElementById("errorCampos").classList.remove("oculto")

  }
}


function VerCiudades(opcion){
  let ciudades = document.getElementById('ciudades')
  if(opcion){
      for(i=1; i<ciudades.length;i++){
          if(ciudades.options[i].getAttribute('data-provincia') == opcion){
              ciudades.options[i].classList.remove("oculto")
          }else{
              ciudades.options[i].classList.add("oculto")
  
          }   
      }
  }else{
      return false
  }

}
//para ver las ciudades segun  la provincia seleccionada
document.getElementById("provincias").addEventListener("change",function(event){
  VerCiudades(event.target.value)
})

function CargarEvento(eventos) {
  document.querySelectorAll(".btnEditarEvento").forEach((button) => {
    button.addEventListener("click", function () {
      document.getElementById("formEvento").reset();
      const eventoId = parseInt(this.getAttribute("data-id"));
      const evento = eventos.find((e) => e.id_evento === eventoId);

      if (evento) {
        // Rellenar campos del formulario en el modal
        document.getElementById("idEvento").value = evento.id_evento;
        document.getElementById("nombreEvento").value = evento.nombre_evento;
        document.getElementById("recinto2").value = evento.nombre_recinto;
        document.getElementById("fechaInicio").value = evento.fecha_inicio;
        document.getElementById("fechaFin").value = evento.fecha_fin;
        document.getElementById("direccion").value = evento.direccion;
        document.getElementById("totalEntradas").value = evento.total_localidades;
        document.getElementById("eventoMayores").value = evento.evento_mayores;
        document.getElementById("eventoDiscapacitados").value = evento.evento_discapacitados;
        document.getElementById("categoria").value = evento.id_categoria_evento;
        document.getElementById("provincias").value = evento.id_provincia;
        document.getElementById("ciudades").value = evento.id_ciudad;


        // Limpiar y cargar las entradas asociadas
        let listadoTipoEntradas = document.getElementById("listadoTipoEntradas");
        listadoTipoEntradas.innerHTML = ''; // Limpiar lista de entradas
        let entradasAgregadas = [];

        evento.tipos_entradas.forEach((entrada) => {
          // Evitar duplicar entradas numeradas
          const entradaExiste = entradasAgregadas.some(
            (e) => e.tipo === entrada.id_tipo_entrada && entrada.estan_numeradas === "si"
          );

          if (!entradaExiste) {
            entradasAgregadas.push({
              tipo: entrada.id_tipo_entrada,
              nombre: entrada.nombre_tipo,
              total: entrada.cantidad_por_tipo,
              precio: entrada.precio,
              numerada: entrada.estan_numeradas === "si",
            });

            // Crear el elemento HTML
            let div = document.createElement("div");
            div.classList.add("entradaItem", "col-lg-12", "mb-1");
            div.innerHTML = `
              <input type="text" class="edicionDeshabilitada d-none" name="tipoEntrada" value="${entrada.id_tipo_entrada}">
              <input type="email" class="edicionDeshabilitada" name="nombreEntrada" value="${entrada.nombre_tipo}">
              <input type="text" class="edicionDeshabilitada" name="cantidad" value="${entrada.cantidad_por_tipo}">
              <input type="text" class="edicionDeshabilitada" name="precioEntrada" value="${entrada.precio}">
              <div class="form-check">
                <input id="estanNumeradas" class="form-check-input" value="${entrada.id_tipo_entrada} type="checkbox" ${entrada.estan_numeradas === "si" ? "checked" : ""}>
                <label class="form-check-label">¿Están numeradas?</label>
              </div>
              <button class="btn btn-primary btn-sm mt-1" type="button" onclick="controlador.eliminarEntrada(${entradasAgregadas.length - 1})">Eliminar</button>
            `;
            listadoTipoEntradas.appendChild(div);
          }
        });
        // Inicializar controlador de entradas con las cargadas
        controlador.cargarEntradas(entradasAgregadas);
        VerCiudades(evento.provincia); // Asignar ciudades basadas en la provincia
      }
    });
  });
}

function gestionarEntradas() {
  let totalEntradas = 0; // Total de entradas disponibles
  let entradasAgregadas = []; // Tipos de entradas agregadas



  // Función para inicializar entradas cargadas
  function cargarEntradas(entradas) {
    entradasAgregadas = entradas;
    mostrarEntradasAgregadas();
  }

  // Obtener la suma de todas las entradas asignadas
  function entradasAsignadas() {
    return entradasAgregadas.reduce((total, entrada) => total + entrada.total, 0);
  }

  // Validar si la cantidad ingresada es válida
  function validarCantidad(totalPorTipo) {
    const entradasDisponibles = totalEntradas - entradasAsignadas();
    let errorEntradas = document.getElementById("errorCantidadEntradas");

    if (!totalPorTipo || totalPorTipo <= 0) {
      errorEntradas.innerText = "La cantidad debe ser mayor a 0.";
      return false;
    } else if (totalPorTipo > entradasDisponibles) {
      errorEntradas.innerText = `No hay suficientes entradas disponibles. Quedan ${entradasDisponibles} entradas.`;
      return false;
    } else {
      errorEntradas.innerText = "";
      return true;
    }
  }

  // Validar si el precio ingresado es válido
  function validarPrecio(precio) {
    let errorPrecio = document.getElementById("errorPrecioEntradas");

    if (!precio || precio <= 0) {
      errorPrecio.innerText = "El precio debe ser mayor a 0.";
      return false;
    } else {
      errorPrecio.innerText = "";
      return true;
    }
  }

  // Agregar un tipo de entrada
  function agregarTipoEntrada() {
    let tipoEntrada = document.getElementById("tipoEntrada");
    let totalPorTipo = parseInt(document.getElementById("totalEntradaTipo").value);
    let precioEntrada = parseFloat(document.getElementById("precioEntrada").value);
    let nombreEntrada = tipoEntrada.options[tipoEntrada.selectedIndex].text;
    let numerada = document.getElementById("estanNumeradas");


    if (!tipoEntrada.value || tipoEntrada.value === "0"  ) {
      document.getElementById("errorTipoEntrada").innerText="Debe seleccionar un tipo de entrada."
      return;
    }else{
      document.getElementById("errorTipoEntrada").innerText=""
    }

    // Validar cantidad y precio
    totalEntradas = parseInt(document.getElementById("totalEntradas").value) || 0;
    if (!validarCantidad(totalPorTipo) || !validarPrecio(precioEntrada)) return;

 

    // Agregar la entrada
    entradasAgregadas.push({
      tipo: tipoEntrada.value,
      nombre: nombreEntrada,
      total: totalPorTipo,
      precio: precioEntrada,
      numerada,
    });

    mostrarEntradasAgregadas();
  }

  // Mostrar entradas en el listado
  function mostrarEntradasAgregadas() {
    let listadoTipoEntradas = document.getElementById("listadoTipoEntradas");
    listadoTipoEntradas.innerHTML = "";

    entradasAgregadas.forEach((entrada, index) => {
      let div = document.createElement("div");
      div.classList.add("entradaItem", "col-lg-12", "mb-1");
      div.innerHTML = `
        <input type="text" class="edicionDeshabilitada d-none" name="tipoEntrada" value="${entrada.tipo}">
        <input type="email" class="edicionDeshabilitada" name="nombreEntrada" value="${entrada.nombre}">
        <input type="text" class="edicionDeshabilitada" name="cantidad" value="${entrada.total}">
        <input type="text" class="edicionDeshabilitada" name="precioEntrada" value="${entrada.precio}">
        <div class="form-check">
          <input id="entradaNumerada" class="form-check-input" value="${entrada.tipo}" type="checkbox" ${entrada.numerada ? "checked" : ""}>
          <label class="form-check-label">¿Están numeradas?</label>
        </div>
        <button class="btn btn-primary btn-sm mt-1" type="button" onclick="controlador.eliminarEntrada(${index})">Eliminar</button>
      `;
      listadoTipoEntradas.appendChild(div);
    });
  }

  // Eliminar un tipo de entrada
  function eliminarEntrada(index) {
    entradasAgregadas.splice(index, 1);
    mostrarEntradasAgregadas();
  }

  return { agregarTipoEntrada, eliminarEntrada, cargarEntradas };
}

const controlador = gestionarEntradas();

// Evento para agregar entradas
document.getElementById("btnAgregarEntrada").addEventListener("click", () => {
  controlador.agregarTipoEntrada();
});



//para guardar los cambios cuando edito un evento
document.getElementById("btnGuardar").addEventListener("click",function(){
  //console.log("editar evento....")
  ValidarDatosEvento()
})
