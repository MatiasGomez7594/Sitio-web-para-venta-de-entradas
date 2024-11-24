
    const form = document.getElementById('cambiarContraseñaForm');


    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío del formulario
        const contraseñaActual = document.getElementById('contrasena_actual').value;
        const nuevaContraseña = document.getElementById('nueva_contrasena').value;
        const repetirContraseña = document.getElementById('confirmar_contrasena').value;

        let validacion = ValidarContrasena(contraseñaActual, nuevaContraseña, repetirContraseña);
        if (validacion == true) { // Llama a la validación y permite el envío solo si retorna true
            form.submit(); // Envía el formulario
        }

    });

    function ValidarContrasena(actual, nueva, repetir) {
        // Regex para validar la contraseña
        let error = document.getElementById("error")
        let error1 = document.getElementById("errorContrasenaActual")
        let error2 = document.getElementById("errorContrasenaNueva")
        let error3 = document.getElementById("errorConfirmarContrasena")
        let validado = true
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(actual)) {
            // Si la contraseña no cumple con los requisitos
            error1.textContent = "La contraseña no cumple con los requisitos.Al menos 8 caracteres de longitud, una letra minúscula (a-z), una letra mayúscula (A-Z), un número (0-9), un carácter especial.";
            validado = false;
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(nueva)) {
            // Si la contraseña no cumple con los requisitos
            error2.textContent = "La contraseña no cumple con los requisitos.Al menos 8 caracteres de longitud, una letra minúscula (a-z), una letra mayúscula (A-Z), un número (0-9), un carácter especial.";
            validado = false;
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(repetir)) {
            // Si la contraseña no cumple con los requisitos
            error3.textContent = "La contraseña no cumple con los requisitos.Al menos 8 caracteres de longitud, una letra minúscula (a-z), una letra mayúscula (A-Z), un número (0-9), un carácter especial.";
            validado = false;
        }
        else if (nueva !== repetir) {
            error.textContent="Las contraseñas no coinciden."
            validado = false;
        }


        return validado // No hay errores
    }

