document.addEventListener('DOMContentLoaded', function() {
    const btnNuevo = document.getElementById('btnNuevo');

    if (btnNuevo) {
        btnNuevo.addEventListener('click', function(event) {
            event.preventDefault();  // Evita que el formulario se envie directamente

            // Redirige 
            window.location.href = '../BBDD/crear_admin_eventos.php';
            exit();
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los formularios de eliminacion
    const eliminar_admi = document.querySelectorAll('.eliminar-form');

    eliminar_admi.forEach(form => {
        form.addEventListener('submit', function(event) {
            const confirmar = confirm("¿Está seguro de que desea eliminar a este administrador?");

            if (!confirmar) {
                // Prevenir el envio del formulario si el usuario cancela
                event.preventDefault();
            }
        });
    });
});
