document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    validarFormulario(); // Llamada a la función de validación
});

function validarFormulario() {
    var email = document.getElementById('InputEmail').value;
    var contrasena = document.getElementById('InputPassword').value;

    var emailError = document.querySelector('.email-error');
    var contraseñaError = document.querySelector('.contraseña-error');

    // Limpiar mensajes de error previos
    emailError.textContent = '';
    contraseñaError.textContent = '';

    var validado = true;

    // Validar el email
    if (email === '') {
        emailError.textContent = 'Por favor, ingresa tu email';
        validado = false;
    }

    // Regex para validar la contraseña
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(contrasena)) {
        // Si la contraseña no cumple con los requisitos
        contraseñaError.textContent = "La contraseña no cumple con los requisitos.Al menos 8 caracteres de longitud, una letra minúscula (a-z), una letra mayúscula (A-Z), un número (0-9), un carácter especial.";
        contraseñaError.style.color = "red";
        validado = false;
    }

    // Si el formulario está validado, puedes proceder con el envío o alguna acción
    if (validado) {
        // Redirigir a otra página
    window.location.href = "mi-cuenta.html";
        // Aquí puedes proceder con el envío del formulario o realizar alguna acción
        console.log('Formulario válido. Procediendo...');
    }
}
