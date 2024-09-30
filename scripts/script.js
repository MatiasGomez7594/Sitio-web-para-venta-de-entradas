


/*eliminar un elemento
document.getElementById('container').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const elemento = event.target.parentElement;
    elemento.remove();
  }
});
*/





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
    

function ValidarInicioSesion(){
    let errorCampos = document.getElementById("errorCampos")
    let email = document.getElementById("email").value
    let nombre = document.getElementById("nombre").value

    if(!email || !nombre ){
        errorCampos.classList.remove("oculto")
    }else{
        errorCampos.classList.add("oculto")
        if(ValidarNombre(nombre) == true && ValidarEmail(email) == true){
            ReiniciarFormulario()

        }

    }

}

function EliminarAdmin(opcion,idAdmin){

    let estadoAdmin = document.getElementById(idAdmin)
    if(opcion=="1"){
        estadoAdmin.classList.add("text-success")
        estadoAdmin.classList.remove("text-danger")

    }else{
        estadoAdmin.classList.add("text-danger")
        estadoAdmin.classList.remove("text-success")


    }


   
}





function AnadirNuevoAdministrador(){
// Crear un nuevo div para la fila
let emailNuevoAdmin = document.getElementById("emailNuevo").value
let nombreNuevoAdmin =document.getElementById("nombreNuevo").value

if(ValidarEmail(emailNuevoAdmin)==true && ValidarNombre(nombreNuevoAdmin)==true && ValidarContrasena()==true){
    const contenedor = document.getElementById('formulario');
    let cantidadAdmin = contenedor.children.length++;


    const nuevaFila = document.createElement('div');
    nuevaFila.classList.add('row');

// Crear las columnas y los elementos dentro de ellas
const columnas = [
    {
        label: 'Nombre',
        input: `<input value="${nombreNuevoAdmin}" pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ]+( [A-Za-záéíóúÁÉÍÓÚñÑ]+)+$" placeholder="Nombre Completo" type="text" class="form-control edicionDeshabilitada" id="${'nombre'+cantidadAdmin}" aria-describedby="emailHelp">`
    },
    {
        label: 'Email',
        input: `<input value="${emailNuevoAdmin}" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" placeholder="email@ejemplo.com" type="email" class="form-control edicionDeshabilitada" id="${'email'+cantidadAdmin}" aria-describedby="emailHelp">`
    },
    {
        label: 'Estado',
        input: `<select class="form-select " onchange="EliminarAdmin(this.value, '${'estadoAdmin'+cantidadAdmin}')" id="estadoAdmin3" >
                    <option  value="1" selected>Activo</option>
                    <option  value="0">Inactivo</option>
                </select>`
    },
    {
        label: '',
        input: `<div class="d-flex justify-content-center">
                    <button class="btn btn-primary btn-sm me-2">Guardar</button>
                </div>`
    }
];

// Crear cada columna y añadirla a la fila
columnas.forEach(col => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-3');

    // Añadir la etiqueta si existe
    if (col.label) {
        const label = document.createElement('label');
        label.textContent = col.label;
        colDiv.appendChild(label);
    }

    // Convertir el input HTML en un elemento DOM y añadirlo
    const inputContainer = document.createElement('div');
    inputContainer.innerHTML = col.input; // Asignar el HTML al contenedor
    colDiv.appendChild(inputContainer);

    // Añadir la columna a la fila
    nuevaFila.appendChild(colDiv);
});
const hr = document.createElement('hr');
nuevaFila.appendChild(hr)


// Añadir la fila a la penúltima posición en el contenedor

const penultimoHijo = contenedor.children[contenedor.children.length - 2]; // Obtiene el penúltimo hijo
contenedor.insertBefore(nuevaFila, penultimoHijo); // Inserta la nueva fila antes del penúltimo hijo
OcultarBtn()
ReiniciarFormulario()



}


}


function Eliminar(idElemento){
    let elemento = document.getElementById(idElemento)
    elemento.classList.add("oculto")
        


}





function OcultarBtn(){
    let agregarNuevo = document.getElementById("agregarNuevo")
    let btnAgregar = document.getElementById("btnAgregar")
    if(agregarNuevo.classList.contains("oculto")){
        agregarNuevo.classList.remove("oculto")
        btnAgregar.classList.add("oculto")
    }else{
        agregarNuevo.classList.add("oculto")
        btnAgregar.classList.remove("oculto")

    }
    
}

    //datos que uso para realizar y mostrar los calculos del reporte
    const listaEventos = [
        {
          nombreEvento: "Concierto de Rock",
          fecha: "15/09/2024",
          totalEntradasDisponibles: 500,  // Total de entradas disponibles
          totalEntradasVendidas: 450,     // Total de entradas que realmente se vendieron
          precioEntrada: 50,
          totalRecaudado: 450 * 50,       // Calculado en base a entradas vendidas
          calificacion: 4.5
        },
        {
          nombreEvento: "Feria de Ciencias",
          fecha: "12/08/2024",
          totalEntradasDisponibles: 300,
          totalEntradasVendidas: 200,
          precioEntrada: 30,
          totalRecaudado: 200 * 30,
          calificacion: 4.8
        },
        {
          nombreEvento: "Festival de Cine",
          fecha: "22/09/2024",
          totalEntradasDisponibles: 1000,
          totalEntradasVendidas: 850,
          precioEntrada: 15,
          totalRecaudado: 850 * 15,
          calificacion: 4.2
        }
      ];

// Función para generar el reporte anual
function ReporteAnual() {
    //Obtener el año actual dinámicamente
    const año = new Date().getFullYear(); // Por ejemplo, 2024 si ejecutas este año
    return listaEventos.filter(evento => {
      const añoEvento = evento.fecha.split('/')[2]; // Obtener el año de la fecha
      return añoEvento === String(año);
    });

  }

//funcion para generar el reporte mensual
function ReporteMensual(mes){
    
    const año = new Date().getFullYear(); 
    return listaEventos.filter(evento => {
        const [dia, mesEvento, añoEvento] = evento.fecha.split('/'); // Desestructurar la fecha
        console.log(mesEvento + mes)
        return mesEvento == String(mes) && añoEvento == String(año); // Filtrar por mes y año
      });

     


}

function generarReporte(eventos){
    // Función para calcular y mostrar estadísticas
    let resultados = document.getElementById('resultados');

    console.log(eventos.length)
        if(eventos.length>0){
            resultados.innerHTML = ""
            resultados.classList.remove("oculto")
      
            // Calcular la recaudación total
            const recaudacionTotal = eventos.reduce((total, evento) => total + evento.totalRecaudado, 0);
      
            // Calcular la recaudación promedio
            const recaudacionPromedio = recaudacionTotal / eventos.length;
            
            // Calcular el total de entradas vendidas entre todos los eventos

            const totalEntradasVendidas = eventos.reduce((total, evento) => total + evento.totalEntradasVendidas, 0);

            // Encontrar evento con mayor recaudación
            const eventoMayorRecaudacion = eventos.reduce((max, evento) => evento.totalRecaudado > max.totalRecaudado ? evento : max);
            // Encontrar evento con menor recaudación
            const eventoMenorRecaudacion = eventos.reduce((min, evento) => evento.totalRecaudado < min.totalRecaudado ? evento : min);
            
            // Encontrar evento con menor cantidad de entradas vendidas
            const eventoMenorEntradasVendidas = eventos.reduce((min, evento) => evento.totalEntradasVendidas < min.totalEntradasVendidas ? evento : min);
      
            // Encontrar evento con mayor cantidad de entradas vendidas
            const eventoMayorEntradasVendidas = eventos.reduce((max, evento) => evento.totalEntradasVendidas > max.totalEntradasVendidas ? evento : max);
      
            // Ordenar eventos por calificación (descendente)
            const eventosOrdenadosPorCalificacion = eventos.slice().sort((a, b) => b.calificacion - a.calificacion);
            resultados.innerHTML += `<p><strong>Recaudación Total:</strong> $${recaudacionTotal}</p>`;    
            resultados.innerHTML += `<p><strong>Recaudación Promedio por Evento:</strong> $${recaudacionPromedio.toFixed(2)}</p>`;
            resultados.innerHTML += `<p><strong>Total de Entradas Vendidas:</strong> ${totalEntradasVendidas} entradas</p>`;
            resultados.innerHTML += `<p><strong>Evento con Mayor Recaudación:</strong> ${eventoMayorRecaudacion.nombreEvento} ($${eventoMayorRecaudacion.totalRecaudado})</p>`;
            resultados.innerHTML += `<p><strong>Evento con Menor Recaudación:</strong> ${eventoMenorRecaudacion.nombreEvento} ($${eventoMenorRecaudacion.totalRecaudado})</p>`;
            resultados.innerHTML += `<p><strong>Evento con Menor Entradas Vendidas:</strong> ${eventoMenorEntradasVendidas.nombreEvento} (${eventoMenorEntradasVendidas.totalEntradasVendidas} entradas)</p>`;
            resultados.innerHTML += `<p><strong>Evento con Mayor Entradas Vendidas:</strong> ${eventoMayorEntradasVendidas.nombreEvento} (${eventoMayorEntradasVendidas.totalEntradasVendidas} entradas)</p>`;
      
            // Listado de eventos ordenados por calificación
            resultados.innerHTML += `<h2>Eventos Ordenados por Calificación (Descendente):</h2>`;
            eventosOrdenadosPorCalificacion.forEach(evento => {
              resultados.innerHTML += `<p>${evento.nombreEvento} - Calificación: ${evento.calificacion}</p>`;
            });

        }else{
            resultados.innerHTML = ""
            resultados.innerHTML = `<p class="text-danger"><strong>No hay resultados</p>`;
        }

}
  



function ReporteVentas(){
    let periodo = document.getElementById("reporte").value
    let mes = document.getElementById("mes")
    let eventos
    //anual = 0 mensual = 1

    if(periodo == "1" && mes.value){
        eventos = ReporteMensual(mes.value)
    }else{
        eventos = ReporteAnual()
    }   

    generarReporte(eventos)
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
function MostrarFormCrear(){
    let formCrearEvento = document.getElementById("formulario")
    formCrearEvento.reset()
     formCrearEvento.classList.remove("oculto")
     let tituloForm = document.getElementById("tituloForm").innerText="Crear Evento"

    let btnEditarEvento = document.getElementById("btnEditarEvento")
    btnEditarEvento.classList.add("oculto")
    let btnCrearEvento = document.getElementById("btnCrearEvento1")
    btnCrearEvento.classList.add("oculto")

     

}
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