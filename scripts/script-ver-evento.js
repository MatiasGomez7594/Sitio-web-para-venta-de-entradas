document.querySelector('#btnComprar').addEventListener('click', function (event) {
    const selectCantidad = document.querySelector('select');
    const errorContainer = document.createElement('p');
    
    // Limpia  mensaje de error
    document.querySelector('.error-message')?.remove();
    
    // si se selecciono 
    if (selectCantidad.value === 'Selecciona la cantidad') {
        event.preventDefault();  // Evita que el formulario redirija a la segunda página
        errorContainer.textContent = 'Por favor selecciona una cantidad.';
        errorContainer.classList.add('error-message', 'text-danger');
        selectCantidad.parentNode.appendChild(errorContainer);
    }
});