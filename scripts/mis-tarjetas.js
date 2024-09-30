const form = document.getElementById("nuevaTarjeta"); 
const resultado = document.getElementById('resultado');
const tablaTarjetas = document.getElementById('tablaTarjetas');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario para realizar validaciones

    // Obtener los valores del formulario
    const numeroTarjeta = document.getElementById('numeroTarjeta').value;
    const nombreTitular = document.getElementById('nombreTitular').value;
    const apellidoTitular = document.getElementById('apellidoTitular').value;
    const fechaEmision = document.getElementById('fecha1').value;
    const fechaVencimiento = document.getElementById('fecha2').value;
    const ccv = document.getElementById('ccv').value;
    const tipoTarjeta = document.getElementById('tipoTarjeta').value; // Obtener tipo de tarjeta

    // Limpiar el resultado anterior
    resultado.innerHTML = '';

    // Validaciones
    const errores = [];

    // Validar número de tarjeta (solo números y longitud)
    if (!/^\d{16}$/.test(numeroTarjeta)) {
        errores.push('El número de tarjeta debe tener 16 dígitos.');
    }

    // Validar CVV (3 dígitos)
    if (!/^\d{3}$/.test(ccv)) {
        errores.push('El código CCV debe tener 3 dígitos.');
    }

    // Validar fecha de emisión
    const [mesEmision, anioEmision] = fechaEmision.split('/');
    const fechaActual = new Date();
    const fechaEmisionDate = new Date(`20${anioEmision}`, mesEmision - 1); // El mes es 0-indexed

    if (fechaEmisionDate > fechaActual) {
        errores.push('La fecha de emisión no puede ser posterior al día actual.');
    }

    // Validar fecha de vencimiento
    const [mesVencimiento, anioVencimiento] = fechaVencimiento.split('/');
    const fechaVencimientoDate = new Date(`20${anioVencimiento}`, mesVencimiento - 1);

    if (fechaVencimientoDate < fechaActual) {
        errores.push('La tarjeta está vencida.');
    }

    // Validar tipo de tarjeta
    if (!tipoTarjeta) {
        errores.push('Debes seleccionar un tipo de tarjeta (Crédito o Débito).');
    }

    // Mostrar errores o enviar formulario
    if (errores.length > 0) {
        const listaErrores = errores.map(error => `<li>${error}</li>`).join('');
        resultado.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <strong>Se encontraron los siguientes errores:</strong>
            <ul>${listaErrores}</ul>
        </div>`;
    } else {
        resultado.innerHTML = `
        <div class="alert alert-success" role="alert">
            <strong>¡Éxito!</strong> La tarjeta ha sido añadida exitosamente.
        </div>`;

        // Agregar la tarjeta a la tabla
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>${nombreTitular} ${apellidoTitular}</td>
            <td>${numeroTarjeta}</td>
            <td>${fechaEmision}</td>
            <td>${fechaVencimiento}</td>
            <td>${ccv}</td>
            <td>${tipoTarjeta.charAt(0).toUpperCase() + tipoTarjeta.slice(1)}</td>
            <td><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>
        `;
        tablaTarjetas.querySelector('tbody').appendChild(nuevaFila);
        
        // Limpiar el formulario
        form.reset();
    }
});

// Evento para eliminar tarjeta
tablaTarjetas.addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminar')) {
        const fila = event.target.closest('tr');
        fila.classList.add('d-none'); // Ocultar la fila eliminada
    }
});


