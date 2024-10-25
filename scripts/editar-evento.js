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




  function OcultarForm(){
    let formulario = document.getElementById("formulario")
    let btnCrearEvento = document.querySelectorAll(".btnCrearEvento")
    btnCrearEvento.forEach(function(btn) {
        btn.classList.remove("oculto");
    });
    let btnEditarEvento = document.getElementById("btnEditarEvento")
    btnEditarEvento.classList.remove("oculto")
    formulario.classList.add("oculto")
    let tituloForm = document.getElementById("tituloForm").innerText=""
    let listadoTipoEntradas = document.getElementById('listadoTipoEntradas');
    listadoTipoEntradas.innerHTML = ''; // Limpiar la lista


    ReiniciarFormulario()
}

(function(){
        // Referencias locales a los elementos
        const btnMostrar = document.getElementById('btnMostrar');
        const btnCancelar = document.getElementById('btnCancelar');
        const btnAgregar= document.getElementById('btnAgregar');
        let formCrearEvento = document.getElementById("formulario")
        let btnEditarEvento = document.getElementById("btnEditarEvento")
        let tituloForm = document.getElementById("tituloForm")

    //para ver el formulario
        btnMostrar.addEventListener("click",function(){            
            formCrearEvento.reset()
            formCrearEvento.classList.remove("oculto")
            tituloForm.innerText="Crear Evento"
            btnEditarEvento.classList.add("oculto")
            btnMostrar.classList.add("oculto")
            btnAgregar.classList.remove("oculto")
            
        
        });
//para ocultarlo
        btnCancelar.addEventListener("click",function(){
            formCrearEvento.reset()
            formCrearEvento.classList.add("oculto")
            btnMostrar.classList.remove("oculto")
        })
//para crear un evento
btnAgregar.addEventListener("click",function(){
    console.log("crerar evento....")
})
//para editar un evento
})(); 



     


function CrearEvento(){
    let nombreEvento = document.getElementById("nombreNuevoEvento")
    let nombreRecinto = document.getElementById("nombreRecinto")
    let eventoMayores = document.getElementById("eventoMayores")
    let eventoDiscapacidtados = document.getElementById("eventoDiscapacitados")
    let categoriaEvento = document.getElementById("categoriaEvento")
    let fechaInicio = new Date(document.getElementById('fechaInicio').value);
    let fechaFin = new Date(document.getElementById('fechaFin').value);
    let provincia = document.getElementById("provincias")
    let ciudad = document.getElementById("ciudades")
    let direccion = document.getElementById("direccionEvento")
    let totalEntradas = document.getElementById("totalEntradas")
    let tiposEntradas = document.getElementById("tipoEntrada")
    let totalEntradaXTipo =document.getElementById("totalEntradaTipo")
    if(!nombreEvento.value || !nombreRecinto.value || !eventoMayores.value
        || !eventoDiscapacidtados.value || !categoriaEvento.value || !fechaInicio
        || !fechaFin || !provincia.value || !ciudad.value || !direccion.value 
        || !totalEntradas.value || !tiposEntradas.value || !totalEntradaXTipo.value
    ){
        let camposIncompletos = document.getElementById("errorCamposIncompletos")
        camposIncompletos.classList.remove("oculto")
    }else{
        /*
        console.log(nombreEvento.value ,nombreRecinto.value ,eventoMayores.value
            ,eventoDiscapacidtados.value ,categoriaEvento.value ,fechaInicio
            ,fechaFin ,provincia.value ,ciudad.value ,direccion.value 
            ,totalEntradas.value ,tiposEntradas.value ,totalEntradaXTipo.value)*/
        if(ValidarFechaEvento()==true){
            AnadirNuevoEvento()
            ReiniciarFormulario()


        }
    }

}

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
//funcion para cambiar el formato de la fecha
function cambiarFormatoFecha(fechaOriginal) {
   let partesFechaHora = fechaOriginal.split("T"); // Dividir la fecha y la hora
   let fecha = partesFechaHora[0]; // "2024-09-24"
   let hora = partesFechaHora[1]; // "10:20"
    
    // Dividir la fecha (YYYY-MM-DD)
   let partesFecha = fecha.split("-");
   let anio = partesFecha[0];
   let mes = partesFecha[1];
   let dia = partesFecha[2];
    
    // Formato deseado: "DD/MM/YYYY - HH:MM"
   let fechaFormateada = dia + "/" + mes + "/" + anio + " - " + hora;
    
    return fechaFormateada
}
function AnadirNuevoEvento(){
    let nombreEvento = document.getElementById("nombreNuevoEvento").value
    let fechaInicio = cambiarFormatoFecha( document.getElementById("fechaInicio").value)
    let lugar = document.getElementById("nombreRecinto").value
    const listadoEventos = document.getElementById('listadoEventos');
    let totalEventos = listadoEventos.children.length++

    const nuevoEvento =`      
        <div class="container row  mt-3" id="evento${totalEventos}">
        <div class="modal fade" id="exampleModal${totalEventos}" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar</h1>
              </div>
              <div class="modal-body">
                ¿Está seguro que desea eliminar el elemento?
                </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="Eliminar('evento${totalEventos}')">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
              </div>
            </div>
          </div>
        </div>
            <div class="col col-lg-3 col-sm-12">
              <h6 >Nombre del evento</h6>
              <p id="nombreEvento${totalEventos}">${nombreEvento}</p>
            </div>
            <div class="col col-lg-3 col-sm-12">
              <h6 >Lugar</h6>
              <p id="recinto${totalEventos}">${lugar}</p>
            </div>
            <div class="col col-lg-3 col-sm-12">
              <h6>Fecha y hora</h6>
              <p id="fechaEvento${totalEventos}">${fechaInicio}</p>
            </div>
            <div class="col col-lg-3 col-sm-12">
              <h6>Configuración del evento</h6>
                  <button class="btn btn-primary btn-sm"  onclick="CargarEvento(${totalEventos})">Editar</button>
                  <button type="button" class="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal${totalEventos}" >
                    Eliminar
                  </button>
            </div>
        </div>`   
        const contenedorTemporal = document.createElement('div');
        
        contenedorTemporal.innerHTML = nuevoEvento
        listadoEventos.appendChild(contenedorTemporal)
        OcultarForm()


}


function CargarEvento(idEvento){
    //oculto los botones de crear evento
    console.log(idEvento)
    let btnCrearEvento = document.querySelectorAll(".btnCrearEvento")
    btnCrearEvento.forEach(function(btn) {
        btn.classList.add("oculto");
    });
    let tituloForm = document.getElementById("tituloForm").innerText="Editar Evento"
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
    let inputIDEvento = document.getElementById("idEvento").value = idEvento

    


}
function EditarEvento(){
    let nombreEvento = document.getElementById("nombreNuevoEvento")
    let nombreRecinto = document.getElementById("nombreRecinto")
    let eventoMayores = document.getElementById("eventoMayores")
    let eventoDiscapacidtados = document.getElementById("eventoDiscapacitados")
    let categoriaEvento = document.getElementById("categoriaEvento")
    let fechaInicio = new Date(document.getElementById('fechaInicio').value);
    let fechaFin = new Date(document.getElementById('fechaFin').value);
    let provincia = document.getElementById("provincias")
    let ciudad = document.getElementById("ciudades")
    let direccion = document.getElementById("direccionEvento")
    let totalEntradas = document.getElementById("totalEntradas")
    let tiposEntradas = document.getElementById("tipoEntrada")
    let totalEntradaXTipo =document.getElementById("totalEntradaTipo")
    if(!nombreEvento.value || !nombreRecinto.value || !eventoMayores.value
        || !eventoDiscapacidtados.value || !categoriaEvento.value || !fechaInicio
        || !fechaFin || !provincia.value || !ciudad.value || !direccion.value 
        || !totalEntradas.value || !tiposEntradas.value || !totalEntradaXTipo.value
    ){
        let camposIncompletos = document.getElementById("errorCamposIncompletos")
        camposIncompletos.classList.remove("oculto")
    }else{
        /*
        console.log(nombreEvento.value ,nombreRecinto.value ,eventoMayores.value
            ,eventoDiscapacidtados.value ,categoriaEvento.value ,fechaInicio
            ,fechaFin ,provincia.value ,ciudad.value ,direccion.value 
            ,totalEntradas.value ,tiposEntradas.value ,totalEntradaXTipo.value)*/
        if(ValidarFechaEvento()==true){
            GuardarCambios()
            ReiniciarFormulario()

        }
    }
}
function GuardarCambios(){
    let inputIDEvento = document.getElementById("idEvento").value
    let fechaInicio = cambiarFormatoFecha( document.getElementById("fechaInicio").value)
    let nombreEvento = document.getElementById("nombreNuevoEvento")
    let nombreRecinto = document.getElementById("nombreRecinto")
    let nombreEventoAntes = document.getElementById("nombreEvento"+inputIDEvento).innerText = nombreEvento.value; 
    let nombreRecintoAntes = document.getElementById("recinto"+inputIDEvento).innerText = nombreRecinto.value; 
    let fechEventoAntes = document.getElementById("fechaEvento"+inputIDEvento).innerText = fechaInicio
    OcultarForm()
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


  function AgregarTipo(){
    // Inicializamos el controlador de entradas
  controlador.agregarTipoEntrada();
}
