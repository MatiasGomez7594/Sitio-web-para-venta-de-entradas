// archivo: script.js
document.addEventListener("DOMContentLoaded", function() {
    cargarDatos();
});

function cargarDatos() {
    fetch('../BBDD/cargar_consultas.php')
        .then(response => response.json())
        .then(data => {
            mostrarDatos(data);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

//funcion para cambiar el formato de la fecha
function cambiarFormatoFecha(fechaOriginal) {
    let partesFechaHora = fechaOriginal.split(" "); // Dividir la fecha y la hora
    console.log(partesFechaHora)
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
    const tabla = document.getElementById('consultas');
    tabla.innerHTML = '<h1 class="mx-auto text-align-center">Consultas activas</h1>'; // Limpiar contenido previo
    console.log(datos)
    

    if(datos.length>0){
        datos.forEach(registro => {
            let consulta =` 
            <form class="w-75 mx-auto mt-5" id="formulario${registro.id_consulta}">
            <p id ="errorMensaje"class="text-danger oculto">Para poder responder debes escribir algún mensaje.</p>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="${registro.email_usuario}">
                </div>
             </div>
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Nombre:</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="${registro.nombre_usuario}">
                </div>
             </div>
             <div class="mb-3">
                <label for="mensaje">Consulta:</label>
                <p id ="Consulta"class="bg-body-tertiary p-3">${registro.contenido_consulta}</p>
            </div>
             <div class="mb-3">
                 <textarea required minlength="10" class="form-control" placeholder="Mensaje" id="mensaje" style="height: 100px"></textarea>
            </div>
            <button type="button" id="responder" class="btn btn-primary">Responder</button>
         </form>
         <hr>
         `
    
            // Agregar la fila a la tabla
            tabla.innerHTML+=consulta
                    // Crear la celda con el botón de eliminación
            const botonResponder = document.getElementById("responder")
            botonResponder.addEventListener('click', () => eliminarRegistro(registro.id_consulta));
    
        });

    }else{
        tabla.innerHTML = '<h1>No hay consultas que mostrar</h1>'; // Limpiar contenido previo

    }

    
}

function eliminarRegistro(id) {
    // Enviar solicitud de eliminación
    fetch('../BBDD/responder_consulta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_consulta=${id}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Eliminar la fila de la interfaz si la eliminación es exitosa
            var modalElement = document.getElementById('successModal');
          
            var modal = new bootstrap.Modal(modalElement);
            
            modal.show();
            let consulta = document.getElementById("formulario"+id).classList.add("oculto")


        } else {
            console.error('Error al enviar respuesta:', data.message);
        }
    })
    .catch(error => console.error('Error en el envio de la respuesta:', error));
}

function OcultarConsulta(){
    let consulta = document.getElementById("formulario"+id).classList.add("oculto")

}



