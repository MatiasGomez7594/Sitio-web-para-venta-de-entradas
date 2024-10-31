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
    //console.log(event.target.value)
    VerCiudades(event.target.value)
})


//eliminar un evento
document.getElementById('listadoEventos').addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminarEvento')) {
        const elemento = event.target.closest('#evento');
        if (elemento) {
          elemento.remove();
        }
      }
    
  });


function ValidarFechaEvento(){
    let fechaInicio = new Date(document.getElementById('fechaInicio').value);
    let fechaFin = new Date(document.getElementById('fechaFin').value);
    let errorFecha = document.getElementById("errorFecha")
    let resultado = true
    //console.log(fechaFin + fechaInicio)
    if (fechaInicio >= fechaFin) {
        errorFecha.classList.remove("oculto")
        resultado = false
    } else{
        errorFecha.classList.add("oculto")
        
    }
    return resultado
    
    
}




function CargarEvento(idEvento){
    //oculto los botones de crear evento
    console.log(idEvento)
    let btnCrearEvento = document.querySelectorAll(".btnCrearEvento")
    btnCrearEvento.forEach(function(btn) {
        btn.classList.add("oculto");
    });
    let formEditarEvento = document.getElementById("formulario")
   // formEditarEvento.reset()
    formEditarEvento.classList.remove("oculto")
    //obtengo el nombre y recinto del evento
    let nombreEvento = document.getElementById("nombreEvento"+idEvento).innerText; 
    let nombreRecinto = document.getElementById("recinto"+idEvento).innerText; 
    let editarNombreEvento = document.getElementById("nombreNuevoEvento")
    let editarNombreRecinto = document.getElementById("nombreRecinto")
//cargo el nombre y el recinto que obtuve en el formulario de edicion
    editarNombreEvento.value = nombreEvento
    editarNombreRecinto.value = nombreRecinto
    //asigno el id del evento en el input hidden

    


}


//eliminar un evento
document.getElementById('listadoEventos').addEventListener('click', function(event) {
  if (event.target.classList.contains('eliminarEvento')) {
      const elemento = event.target.closest('#evento');
      if (elemento) {
        elemento.remove();
      }
    }
  
});

function GuardarCambios(){
    let inputIDEvento = document.getElementById("idEvento").value
    let fechaInicio = cambiarFormatoFecha( document.getElementById("fechaInicio").value)
    let nombreEvento = document.getElementById("nombreNuevoEvento")
    let nombreRecinto = document.getElementById("nombreRecinto")
    let nombreEventoAntes = document.getElementById("nombreEvento"+inputIDEvento).innerText = nombreEvento.value; 
    let nombreRecintoAntes = document.getElementById("recinto"+inputIDEvento).innerText = nombreRecinto.value; 
    let fechEventoAntes = document.getElementById("fechaEvento"+inputIDEvento).innerText = fechaInicio
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

      if (!tipoEntrada || tipoEntrada == "0" || totalPorTipo <= 0) {
        return;
      }

      // Actualizar el total de entradas disponibles del input
      totalEntradas = obtenerTotalEntradas();

      if (!validarEntradasDisponibles(totalPorTipo)) return;

      // Agregar el tipo de entrada al listado
      entradasAgregadas.push({ tipo: tipoEntrada, total: totalPorTipo });

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
          <p>${entrada.tipo}: ${entrada.total} entradas</p>
          <button class="btn btn-primary btn-sm" type="button" onclick="controlador.eliminarEntrada(${index})">Eliminar</button>
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


document.getElementById("btnEditar").addEventListener("click",function(){
  //console.log("crerar evento....")
  validarEvento()

})
