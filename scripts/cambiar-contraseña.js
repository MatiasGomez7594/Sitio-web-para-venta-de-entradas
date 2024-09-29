
    const form = document.getElementById('cambiarContraseñaForm');
    const mensajeDiv = document.getElementById('mensaje');
    console.log("prueba")


    form.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        const nuevaContraseña = document.getElementById('nuevaContraseña').value;
        const repetirContraseña = document.getElementById('repetirContraseña').value;

        const mensaje = validarContraseña(nuevaContraseña, repetirContraseña);
        mensajeDiv.textContent = mensaje; // Mostrar el mensaje en la pantalla

    });

    function validarContraseña(nueva, repetir) {
        if (nueva.length < 8) {
            return 'La contraseña debe tener al menos 8 caracteres.';
        }
        if (!/[A-Z]/.test(nueva)) {
            return 'La contraseña debe contener al menos una letra mayúscula.';
        }
        if (!/[0-9]/.test(nueva)) {
            return 'La contraseña debe contener al menos un número.';
        }
        if (nueva !== repetir) {
            return 'Las contraseñas no coinciden.';
        }
        return ''; // No hay errores
    }
