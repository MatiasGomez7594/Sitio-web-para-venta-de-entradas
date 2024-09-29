const nombreInput = document.getElementById('exampleInputUsuario');
const mensajeError = document.getElementById('mensajeError');
const emailInput = document.getElementById('exampleInputEmail1');
const mensajeError2 = document.getElementById('mensajeError2');
const passwordInput = document.getElementById('exampleInputPassword1');
const mensajeError3 = document.getElementById('mensajeError3');
const textInput = document.getElementById('exampleText');
const mensajeError4 = document.getElementById('mensajeError4');




emailInput.addEventListener('input', () => {
    const email = emailInput.value; // Ahora estamos validando un email, así que cambiemos la variable
    // Expresión regular para validar correos electrónicos (simplificada)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        mensajeError2.textContent = 'Por favor, ingresa una dirección de correo electrónico válida.';
    } else {
        emailInput.classList.remove('is-invalid');
        mensajeError2.textContent = '';
    }
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    // Expresión regular para validar contraseñas (ejemplo básico)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        passwordInput.classList.add('is-invalid');
        mensajeError3.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial.';
    } else {
        passwordInput.classList.remove('is-invalid');
        mensajeError3.textContent = '';
    }
});

textInput.addEventListener('input', () => {
    const texto = textInput.value;
    // Validación: máximo 50 caracteres
    if (texto.length > 50) {
        textInput.classList.add('is-invalid');
        mensajeError4.textContent = 'Has excedido el límite de 50 caracteres.';
    } else {
        textInput.classList.remove('is-invalid');
        mensajeError4.textContent = '';
    }
});


function Eliminar(){

    console.log("eliminado!!!")
}