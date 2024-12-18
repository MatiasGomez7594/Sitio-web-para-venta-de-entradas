
document.getElementById('registrarse').addEventListener('click', function() {
    
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
    if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]{3,}$/.test(nombre)){
        
        nombreError.textContent = 'Por favor, el nombre debe ser mayor a 2 caracteres, puede incluir letras y numeros';

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

    // Si el formulario está validado llamo a la funcion registrarse
    if (validado==true) {
        Registrarse() 


        
    }

}


 


function Registrarse() {

            // Crear un objeto FormData y agregar los datos del formulario
            const formData = new FormData(document.getElementById('formularioRegistro'));

            // Enviar la solicitud AJAX
            fetch('../BBDD/registrar_usuario.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                
               // responseDiv.innerText = data.message;
                //responseDiv.style.color = data.status === "success" ? "green" : "red";
        
                if (data.status === "email registrado") {
                    mensaje = data.message
                    console.log(mensaje)

                    document.getElementById("errorRegistro").textContent = data.message

                // Si el registro es exitoso, limpiar el formulario, muestro un modal

                }else{
                    mensaje = data.message
                    console.log(mensaje)
                    
                    document.getElementById("formularioRegistro").reset()
                    var modalElement = document.getElementById('successModal');
          
                    var modal = new bootstrap.Modal(modalElement);
                    
                    modal.show();
            
                      // Escuchar el evento cuando el modal se oculta
                      modalElement.addEventListener('hidden.bs.modal', function () {
                        window.location.href = '../index.php'; // Cambia 'index.php' por la URL de tu página de inicio
                    });
        
                }


            })
            .catch(error => {
                console.log(error)
                document.getElementById('errorRegistro').innerHTML = 'Error: ' + error;
            });
        }
    

