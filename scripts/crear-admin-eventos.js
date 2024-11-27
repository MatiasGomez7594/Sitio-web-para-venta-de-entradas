
const form = document.getElementById('crearAdminForm');


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    const password= document.getElementById('password').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    let validacion = ValidarFormularioRegistro(password, nombre, email);
    if (validacion == true) { // Llama a la validación y permite el envío solo si retorna true
        form.submit(); // Envía el formulario
    }

});

function ValidarFormularioRegistro(password, nombre, email) {
    
  
    var nombreError = document.querySelector('#nombreError');
    var emailError = document.querySelector('#emailError');
    var passwordError = document.querySelector('#passwordError');

    // Limpiar mensajes de error previos
    nombreError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    var validado = true;

    //valido el nombre
    if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]{3,}$/.test(nombre)){
        
        nombreError.textContent = 'Por favor, el nombre debe ser mayor a 2 caracteres, puede incluir letras y números';

        validado = false;
    }

    // Validar el email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Por favor, ingresa tu email correctamente';

        validado = false;
    }

    // Regex para validar la contraseña
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        // Si la contraseña no cumple con los requisitos
        passwordError.textContent = "La contraseña no cumple con los requisitos. Al menos 8 caracteres de longitud, una letra minúscula (a-z), una letra mayúscula (A-Z), un número (0-9), un carácter especial.";
        validado = false;
    }

    // Si el formulario está validado llamo a la funcion registrarse
    return validado

}

