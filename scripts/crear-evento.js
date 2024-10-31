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

function validarEvento(){
  let formularioValido = true;
    
  // Seleccionar todos los campos del formulario
  const camposRequeridos = [
    { id: 'nombreEvento', tipo: 'input', mensaje: 'Complete este campo' },
    { id: 'recinto', tipo: 'input', mensaje: 'Complete este campo' },
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
      CrearEvento()

  } else {
      console.log("Formulario inválido. Corrige los campos resaltados.");
      document.getElementById("errorCampos").classList.add("text-danger")
      document.getElementById("errorCampos").classList.remove("oculto")

  }
}


document.getElementById("btnCrear").addEventListener("click",function(){
  //console.log("crerar evento....")
  validarEvento()

})


     










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











  function CrearEvento() {
    const formData = new FormData(document.getElementById("formEvento"));
    let provincias = document.getElementById("provincias") 
    let provinciaSeleccionada =  provincias.options[provincias.selectedIndex].text;
    let ciudades = document.getElementById("ciudades") 
    let ciudadSeleccionada = ciudades.options[ciudades.selectedIndex].text;


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
    formData.append('id_admin_eventos', 3);
    formData.append('provincia_seleccionada', provinciaSeleccionada);
    formData.append('ciudad_seleccionada', ciudadSeleccionada);

      // Comprobar el contenido de FormData antes de enviar
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  
    // Enviar la solicitud
    fetch('../BBDD/crear_evento.php', {
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
  


