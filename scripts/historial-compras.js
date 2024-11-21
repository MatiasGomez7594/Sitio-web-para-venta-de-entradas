document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar compras
    fetch('../BBDD/cargar-compras.php')
        .then(response => response.json())
        .then(data => renderCompras(data))
        .catch(error => console.error('Error al cargar las compras:', error));

    // Renderizar compras en el DOM
    function renderCompras(compras) {
        const container = document.getElementById('compras-container');
        container.innerHTML = ''; // Limpiar contenido previo
    
        if (!compras || compras.length === 0) {
            container.innerHTML = '<p class="text-warning text-center">No se encontraron compras.</p>';
            return;
        }
    
        compras.forEach(compra => {
            // Dividir los items por el separador '|'
            const items = compra.items
                .split('|') // Divide la cadena en un arreglo
                .map(item => `<li>${item}</li>`) // Crea elementos de lista
                .join(''); // Une todo en un solo string HTML
    
            // Validar si es cancelable o calificable según fecha de inicio del evento
            const fechaInicio = new Date(compra.fecha_inicio);
            const hoy = new Date();
            const esCancelable = hoy < fechaInicio;
            const esCalificable = hoy > fechaInicio;
    
            // Generar HTML dinámico para cada compra
            const compraHTML = `
                <div class="card mb-3">
                    <div class="card-header">Compra ID: ${compra.id_compra} - ${compra.fecha_compra} - ${compra.nombre_evento} - ${compra.fecha_inicio}</div>
                    <div class="card-body">
                        <p><strong>Método de pago:</strong> ${compra.metodo_pago}</p>
                        <p><strong>Items:</strong></p>
                        <ul>${items}</ul>
                        <p><strong>Total:</strong> $${compra.total_compra}</p>
                        <div>
                            ${esCalificable ? `<button class="btn btn-primary btn-sm" onclick="abrirCalificar(${compra.id_evento})">Calificar</button>` : ''}
                            ${esCancelable ? `<button class="btn btn-danger btn-sm" onclick="abrirCancelar(${compra.id_compra})">Cancelar Compra</button>` : ''}
                        </div>
                    </div>
                </div>
            `;
    
            // Agregar al contenedor
            container.innerHTML += compraHTML;
        });
    }
    

    // Función para abrir modal de calificación
    window.abrirCalificar = (idEvento) => {
        document.getElementById('calificarEventoId').value = idEvento;
        const stars = document.querySelectorAll('#rating-stars .fa-star');
        stars.forEach(star => star.classList.remove('checked'));
        new bootstrap.Modal(document.getElementById('calificarModal')).show();
    };

    // Manejo de selección de estrellas
    document.querySelectorAll('#rating-stars .fa-star').forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = e.target.dataset.value;
            document.querySelectorAll('#rating-stars .fa-star').forEach(s => {
                s.classList.remove('checked');
                if (s.dataset.value <= rating) {
                    s.classList.add('checked');
                }
            });
        });
    });

    document.getElementById('btnCerrar').addEventListener("click",function(){
        console.log('cerrado')
        new bootstrap.Modal(document.getElementById('calificarModal')).hide();

    })
    document.getElementById('btnCerrarCancelar').addEventListener("click",function(){
        console.log('cerrado222')
        new bootstrap.Modal(document.getElementById('cancelarModal')).hide();

    })
    // Guardar calificación
    document.getElementById('guardarCalificacion').addEventListener('click', () => {
        const idEvento = document.getElementById('calificarEventoId').value;
        const rating = document.querySelectorAll('#rating-stars .fa-star.checked').length;

        if (rating > 0) {
            fetch('../BBDD/calificar-evento.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_evento: idEvento, calificacion: rating })
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('error-calificacion').innerText=data.success || data.error
                    new bootstrap.Modal(document.getElementById('calificarModal')).hide();

                })
                .catch(error => console.error('Error al calificar:', error));
        } else {
            document.getElementById('error-calificacion').innerText= 'Selecciona una calificación válida.';
        }
    });

    // Función para abrir modal de cancelación
    window.abrirCancelar = (idCompra) => {
        document.getElementById('cancelarCompraId').value = idCompra;
        new bootstrap.Modal(document.getElementById('cancelarModal')).show();
    };

    // Confirmar cancelación
    document.getElementById('confirmarCancelar').addEventListener('click', () => {
        const idCompra = document.getElementById('cancelarCompraId').value

        fetch('../BBDD/cancelar_compra.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idcompra: idCompra}),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data+ 'compra exitosa')
                //document.getElementById("error-cancelar").innerText=data.success || data.error
                var modalElement = document.getElementById('cancelarModal');
                console.log('Modal visibility before:', modalElement.style.display); // Verificar visibilidad antes de cerrar
                var modal = new bootstrap.Modal(modalElement);
                modal.hide();  // Cierra el modal
                // Recargar compras
                fetch('../BBDD/cargar-compras.php')
                    .then(response => response.json())
                    .then(data => renderCompras(data));
            })
            .catch(error => console.error('Error al cancelar la compra:', error));
    });
});


document.querySelectorAll('#rating-stars .fa-star').forEach(star => {
    star.addEventListener('click', function() {
        // Obtener el valor de la estrella seleccionada
        const value = this.getAttribute('data-value');
        
        // Desmarcar todas las estrellas
        document.querySelectorAll('#rating-stars .fa-star').forEach(star => {
            star.classList.remove('selected');
        });

        // Marcar las estrellas hasta la seleccionada
        for (let i = 0; i < value; i++) {
            document.querySelectorAll('#rating-stars .fa-star')[i].classList.add('selected');
        }
    });
});




