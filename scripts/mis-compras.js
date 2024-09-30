const filas = document.querySelectorAll('.conciertos'); // Selecciona todas las filas de la tabla
    
filas.forEach(fila => {
    const estado = fila.querySelector('.estado').textContent.trim(); // Obtiene el estado
    const acciones = fila.querySelector('.acciones'); // Columna de acciones
    const estadoCelda = fila.querySelector('.estado'); // Celda que contiene el estado

    if (estado === 'Finalizado') {
        estadoCelda.classList.add('text-danger');
        acciones.innerHTML = `
        <div class="califEstrella">
            <input type="radio" id="star5" name="rating" value="5"><label for="star5">★</label>
            <input type="radio" id="star4" name="rating" value="4"><label for="star4">★</label>
            <input type="radio" id="star3" name="rating" value="3"><label for="star3">★</label>
            <input type="radio" id="star2" name="rating" value="2"><label for="star2">★</label>
            <input type="radio" id="star1" name="rating" value="1"><label for="star1">★</label>
        </div>`;
    } else if (estado === 'Activo') {
        estadoCelda.classList.add('text-success');
        acciones.innerHTML = '<button type="button" class="btn btn-primary cancelar">Cancelar compra</button>';
    }
});

// Obtener todos los botones de cancelar
const botonesCancelar = document.querySelectorAll('.cancelar');

botonesCancelar.forEach(boton => {
    boton.addEventListener('click', function (event) {
        event.preventDefault();
        
        const fila = boton.closest('tr');
  
        fila.classList.add('d-none');
    });
});

  