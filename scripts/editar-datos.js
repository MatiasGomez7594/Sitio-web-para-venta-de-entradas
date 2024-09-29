
function validarFormulario(event) {
    event.preventDefault();  // Prevenir envío del formulario 

    const nombreUsuario = document.getElementById('nombre-usuario').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const errorMessagesDiv = document.getElementById('error-messages');

    let errores = [];

    // Limpiar mensajes de error anteriores
    errorMessagesDiv.innerHTML = '';
    errorMessagesDiv.classList.add('d-none'); // Ocultar el contenedor inicialmente

    // Validación del nombre de usuario
    if (nombreUsuario.length < 3) {
        errores.push("El nombre de usuario debe tener al menos 3 letras.");
    }

    // Validación del email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        errores.push("El email debe tener un formato válido.");
    }

    // Validación del teléfono (números únicamente, con 7 a 15 dígitos)
    const regexTelefono = /^\d{7,15}$/;
    if (!regexTelefono.test(telefono)) {
        errores.push("El teléfono debe contener solo números y tener entre 7 y 15 dígitos.");
    }

    // Mostrar errores o permitir envío
    if (errores.length > 0) {
        errorMessagesDiv.innerHTML = errores.join("<br>"); // Mostrar errores en el contenedor
        errorMessagesDiv.classList.remove('d-none'); // Mostrar el contenedor
    } else {
        errorMessagesDiv.classList.add('d-none'); // Ocultar el contenedor si no hay errores
    }
}



    const form = document.querySelector("form");
    form.addEventListener("submit", validarFormulario);

