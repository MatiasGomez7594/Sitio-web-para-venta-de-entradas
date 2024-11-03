document.addEventListener("DOMContentLoaded", function() {
    // Llamada AJAX para obtener los detalles del evento
    fetch('../BBDD/ver_evento.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:document.getElementById("id_evento").value})
    })
    .then(response => response.json())
    .then(data => {
        mostrarEvento(data); // Llama a una función para mostrar los datos
    })
    .catch(error => console.error('Error:', error));
});


function HayEntradas(cantidad){
  resultado = cantidad
  if(parseInt(cantidad)<=0){
    resultado = "Agotada"
  }
  return `${resultado}`;

}

function FormatearFecha(fechaStr) {
    const fecha = new Date(fechaStr); // Crea un objeto Date a partir de la cadena de fecha

    // Arreglos para obtener el nombre del mes y el día de la semana
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Obtener el día, mes y año
    const dia = fecha.getDate().toString().padStart(2, '0'); // Asegurarse de que el día tenga dos dígitos
    const mes = meses[fecha.getMonth()]; // Obtener el nombre del mes
    const anio = fecha.getFullYear(); // Obtener el año
    const diaSemana = dias[fecha.getDay()]; // Obtener el día de la semana

    // Obtener la hora y los minutos
    const hora = fecha.getHours().toString().padStart(2, '0'); // Asegurarse de que la hora tenga dos dígitos
    const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Asegurarse de que los minutos tengan dos dígitos

    // Retornar la fecha y la hora formateadas
    return `${diaSemana} ${dia} de ${mes} ${anio} a las ${hora}:${minutos} hrs.`;
}

// Función para mostrar los datos en el HTML
function mostrarEvento(data) {
  const eventoDescripcion = document.getElementById('eventoDescripcion');
  let flyerEvento;
  if(data.imagenes){
      let imgs = data.imagenes.split(","); 
      flyerEvento = imgs[0];
  } else {
      flyerEvento = "imgs/img-no-disponible.jpg";
  }

  eventoDescripcion.innerHTML = `
      <hr class="divider">
      <div class="p-5 mb-2 bg-body-secondary col-lg-2 col-md-12 flyer">
          <img src="../${flyerEvento}" class="img-fluid" style="height: 100%; object-fit: cover;" alt="Flyer">
      </div>
      <div class="p-5 mb-2 bg-body-secondary col-lg-8 col-md-12">
          <h4 class="mt-3 mb-3">${data.nombre_evento}</h4>
          <h5 class="mb-3 text-warning">
              ${FormatearFecha(data.fecha_inicio)}
          </h5>
      </div>
      <div class="col col-lg-2 col-md-12 ubicacionEvento"> 
          <i class="fas fa-map-marker-alt text-body-tertiary globo fa-lg fa-2x"></i>
          <h5>${data.nombre_recinto}</h5>
          <h5>${data.direccion}</h5>
          <h5>${data.ciudad_nombre}, ${data.provincia_nombre}</h5>
      </div>
      <hr class="divider">
  `;

  let entradas = JSON.parse('[' + data.tipos_entradas + ']');
  let tipoEntradas = [];
  let entradasNumeradas = [];
  let entradasNoNumeradas = [];
  let totalTiposNumeradas = 0;

  entradas.forEach(element => {
      if (!tipoEntradas.some(item => item.tipo === element.nombre_tipo)) {
          tipoEntradas.push({
              tipo: element.nombre_tipo,
              estanNumeradas: element.estan_numeradas,
              precio: element.precio,
              cantidad: element.cantidad_por_tipo
          });
      }
  });

  entradas.forEach(element => {
      if (element.estan_numeradas == 'no') {
          entradasNoNumeradas.push({
              id_tipo_x_evento: element.id_tipo_x_evento,
              tipo: element.nombre_tipo,
              total: element.cantidad_por_tipo,
              precio: element.precio
          });
      } else {
          if (!entradasNumeradas.some(item => item.tipo === element.nombre_tipo)) {
              totalTiposNumeradas++;
          }
          entradasNumeradas.push({
              idEntrada: element.id_entrada,
              numeracion: element.numeracion_entrada,
              tipo: element.nombre_tipo,
              precio: element.precio
          });
      }
  });

  let formItemsCompra = document.getElementById("formItemsCompra");
  let tabla = `
      <table class="table table-responsive w-75 mx-auto">
          <thead>
              <tr>
                  <th data-label="Tipo de ticket">Tipo de ticket</th>
                  <th data-label="Valor">Valor</th>
                  <th data-label="Cantidad disponible">Cantidad disponible</th>
              </tr>
          </thead>
          <tbody>
  `;

  tipoEntradas.forEach(item => {
      if (item.estanNumeradas == 'si') {
          tabla += `
              <tr class="tipo-entrada">
                  <td data-label="Tipo de ticket">${item.tipo}</td>
                  <td data-label="Valor">$ ${item.precio}</td>
                  <td data-label="Cantidad disponible">${HayEntradas(item.cantidad)}

                      <select class="form-select" aria-label="Selecciona la numeracion">
                          <option selected>Selecciona la numeracion</option>
          `;

          entradasNumeradas.forEach(en => {
              if (en.tipo === item.tipo && item.cantidad > 0) {
                  tabla += `<option id= "${en.idEntrada}" value="${en.numeracion}">${en.numeracion}</option>

                  `;
              }
          });

          tabla += `
                      </select>
                      <div class="btn btn-primary mt-1 btnAgregar">Agregar</div>
                  </td>
              </tr>
          `;
      } else {
          tabla += `
              <tr class="tipo-entrada">
                  <td data-label="Tipo de ticket">${item.tipo}</td>
                  <td data-label="Valor">$ ${item.precio}</td>
                  <td data-label="Cantidad disponible">${HayEntradas(item.cantidad)}
                      <select class="form-select" aria-label="Selecciona la cantidad">
                          <option selected value="0">Selecciona la cantidad</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                      </select>
                  </td>
              </tr>
          `;
      }
  });

  tabla += `
          </tbody>
      </table>
      <div class="w-75 mx-auto position-relative">
          <a id="btnComprar" class="btn btn-primary btn-lg position-absolute top-0 end-0"  role="button">Comprar</a>
      </div>
      <div class="mt-5 w-25 mx-auto position-relative" id="contenedorEntradasSeleccionadas">
    </div>
  `;

  formItemsCompra.innerHTML = tabla;

  const btnComprar = document.getElementById("btnComprar");

// Escuchar el evento de clic en el botón Comprar
btnComprar.addEventListener("click", function(event) {
  event.preventDefault(); // Prevenir el comportamiento de redirección del botón

  // Buscar todos los selectores de cantidad en la tabla
  const cantidadSelectores = document.querySelectorAll(".form-select");
  const entradasNumeradasSeleccionadas = formItemsCompra.querySelectorAll('.entrada-seleccionada');

  // Variable para verificar si alguna cantidad fue seleccionada
  let cantidadSeleccionada = false;

  // Verificar si hay algún selector con una cantidad mayor a 0
  cantidadSelectores.forEach(select => {
      if (parseInt(select.value) > 0) {
          cantidadSeleccionada = true;
      }
  });

  // Verificar si hay entradas numeradas seleccionadas
  if (entradasNumeradasSeleccionadas.length > 0) {
      cantidadSeleccionada = true;
  }

  // Obtener el contenedor para mostrar el mensaje de error
  const mensajeError = document.getElementById("mensajeError");

  // Mostrar mensaje de error si no se seleccionó ninguna cantidad
  if (!cantidadSeleccionada) {
      // Si no existe el mensaje de error, lo creamos
      if (!mensajeError) {
          const errorDiv = document.createElement("div");
          errorDiv.id = "mensajeError";
          errorDiv.className = "text-danger mt-3"; // Agregar clases de Bootstrap
          errorDiv.innerText = "Debe seleccionar algún tipo de entrada antes de continuar con la compra.";
          
          // Insertar el mensaje de error después de la tabla
          btnComprar.parentNode.insertBefore(errorDiv, btnComprar);
      }
  } else {
      // Si ya existe el mensaje de error y se seleccionó una cantidad, eliminarlo
      if (mensajeError) {
          mensajeError.remove();
      }
      
      // Redirigir a la página de compra o ejecutar la lógica deseada
      window.location.href = "finalizar-compra.php";
  }
});

}

document.addEventListener("DOMContentLoaded", function() {
  const formItemsCompra = document.getElementById("formItemsCompra");
  // Función para agregar una entrada numerada seleccionada a la lista
// Función para agregar una entrada numerada seleccionada a la lista
function agregarEntradaNumerada(event) {
  const button = event.target;
  const selectElement = button.previousElementSibling; // Selector de numeración
  const tipoEntrada = button.closest("tr").querySelector("td[data-label='Tipo de ticket']").innerText;
  const precio = button.closest("tr").querySelector("td[data-label='Valor']").innerText;

  // Obtener la opción seleccionada y su id
  const selectedOption = selectElement.selectedOptions[0];
  const numeracionSeleccionada = selectedOption.value;
  const idEntrada = selectedOption.getAttribute("id"); // Almacenar el id de la opción seleccionada

  console.log("ID de la opción seleccionada:", idEntrada);
  console.log("Numeración seleccionada:", numeracionSeleccionada);
  console.log("Precio:", precio);
  console.log("Tipo de entrada:", tipoEntrada);

  // Validación: Verificar que el usuario haya seleccionado una numeración válida
  if (numeracionSeleccionada === "Selecciona la numeracion") {
      alert("Por favor, seleccione una numeración válida.");
      return;
  }

  // Crear elemento de entrada seleccionada
  const entradaDiv = document.createElement("div");
  entradaDiv.className = "entrada-seleccionada mb-2 d-flex align-items-center";
  entradaDiv.innerHTML = `
      <input type="hidden" value="${idEntrada}" name="idEntradaNumerada">
      <span class="badge bg-secondary me-2">${tipoEntrada}</span>
      <span class="badge bg-info me-2">Número: ${numeracionSeleccionada}</span>
      <span class="badge bg-success me-2">Precio: ${precio}</span>
      <button type="button" class="btn btn-danger btn-sm ms-2 btnEliminarEntrada">Eliminar</button>
  `;

  // Guardar la opción eliminada temporalmente para restaurarla si es necesario
  const opcionEliminada = selectElement.querySelector(`option[value="${numeracionSeleccionada}"]`);
  opcionEliminada.remove();

  // Agregar evento de eliminar a cada entrada agregada
  entradaDiv.querySelector(".btnEliminarEntrada").addEventListener("click", function() {
      eliminarEntradaNumerada(entradaDiv, selectElement, numeracionSeleccionada);
  });

  // Agregar la entrada seleccionada al contenedor
  formItemsCompra.appendChild(entradaDiv);
}

  // Función para eliminar una entrada seleccionada de la lista y restaurar la opción en el selector
  function eliminarEntradaNumerada(entradaDiv, selectElement, numeracion) {
      // Crear una nueva opción para restaurar en el selector
      const opcionRestaurada = document.createElement("option");
      opcionRestaurada.value = numeracion;
      opcionRestaurada.textContent = numeracion;

      // Agregar la opción restaurada al selector
      selectElement.appendChild(opcionRestaurada);
      formItemsCompra.removeChild(entradaDiv);
  }

  // Delegar evento de clic en "Agregar" dentro del contenedor formItemsCompra
  formItemsCompra.addEventListener("click", function(event) {
      if (event.target.classList.contains("btn") && event.target.innerText === "Agregar") {
          agregarEntradaNumerada(event);
      }
  });

  
});










