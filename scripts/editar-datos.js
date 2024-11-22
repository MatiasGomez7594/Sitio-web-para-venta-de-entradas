document.getElementById("formeditardatos").addEventListener("submit", function(event){
    event.preventDefault();
   validarFormulario();
   

});





function validarFormulario() {
        let isValid = true;

        const nombreusuario = document.getElementById('nombre_usuario');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        //const errorMessagesDiv = document.getElementById('error-messages');
        const genero=document.getElementById("genero");
        const generoerror= document.getElementById("generoerror");
    
        limpiarError(nombreusuario);
        limpiarError(email);
        limpiarError(telefono);
        limpiarError(generoerror);
        
        // Validación del nombre de usuario
        if(nombreusuario.value === ""){
            mostrarError(nombreusuario,"Debe ingresar el nombre por favor ");
            isValid=false;
        }
         else if(nombreusuario.value.length < 3) {
                        mostrarError(nombreusuario,"El nombre de usuario debe tener al menos 3 letras.");
                        isValid = false;
        }

        // Validación del email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.value === ""){
            mostrarError(email,"Debe ingresar el email por favor");
            isValid=false;
        }
         else if  (!regexEmail.test(email.value)) {
                    mostrarError(email,"El email ingresado no tiene  un formato válido.");
                    isValid = false;
        }

        // Validación del teléfono )
        const regexTelefono = /^\d{10}$/;
       
        if  (!regexTelefono.test(telefono.value)) {
                    mostrarError( telefono,"El teléfono debe contener solo numeros y hasta 10 digitos ");
                    isValid = false;
        }

        

                    if (isValid) {
                        document.getElementById("formeditardatos").submit();
                    }


}



    function mostrarError(input, mensaje) {
        // Elimina el mensaje de error existente, si lo hay
        const errorExistente = input.parentNode.querySelector('.error-message');
        if (errorExistente) {
            errorExistente.remove();
        }
    
        // Crea y añade un nuevo mensaje de error
        const errorContainer = document.createElement('p');
        errorContainer.textContent = mensaje;
        errorContainer.classList.add('error-message', 'text-danger');
        input.parentNode.appendChild(errorContainer);
    }
    
    // Función para limpiar errores
    function limpiarError(input) {
        const errorExistente = input.parentNode.querySelector('.error-message');
        if (errorExistente) {
            errorExistente.remove();
        }
    }
    