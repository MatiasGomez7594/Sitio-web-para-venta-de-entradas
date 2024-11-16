const tablacategorias = document.getElementById('tablacategorias');

// Cargar categorías al cargar la página
document.addEventListener('DOMContentLoaded', cargarcategorias);

function cargarcategorias() {
    fetch('../BBDD/obtener-categorias.php')
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar las categorías");
            return response.json();
        })
        .then(data => mostrarcategorias(data))
        .catch(error => console.error("Error:", error));
}

// Mostrar categorías en la tabla
function mostrarcategorias(categorias) {
    const bodytabla = document.getElementById('bodytabla');
    bodytabla.innerHTML = '';

    categorias.forEach(categoria => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${categoria.nombre_categoria}</td>
            <td>${categoria.estado}</td>
            <td>
                <button class="btn btn-warning btn-edit" data-id="${categoria.id_categoria}">Editar</button>
                <button class="btn btn-danger btn-delete" data-id="${categoria.id_categoria}">Eliminar</button>
            </td>
        `;
        bodytabla.appendChild(fila);
    });
}

// Validación del formularios
function validarFormularioCategoria(nombreInput, estadoInput) {
    let isValid = true;
    limpiarError(nombreInput);
    limpiarError(estadoInput);

    if (nombreInput.value.trim() === '') {
        mostrarError(nombreInput, 'Debe ingresar un nombre.');
        isValid = false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/.test(nombreInput.value)) {
        mostrarError(nombreInput, 'Ingrese un nombre válido. Solo puede contener letras.');
        isValid = false;
    }

    if (estadoInput.value === "") {
        mostrarError(estadoInput, 'Debe ingresar un estado para la categoría.');
        isValid = false;
    }

    return isValid;
}




// formulario de agregar categoria
document.getElementById("formcategorias").addEventListener("submit", function(event) {
    event.preventDefault();
    const nombrecategoria = document.getElementById('nombrecategoria');
    const estadocategoria = document.getElementById('estadocategoria');

    if (validarFormularioCategoria(nombrecategoria, estadocategoria)) {
        agregarcategoria();
    }
});

// Agregar categoria 
function agregarcategoria() {
    const formData = new FormData(document.getElementById("formcategorias"));
    formData.append('action', 'add');

    fetch('../BBDD/AMBcategorias.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("formcategorias").reset();
            cargarcategorias();
        } else {
            mostrarError(document.getElementById('nombrecategoria'), data.errors.nombrecategoria);
            mostrarError(document.getElementById('estadocategoria'), data.errors.estadocategoria);
        }
    });
}

//  si se hizo click en editar o eliminar  --> llama a la funcion le pasa el id de categoria
tablacategorias.addEventListener('click', function(e) {
    const idcategoria = e.target.dataset.id;

    if (e.target.classList.contains('btn-delete')) {
        eliminarCategoria(idcategoria);
    } else if (e.target.classList.contains('btn-edit')) {
        editarCategoria(idcategoria);
    }
});


// Eliminar categoría
function eliminarCategoria(idcategoria) {
    fetch('../BBDD/AMBcategorias.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ action: 'delete', id_categoria: idcategoria })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cargarcategorias();
        } else {
            
        }
    });
}

// Editar categoría  muestra los datos en el modal 
function editarCategoria(idCategoria) {
    fetch(`../BBDD/obtener-categoria.php?id=${idCategoria}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('editIdCategoria').value = data.id_categoria;
            document.getElementById('editNombreCategoria').value = data.nombre_categoria;
            document.getElementById('editEstadoCategoria').value = data.estado;

            const modal = new bootstrap.Modal(document.getElementById('modalEditarCategoria'));
            modal.show();
        });
}


document.getElementById('formEditarCategoria').addEventListener('submit', function(e) {
    e.preventDefault();
    const editNombreCategoria = document.getElementById('editNombreCategoria');
    const editEstadoCategoria = document.getElementById('editEstadoCategoria');

   
    limpiarError(editNombreCategoria);
    limpiarError(editEstadoCategoria);

    // Validar los campos
    if (validarFormularioCategoria(editNombreCategoria, editEstadoCategoria)) {
        actualizarCategoria();
    }
});


// Actualizar categoría
function actualizarCategoria() {
    const formData = new FormData(document.getElementById('formEditarCategoria'));
    formData.append('action', 'edit');

    fetch('../BBDD/AMBcategorias.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Cerrar modal al actualizar correctamente
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarCategoria'));
            modal.hide();
            cargarcategorias();
        } else {
            
            limpiarError(document.getElementById('editNombreCategoria'));
            limpiarError(document.getElementById('editEstadoCategoria'));

            // Mostrar  errores
            mostrarError(document.getElementById('editNombreCategoria'), data.errors.nombrecategoria);
            mostrarError(document.getElementById('editEstadoCategoria'), data.errors.estadocategoria);
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
