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

// Función para cambiar el formato de la fecha
function cambiarFormatoFecha(fechaOriginal) {
    let partesFechaHora = fechaOriginal.split(" ");
    let fecha = partesFechaHora[0];
    let hora = partesFechaHora[1].split(":");
    hora = hora[0] + ":" + hora[1];
    let partesFecha = fecha.split("-");
    let anio = partesFecha[0];
    let mes = partesFecha[1];
    let dia = partesFecha[2];
    let fechaFormateada = dia + "/" + mes + "/" + anio + " - " + hora;
    return fechaFormateada;
}

function mostrarDatos(datos) {
    const tabla = document.getElementById('consultas');
    tabla.innerHTML = '<h1 class="mx-auto text-align-center mb-3">Consultas activas</h1>'; // Limpiar contenido previo
    if (datos.length > 0) {
        datos.forEach(registro => {
            tabla.innerHTML+=`<div class=" row w-75 mx-auto mt-5" id="formulario${registro.id_consulta}">`
            let consulta = ` 
                <p id="errorMensaje${registro.id_consulta}" class="text-danger oculto">Para poder responder debes escribir algún mensaje.</p>
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" value="${registro.email_usuario}">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Nombre:</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" value="${registro.nombre_usuario}">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="mensaje">Consulta:</label>
                    <p class="bg-body-tertiary p-3">${registro.contenido_consulta}</p>
                </div>
                <div class="mb-3">
                    <textarea required minlength="10" class="form-control" placeholder="Mensaje" style="height: 100px"></textarea>
                </div>
                <button type="button" class="btn btn-primary responder" data-id="${registro.id_consulta}">Responder</button>
             </div>
                `;

            tabla.innerHTML += consulta;
            tabla.innerHTML +=`<hr>`


        });


    } else {
        tabla.innerHTML = '<h1>No hay consultas que mostrar</h1>';
    }
}

// Usar Event Delegation para detectar clics en botones "Responder"
document.getElementById('consultas').addEventListener('click', function(event) {
    if (event.target.classList.contains('responder')) {
        const idConsulta = event.target.getAttribute('data-id');
        eliminarRegistro(idConsulta);
    }
});

function eliminarRegistro(id) {
    
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
            console.log('ID eliminado:', id);
            let consulta = document.getElementById("formulario" + id)
            consulta.classList.add("oculto");

            // Mostrar modal de éxito
            var modalElement = document.getElementById('successModal');
            var modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            console.error('Error al eliminar:', data.message);
        }
    })
    .catch(error => console.error('Error en el envío de la respuesta:', error));
}
