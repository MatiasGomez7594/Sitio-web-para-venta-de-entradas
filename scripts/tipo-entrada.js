const tablaentradas = document.getElementById('tablaentradas');

// Cargar tipos de entrada al cargar la página
document.addEventListener('DOMContentLoaded', cargarentradas);

function cargarentradas() {
    fetch('../BBDD/obtener-tipos-entradas.php')
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar las categorías");
            return response.json();
        })
        .then(data => mostrarentradas(data))
        .catch(error => console.error("Error:", error));
}

// Mostrar entradas en la tabla
function mostrarentradas(entradas) {
    const bodytabla = document.getElementById('bodytabla');
    bodytabla.innerHTML = '';

    entradas.forEach(entrada => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${entrada.nombre_tipo}</td>
            <td>${entrada.estado}</td>
            <td>
                <button class="btn btn-warning btn-edit" data-id="${entrada.id_tipo}">Editar</button>
                <button class="btn btn-danger btn-delete" data-id="${entrada.id_tipo}">Eliminar</button>
            </td>
        `;
        bodytabla.appendChild(fila);
    });
}

// Validación del formularios
function validarFormularioentradas(nombreInput, estadoInput) {
    let isValid = true;
    limpiarError(nombreInput);
    limpiarError(estadoInput);

    if (nombreInput.value.trim() === '') {
        mostrarError(nombreInput, 'Debe ingresar un nombre para la entrada.');
        isValid = false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/.test(nombreInput.value)) {
        mostrarError(nombreInput, 'Ingrese un nombre válido. Solo puede contener letras y hasta 50 caracteres.');
        isValid = false;
    }

    if (estadoInput.value === "") {
        mostrarError(estadoInput, 'Debe ingresar un estado para la entrada.');
        isValid = false;
    }

    return isValid;
}




// formulario de agregar
document.getElementById("formentradas").addEventListener("submit", function(event) {
    event.preventDefault();
    const nombreentrada = document.getElementById('nombreentrada');
    const estadoentrada= document.getElementById('estadoentrada');

    if (validarFormularioentradas(nombreentrada, estadoentrada)) {
        agregarentrada();
    }
});

// Agregarentrada
function agregarentrada() {
    const formData = new FormData(document.getElementById("formentradas"));
    formData.append('action', 'add');

    fetch('../BBDD/AMBentradas.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("formentradas").reset();
            cargarentradas();
        } else {
            mostrarError(document.getElementById('nombreentrada'), data.errors.nombreentrada);
            mostrarError(document.getElementById('estadoentrada'), data.errors.estadoentrada);
        }
    });
}

//  si se hizo click en editar o eliminar  --> llama a la funcion 
tablaentradas.addEventListener('click', function(e) {
    const identrada = e.target.dataset.id;

    if (e.target.classList.contains('btn-delete')) {
        eliminarEntrada(identrada);
    } else if (e.target.classList.contains('btn-edit')) {
        editarEntrada(identrada);
    }
});


// Eliminar tipo de entrada
function eliminarEntrada(identrada) {
    fetch('../BBDD/AMBentradas.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ action: 'delete', id_entrada: identrada })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cargarentradas();
        } else {
            
        }
    });
}

// Editar tipo de entrada  muestra los datos en el modal 
function editarEntrada(identrada) {
    fetch(`../BBDD/obtener-entrada.php?id=${identrada}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('editIdEntrada').value = data.id_tipo;
            document.getElementById('editNombreEntrada').value = data.nombre_tipo;
            document.getElementById('editEstadoEntrada').value = data.estado;

            const modal = new bootstrap.Modal(document.getElementById('modalEditarEntrada'));
            modal.show();
            limpiarError(editNombreEntrada);
            limpiarError(editEstadoEntrada);

        });
}


document.getElementById('formEditarEntrada').addEventListener('submit', function(e) {
    e.preventDefault();
    const editNombreEntrada = document.getElementById('editNombreEntrada');
    const editEstadoEntrada = document.getElementById('editEstadoEntrada');

   
    limpiarError(editNombreEntrada);
    limpiarError(editEstadoEntrada);

    // Validar los campos
    if (validarFormularioentradas(editNombreEntrada, editEstadoEntrada)) {
        actualizarEntrada();
    }
});


// se mandan los datos para que se haga el update
function actualizarEntrada() {
    const formData = new FormData(document.getElementById('formEditarEntrada'));
    formData.append('action', 'edit');

    fetch('../BBDD/AMBentradas.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarEntrada'));
            modal.hide();
            cargarentradas();
        } else {
            
            limpiarError(document.getElementById('editNombreEntrada'));
            limpiarError(document.getElementById('editEstadoEntrada'));

            // Mostrar  errores
            mostrarError(document.getElementById('editNombreEntrada'), data.errors.nombreEntrada);
            mostrarError(document.getElementById('editEstadoEntrada'), data.errors.estadoEntrada);
        }
    });
}


function mostrarError(input, mensaje) {
    const errorExistente = input.parentNode.querySelector('.error-message');
    if (errorExistente) errorExistente.remove();

    const errorContainer = document.createElement('p');
    errorContainer.textContent = mensaje;
    errorContainer.classList.add('error-message', 'text-danger');
    input.parentNode.appendChild(errorContainer);
}


function limpiarError(input) {
    const errorExistente = input.parentNode.querySelector('.error-message');
    if (errorExistente) errorExistente.remove();
}
