// archivo: script.js
document.addEventListener("DOMContentLoaded", function() {
    cargarDatos();
});

function cargarDatos() {
    fetch('../BBDD/cargar_eventos.php')
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
    const tabla = document.getElementById('listadoEventos');
    tabla.innerHTML = ''; // Limpiar contenido previo
    console.log(datos)
    tabla.innerHTML=`   
    <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Recinto</th>
        <th scope="col">Fecha</th>
        </tr>
    </thead>`
    datos.forEach(registro => {
        
        const fila = document.createElement('tr');

        // Crear celdas para cada dato
        const celdaFecha = document.createElement('td');
        celdaFecha.textContent =  cambiarFormatoFecha(registro.fecha_inicio) 

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = registro.nombre_evento;

        const celdaDescripcion = document.createElement('td');
        celdaDescripcion.textContent = registro.nombre_recinto;

        // Crear la celda con el botón de eliminación
        const celdaAcciones = document.createElement('td');
        celdaAcciones.classList.add("d-grid", "gap-3", "d-md-block")
        const botonEliminar = document.createElement('button');
        const botonEditar = document.createElement('button');
        botonEditar.textContent ='Editar'
        botonEditar.classList.add("btn","btn-sm","btn-primary","ml-1")
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add("btn","btn-sm","btn-primary")
        botonEliminar.addEventListener('click', () => eliminarRegistro(registro.id_evento, fila));
        celdaAcciones.appendChild(botonEditar);

        celdaAcciones.appendChild(botonEliminar);

        // Agregar celdas a la fila
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaAcciones);

        // Agregar la fila a la tabla
        tabla.appendChild(fila);
    });
    
}

function eliminarRegistro(id, fila) {
    // Confirmar la eliminación
    if (!confirm("¿Estás seguro de que deseas eliminar este registro?")) return;

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
            // Eliminar la fila de la interfaz si la eliminación es exitosa
            fila.remove();
            alert(data.message);
        } else {
            console.error('Error al eliminar el registro:', data.message);
            alert('No se pudo eliminar el registro.');
        }
    })
    .catch(error => console.error('Error en la solicitud de eliminación:', error));
}



// evento.js
/*
document.addEventListener('DOMContentLoaded', () => {
    const idAdministrador = 3; // Cambia esto al ID del evento que quieres obtener

    // Realizar la solicitud AJAX
    fetch(`obtener_evento.php?id_evento=${idEvento}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(evento => {
            mostrarDetallesEvento(evento);
        })
        .catch(error => {
            console.error('Error al cargar los datos del evento:', error);
        });
});
*/
// Función para mostrar los detalles del evento
function mostrarDetallesEvento(evento) {
    // Mostrar los datos en la consola o en el DOM
    console.log(evento);
    document.write(`<h2>Nombre del Evento: ${evento.nombre_evento}</h2>`);
    document.write(`<p>Dirección: ${evento.direccion}</p>`);

    // Mostrar imágenes
    evento.imagenes.split(', ').forEach(url => {
        document.write(`<img src="imgs/${url}" alt="Imagen del evento" width="100">`);
    });

    // Mostrar tipos de entradas
    evento.tipos_entradas.forEach(tipo => {
        document.write(`<p>Tipo de entrada ID: ${tipo.id_tipo_x_evento}, Precio: ${tipo.precio}, Cantidad: ${tipo.cantidad_por_tipo}</p>`);
    });

    // Mostrar entradas numeradas
    evento.entradas_numeradas.forEach(entrada => {
        document.write(`<p>Entrada N° ${entrada.numeracion_entrada}, Estado: ${entrada.estado}</p>`);
    });
}
