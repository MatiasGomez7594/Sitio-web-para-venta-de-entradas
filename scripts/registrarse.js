document.getElementById('formularioRegistro').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    validarFormularioRegistro(); // Llamada a la función de validación
});

function validarFormularioRegistro() {
    
    var nombre = document.getElementById('InputUsuario').value;
    var email = document.getElementById('InputEmail').value;
    var contrasena = document.getElementById('InputPassword').value;

    var nombreError = document.querySelector('.nombre-error');
    var emailError = document.querySelector('.email-error');
    var contraseñaError = document.querySelector('.contraseña-error');

    // Limpiar mensajes de error previos
    nombreError.textContent = '';
    emailError.textContent = '';
    contraseñaError.textContent = '';

    var validado = true;

    //valido el nombre
    if (!/^[A-Za-z0-9]{5,}$/.test(nombre)){
        
        nombreError.textContent = 'Por favor, el nombre debe ser mayor a 4 caracteres, puede incluir letras y numeros';

        validado = false;
    }

    // Validar el email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Por favor, ingresa tu email correctamente';

        validado = false;
    }

    // Regex para validar la contraseña
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(contrasena)) {
        // Si la contraseña no cumple con los requisitos
        contraseñaError.textContent = "La contraseña no cumple con los requisitos.Al menos 8 caracteres de longitud, una letra minúscula (a-z), una letra mayúscula (A-Z), un número (0-9), un carácter especial.";
        contraseñaError.style.color = "red";
        validado = false;
    }

    // Si el formulario está validado muetra el modal
    if (validado) {

        var modalElement = document.getElementById('successModal');
      
        // Crear una instancia del modal usando Bootstrap 5
        var modal = new bootstrap.Modal(modalElement);
        
        modal.show();

          // Escuchar el evento cuando el modal se oculta
          modalElement.addEventListener('hidden.bs.modal', function () {
            window.location.href = '../inicio.html'; // Cambia 'index.html' por la URL de tu página de inicio
        });
        
    }

}


 