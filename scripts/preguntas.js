document.addEventListener('DOMContentLoaded', () => {
    let preguntaId = null;

    // Mostrar datos de la pregunta en el modal de edición
    document.getElementById('listadoPreguntas').addEventListener('click', (event) => {
        if (event.target.classList.contains('editarPregunta')) {
            preguntaId = event.target.getAttribute('data-id');
            const preguntaElement = document.getElementById(`pregunta-${preguntaId}`);

            if (preguntaElement) {
                const titulo = preguntaElement.querySelector('.pregunta-titulo').value;
                const contenido = preguntaElement.querySelector('.pregunta-contenido').textContent;

                document.getElementById('tituloEditar').value = titulo;
                document.getElementById('contenidoEditar').value = contenido;
            }
        }

        // Selecciona la pregunta para eliminar
        if (event.target.classList.contains('eliminarPregunta')) {
            preguntaId = event.target.getAttribute('data-id');
        }
    });

    // Guardar nueva pregunta
    document.getElementById('btnGuardarAgregar').addEventListener('click', () => {
        const titulo = document.getElementById('tituloAgregar').value;
        const contenido = document.getElementById('contenidoAgregar').value;

        fetch('../BBDD/agregar_pregunta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, contenido })
        }).then(response => response.json()).then(data => {
            if (data.success) {
                const nuevaPregunta = document.createElement('div');
                //console.log(data.id_ultima_pregunta)
                nuevaPregunta.classList.add('mb-5', 'row');
                nuevaPregunta.id = `pregunta-${data.id_ultima_pregunta}`;
                nuevaPregunta.innerHTML = `
                    <div class="col-lg-12">
                         <label class="form-label">Título</label>
                        <input type="text" value="${titulo}" class="form-control pregunta-titulo" readonly>
                        <label class="form-label mt-3">Descripción</label>
                        <textarea class="form-control pregunta-contenido" readonly>${contenido}</textarea>
                    </div>
                    <div class="col-lg-12 mt-3">
                        <button type="button" class="btn btn-primary editarPregunta" data-id="${data.id_ultima_pregunta}" data-bs-toggle="modal" data-bs-target="#modalEdicion">Editar</button>
                        <button type="button" class="btn btn-danger eliminarPregunta" data-id="${data.id_ultima_pregunta}" data-bs-toggle="modal" data-bs-target="#modalEliminacion">Eliminar</button>
                    </div>
                `;
                document.getElementById('listadoPreguntas').appendChild(nuevaPregunta);
            }
        });

        // Cerrar el modal
        document.getElementById('modalAgregar').querySelector('.btn-close').click();
    });

    // Guardar cambios de la pregunta editada
    document.getElementById('btnGuardarEditar').addEventListener('click', () => {
        const titulo = document.getElementById('tituloEditar').value;
        const contenido = document.getElementById('contenidoEditar').value;
        console.log(preguntaId,titulo,contenido)
        fetch('../BBDD/editar_pregunta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_pregunta: preguntaId, titulo, contenido })
        }).then(response => response.json()).then(data => {
            if (data.success) {
                const preguntaElement = document.getElementById(`pregunta-${preguntaId}`);
                preguntaElement.querySelector('.pregunta-titulo').value = titulo;
                preguntaElement.querySelector('.pregunta-contenido').textContent = contenido;
            }
        });

        // Cerrar el modal
        document.getElementById('modalEdicion').querySelector('.btn-close').click();
    });

    // Confirmar eliminación
    document.getElementById('confirmarEliminar').addEventListener('click', () => {
        fetch('../BBDD/eliminar_pregunta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_pregunta: preguntaId })
        }).then(response => response.json()).then(data => {
            if (data.success) {
                const preguntaElement = document.getElementById(`pregunta-${preguntaId}`);
                preguntaElement.remove();
            }
        });

        // Cerrar el modal
        const modalEliminacion = new bootstrap.Modal(document.getElementById('modalEliminacion'));
        modalEliminacion.hide();    
    });
});
