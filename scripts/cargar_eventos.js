// archivo: script.js
document.addEventListener("DOMContentLoaded", function() {
    cargarDatos();
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


function gestionarEntradas() {
  let totalEntradas = 0;  // Guardar el total de entradas disponibles
  let entradasAgregadas = [];  // Guardar los tipos de entradas agregadas

  // Función para obtener el valor actual del input de total de entradas disponibles
  function obtenerTotalEntradas() {
    return parseInt(document.getElementById('totalEntradas').value) || 0;
  }

  // Función para obtener la suma de todas las entradas agregadas
  function entradasAsignadas() {
    return entradasAgregadas.reduce((total, entrada) => total + entrada.total, 0);
  }

  // Función para validar las entradas por agregar
  function validarEntradasDisponibles(totalPorTipo) {
    const entradasDisponibles = totalEntradas - entradasAsignadas();
    let errorEntradas = document.getElementById("errorCantidadEntradas")

    if (totalPorTipo > entradasDisponibles) {
      errorEntradas.classList.remove("oculto")
      errorEntradas.innerText =`No hay la suficiente cantidad de entradas. Quedan ${entradasDisponibles} entradas disponibles.`
     // alert(`Quedan ${entradasDisponibles} entradas disponibles.`);
      return false;
    }else{
      errorEntradas.classList.add("oculto")
      return true;


    }
  }

  // Función para agregar un tipo de entrada
  function agregarTipoEntrada() {
    let tipoEntrada = document.getElementById('tipoEntrada').value;
    let totalPorTipo = parseInt(document.getElementById('totalEntradaTipo').value);
    let precioEntrada= parseInt(document.getElementById('precioEntrada').value);


    if (!tipoEntrada || tipoEntrada == "0" || totalPorTipo <= 0 || precioEntrada <=0) {
      return;
    }

    // Actualizar el total de entradas disponibles del input
    totalEntradas = obtenerTotalEntradas();

    if (!validarEntradasDisponibles(totalPorTipo)) return;

    // Agregar el tipo de entrada al listado
    entradasAgregadas.push({ tipo: tipoEntrada, total: totalPorTipo , precio: precioEntrada});

    mostrarEntradasAgregadas();
  }

  // Función para mostrar los tipos de entradas agregados
  function mostrarEntradasAgregadas() {
   let listadoTipoEntradas = document.getElementById('listadoTipoEntradas');
    listadoTipoEntradas.innerHTML = ''; // Limpiar la lista

    entradasAgregadas.forEach((entrada, index) => {
     let div = document.createElement('div');
      div.classList.add('entradaItem','col-lg-12', 'mb-1');
      div.innerHTML = `
        <input type="text" class="edicionDeshabilitada" class="tipoEntrada" value="${entrada.tipo}">
        <input type="text" class="edicionDeshabilitada" class="cantidad" value="${entrada.total}">
        <input type="text" class="edicionDeshabilitada" class="precioEntrada" value="${entrada.precio}">

        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${entrada.tipo}" id="estanNumeradas">
          <label class="form-check-label" for="flexCheckDefault">
            ¿Están numeradas?
            </label>
        </div>
        <button class="btn btn-primary btn-sm mt-1" type="button" onclick="controlador.eliminarEntrada(${index})">Eliminar</button>
        `;
      listadoTipoEntradas.appendChild(div);
    });
  }

  // Función para eliminar un tipo de entrada
  function eliminarEntrada(index) {
    // Eliminar la entrada del array
    entradasAgregadas.splice(index, 1);

    mostrarEntradasAgregadas();
  }

  return {
    agregarTipoEntrada,
    eliminarEntrada
  };
}


const controlador = gestionarEntradas();


document.getElementById("btnAgregarEntrada").addEventListener("click",function(){
// Inicializamos el controlador de entradas

controlador.agregarTipoEntrada();

});


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
    { id: 'tipoEntrada', tipo: 'select', mensaje: 'Seleccione un tipo de entrada' },
    { id: 'totalEntradas', tipo: 'input', mensaje: 'Ingrese el total de localidades/entradas' },
    { id: 'totalEntradaTipo', tipo: 'input', mensaje: 'Ingrese el total por el tipo de entrada' },
    { id: 'precioEntrada', tipo: 'input', mensaje: 'Ingrese el precio de la entrada' }
];
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
          (campo.tipo === 'select' && elemento.value === '0' ||  !entradasEvento)) {

          formularioValido = false;
          elemento.classList.add('is-invalid');

          // Crear y mostrar mensaje de error
          const mensajeError = document.createElement('div');
          mensajeError.className = 'form-text text-danger mensaje-error';
          mensajeError.textContent = campo.mensaje;
          elemento.parentElement.appendChild(mensajeError);
      }
  });
  
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
          if(ciudades.options[i].value==opcion){
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

function CargarEvento(eventos){
  document.querySelectorAll(".btnEditarEvento").forEach(button => {
    button.addEventListener("click", function() {
      document.getElementById("formEvento").reset()
      const eventoId = parseInt(this.getAttribute("data-id"));
      const evento = eventos.find(e => e.id_evento === eventoId);
      if (evento) {

        // Rellenar los campos del formulario en el modal
        document.getElementById("idEvento").value = evento.id_evento
        document.getElementById("nombreEvento").value = evento.nombre_evento;
        document.getElementById("recinto2").value = evento.nombre_recinto;
        document.getElementById("fechaInicio").value = evento.fecha_inicio;
        document.getElementById("fechaFin").value = evento.fecha_fin;
        document.getElementById("direccion").value = evento.direccion;
        document.getElementById("totalEntradas").value = evento.total_localidades;
        document.getElementById("eventoMayores").value = evento.evento_mayores;
        document.getElementById("eventoDiscapacitados").value = evento.evento_discapacitados;
        document.getElementById("categoria").value = evento.id_categoria_evento;
        document.getElementById("provincias").value =evento.id_provincia;

        //VerCiudades(evento.provincia)
      }
    });
  });
}


//para guardar los cambios cuando edito un evento
document.getElementById("btnGuardar").addEventListener("click",function(){
  //console.log("editar evento....")
  ValidarDatosEvento()
})
