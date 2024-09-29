document.getElementById('formfinalizarcompra').addEventListener('submit', function (event) {
    event.preventDefault();

    validarFormularioFinCompra();
});
 
function  validarFormularioFinCompra()
{
    
    const nombre = document.getElementById('nombreCompleto');
    const email = document.getElementById('exampleInputEmail1');
    const dni = document.getElementById('dni');
    const telefono = document.getElementById('telefono');
    const metodoPago1 = document.getElementById('flexRadioDefault1');
    const metodoPago2 = document.getElementById('flexRadioDefault2');

    let isValid = true;

    limpiarError(nombre);
    limpiarError(email);
    limpiarError(dni);
    limpiarError(telefono);
    limpiarError(metodoPago1);
    limpiarError(metodoPago2);


    const nombreValor = nombre.value.trim();
    const nombreRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
    const telefonoPattern = /^\d{10}$/; // Teléfono de 10 dígitos

    if (nombreValor === '') {
        mostrarError(nombre, 'El nombre completo es requerido.');
        isValid = false;
    } else if (!nombreRegex.test(nombreValor)) {
        mostrarError(nombre, 'El nombre no puede contener números ni caracteres especiales.');
        isValid = false;
    } else if ((nombreValor.split(/\s+/).length !== 2) ||(!/^(?:[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,}\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,})$/.test(nombreValor))) {
        mostrarError(nombre, 'Recuerde que ingresar su nombre y apellido.');
        isValid = false;
    } else if (nombreValor.length > 30) {
        mostrarError(nombre, 'Ingrese un nombre válido.');
        isValid = false;
    }
    // Validación del email
    if (email.value.trim() === '') {
        mostrarError(email, 'El email es requerido.');
        isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
        mostrarError(email, 'Por favor ingresa un email válido.');
        isValid = false;
    }

    // Validación del DNI
    if (dni.value.trim() === '') {
        mostrarError(dni, 'El DNI es requerido.');
        isValid = false;
    } else if (!/^\d{7,8}$/.test(dni.value)) {
        mostrarError(dni, 'Por favor ingresa un DNI válido,verifique la cantidad de digitos y recuerde que solo se permiten numeros.');
        isValid = false;
    }

     // Validación del teléfono
     if (telefono.value.trim() === '') {
        mostrarError(telefono, 'El teléfono es requerido.');
        isValid = false;
    } 
     else if(!/^\d+$/.test(telefono.value.trim())){
        mostrarError(telefono,'El telefono solo puede contener numeros.');
        isValid = false;
    
    }else if (!telefonoPattern.test(telefono.value.trim())) {
             mostrarError(telefono, 'El teléfono debe contener exactamente 10 dígitos.');
             isValid = false;
    }
    

    if (metodoPago1.checked) {
        
        const tarjetaNueva= document.getElementById('tarjetaNueva');
        const tarjetaGuardada= document.getElementById('tarjetaGuardada');
        const nombreTitular = document.getElementById('nombreTitular');
        const apellidoTitular= document.getElementById('apellidoTitular');
        const numeroTarjeta = document.getElementById('numeroTarjeta');
        const fechaEmision=   document.getElementById('fechaEmision');
        const fechaExpiracion = document.getElementById('fechaExpiracion');
        const codigoSeguridad = document.getElementById('codigoSeguridad');
        const tipoTarjeta = document.getElementById('selecttipoTarjeta'); 
        
        const tarjetasGuardadas = document.getElementById('tarjetasGuardadas');
        //para validar fecha emision
        const [mesEmision, anioEmision] = fechaEmision.value.split('/');
        const fechaActual = new Date();
        const fechaEmisionDate = new Date(`20${anioEmision}`, mesEmision - 1);

         //  para Validar fecha de vencimiento
         const [mesVencimiento, anioVencimiento] = fechaExpiracion.value.split('/');
         const fechaVencimientoDate = new Date(`20${anioVencimiento}`, mesVencimiento - 1);

        limpiarError(nombreTitular); 
        limpiarError(apellidoTitular);
        limpiarError(numeroTarjeta);
        limpiarError(fechaEmision);
        limpiarError(fechaExpiracion);
        limpiarError(codigoSeguridad);
        limpiarError(tipoTarjeta);
        limpiarError(tarjetasGuardadas);
        limpiarError(tarjetaNueva);
        
     if (tarjetaNueva.checked) {  //si selecciona para ingresar los datos de una tarjeta  muestro form, valido
         
         if(nombreTitular.value.trim() === ''){    // valido nombre
            mostrarError(nombreTitular,'El nombre es requerido.')
            isValid = false;
       
            } else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/.test(nombreTitular.value)){

                       mostrarError(nombreTitular,'Ingrese un nombre correcto.')
                        isValid = false;
            }


         if(apellidoTitular.value.trim() === ''){    // valido apellido 
            mostrarError(apellidoTitular,'El apellido es requerido.')
            isValid = false;
       
            } else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/.test(apellidoTitular.value)){
          
                       mostrarError(apellidoTitular,'Ingrese un apellido correcto.')
                        isValid = false;
             }


        if (numeroTarjeta.value.trim() === '') {   // valido nro tarjeta 
            mostrarError(numeroTarjeta, 'El número de tarjeta es requerido.');
            isValid = false;

           } else if (!/^\d{16}$/.test(numeroTarjeta.value)) {

                    mostrarError(numeroTarjeta, 'El número de tarjeta debe contener 16 dígitos.');
                    isValid = false;
           }
         

        if(fechaEmision.value.trim() === ''){  // valido fecha de emision
            mostrarError(fechaEmision,'La fecha de emision es requerida.');
            isValid=false;

           } else if (fechaEmisionDate > fechaActual) {  
                      mostrarError(fechaEmision,'Ingrese una  fecha de emisión valida.');
                      isValid = false;
           } else if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaEmision.value)){
                      mostrarError(fechaEmision,'Ingrese una  fecha de emisión valida, recuerde el formato MM/AA..');
                      isValid = false;
           }



        if (fechaExpiracion.value.trim() === '') { // valido vec de tarjeta 
            mostrarError(fechaExpiracion, 'La fecha de expiración es requerida.');
            isValid = false;
            } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaExpiracion.value)) {
                       mostrarError(fechaExpiracion, 'Ingrese una  fecha experiracion valida, recuerde el formato MM/AA..');
                       isValid = false;
           
            }else if(fechaVencimientoDate < fechaActual){
                     mostrarError(fechaExpiracion,'La tarjeta se encuentra vencida.')
                     isValid = false;
            }

        if (codigoSeguridad.value.trim() === '') {  //valido cod seguridad
            mostrarError(codigoSeguridad, 'El código de seguridad es requerido.');
            isValid = false;
           } else if (!/^\d{3}$/.test(codigoSeguridad.value)) {
                     mostrarError(codigoSeguridad, 'El código de seguridad debe contener 3 dígitos.');
                     isValid = false;
        }

        if (!tipoTarjeta.value) { // valido si selecciono debito/credito
            mostrarError(tipoTarjeta,'Debes seleccionar un tipo de tarjeta (Crédito o Débito).');
            isValid =false;
        }
    
   
   
   
     }
    if (tarjetaGuardada.checked) {// si selecciona la opcion de sus tarjetas , valido 
       
           if (tarjetasGuardadas.value === '') {
               mostrarError(tarjetasGuardadas, 'Por favor selecciona una tarjeta guardada.');
                isValid = false;
              }

       }
        else if((!tarjetaNueva.checked ) && (!tarjetaGuardada.checked)){
               mostrarError(tarjetaNueva,'Debe seleccionar una opcion.');
               isValid = false;
       }



     } else if ((!metodoPago2.checked) && (!metodoPago1.checked)) {
        mostrarError(metodoPago2, 'Por favor selecciona un método de pago.');
        isValid = false;
     }

    
    if (isValid) {
        
        var modalElement = document.getElementById('modalCompraExitosa');
        console.log("El formulario es válido.");
        // Crear una instancia del modal usando Bootstrap 5
        var modal = new bootstrap.Modal(modalElement);
        
        modal.show();
    
    }






}



document.getElementById('flexRadioDefault1').addEventListener('change', function () {
    document.getElementById('seleccionTarjeta').classList.remove('d-none');
    document.getElementById('infoEfectivo').classList.add('d-none');
   document.querySelectorAll('input[name="opcionTarjeta"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        const opcionSeleccionada = document.querySelector('input[name="opcionTarjeta"]:checked').value;
        const nuevaTarjetaForm = document.getElementById('opcionNuevaTarjeta');
        const tarjetaGuardadaSelect = document.getElementById('opcionTarjetaGuardada');

        if (opcionSeleccionada === 'guardada') {
            tarjetaGuardadaSelect.classList.remove('d-none');
            nuevaTarjetaForm.classList.add('d-none');
        } else if (opcionSeleccionada === 'nueva') {
            tarjetaGuardadaSelect.classList.add('d-none');
            nuevaTarjetaForm.classList.remove('d-none');
        }
    });
});

});

document.getElementById('flexRadioDefault2').addEventListener('change', function () {
    document.getElementById('seleccionTarjeta').classList.add('d-none');
    document.getElementById('opcionNuevaTarjeta').classList.add('d-none');
    document.getElementById('opcionTarjetaGuardada').classList.add('d-none');
    document.getElementById('infoEfectivo').classList.remove('d-none');
  });
//Mostrar u ocultar formulario de tarjeta nueva
document.getElementById('tarjetaGuardada').addEventListener('change', function () {
    document.getElementById('opcionNuevaTarjeta').classList.add('d-none');
    document.getElementById('opcionTarjetaGuardada').classList.remove('d-none');
  });

document.getElementById('tarjetaNueva').addEventListener('change', function () {
    document.getElementById('opcionNuevaTarjeta').classList.remove('d-none');
    document.getElementById('opcionTarjetaGuardada').classList.add('d-none');
  });



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
