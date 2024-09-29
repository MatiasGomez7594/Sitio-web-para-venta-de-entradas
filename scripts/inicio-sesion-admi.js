document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('InputEmail').value;
    const password = document.getElementById('InputPassword').value;
    const rol = document.getElementById('rolSelect').value;

    // Expresion regular para validar el formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validaciones
    let emailError = '';
    let passwordError = '';
    let rolError = '';
    
    // Validacion de email
    if (!email) {
        emailError = 'El email es obligatorio.';
    } else if (!emailRegex.test(email)) {
        emailError = 'El formato del email es inválido.';
    }

    // Validacion de contraseña
    if (!password) {
        passwordError = 'La contraseña es obligatoria.';
    } else if (password.length < 8) {
        passwordError = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!/[A-Z]/.test(password)) {
        passwordError = 'La contraseña debe incluir al menos una letra mayúscula.';
    } else if (!/[0-9]/.test(password)) {
        passwordError = 'La contraseña debe incluir al menos un número.';
    } else if (!/[!@#$%^&*]/.test(password)) {
        passwordError = 'La contraseña debe incluir al menos un carácter especial.';
    }

    // Validacion de rol
    if (!rol) {
        rolError = 'El tipo de administrador es obligatorio.';
    }
    
    // Mostrar errores si los hay
    document.querySelector('.email-error').textContent = emailError;
    document.querySelector('.contraseña-error').textContent = passwordError;
    document.querySelector('.rol-error').textContent = rolError;

    // Si hay errores, no continuar
    if (emailError || passwordError || rolError) {
        return;
    }

    // Simular validacion exitosa segun el rol
    if (rol === 'sistema') {
        window.location.href = 'interfaz-admin-sistemas.html'; // Redirige a la cuenta del administrador de sistema
    } else if (rol === 'eventos') {
        window.location.href = 'interfaz-admin-eventos.html'; // Redirige a la cuenta del administrador de eventos
    }
});
