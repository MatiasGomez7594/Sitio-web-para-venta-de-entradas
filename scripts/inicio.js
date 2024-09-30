const selectProvincia = document.getElementById('buscarProv');
const selectCiudad = document.getElementById('buscarCiudad');
const selectPrecio = document.getElementById('buscarPrecio');
const selectFecha = document.getElementById('buscarFecha');
const selectCategoria = document.getElementById('buscarCategoria');
const eventos = Array.from(document.querySelectorAll('.galeria-eventos a')); // Convertimos NodeList a Array
const inputBuscarEvento = document.getElementById("buscarEvent");
const botonBuscarEvento = document.getElementById("botonBuscar");

// Ciudades predefinidas
const ciudadesPredefinidas = ["CABA", "Merlo", "Córdoba", "Rosario"];

// Función para filtrar y ordenar eventos
function filtrarEventos() {
  const provinciaSeleccionada = selectProvincia.value;
  const ciudadSeleccionada = selectCiudad.value;
  const filtroPrecio = selectPrecio.value;
  const filtroFecha = selectFecha.value;
  const categoriaSeleccionada = selectCategoria.value;

  eventos.forEach(evento => {
    const provinciaEvento = evento.getAttribute('data-provincia');
    const ciudadEvento = evento.getAttribute('data-ciudad');
    const precioEvento = parseFloat(evento.getAttribute('data-precio')); 
    const fechaEvento = new Date(evento.getAttribute('data-fecha'));
    const categoriaEvento = evento.getAttribute('data-categoria');
    
    let mostrarEvento = true;

    // Filtrar por provincia
    if (provinciaSeleccionada !== 'Buscar por provincia' && provinciaEvento !== provinciaSeleccionada) {
      mostrarEvento = false;
    }

    if (categoriaSeleccionada !== 'Buscar por categoría' && categoriaEvento !== categoriaSeleccionada) {
      mostrarEvento = false;
    }
    
    // Filtrar por ciudad
    if (ciudadSeleccionada === 'Otra') {
      if (ciudadesPredefinidas.includes(ciudadEvento)) {
        mostrarEvento = false;
      }
    } else if (ciudadSeleccionada !== 'Buscar por ciudad' && ciudadEvento !== ciudadSeleccionada) {
      mostrarEvento = false;
    }

    // Mostrar u ocultar evento basado en los filtros de ciudad/provincia
    if (mostrarEvento) {
      evento.classList.remove('d-none');
    } else {
      evento.classList.add('d-none');
    }
  });

  // Ordenar por precio
  if (filtroPrecio !== 'Filtrar por precio') {
    eventos.sort((a, b) => {
      const precioA = parseFloat(a.getAttribute('data-precio'));
      const precioB = parseFloat(b.getAttribute('data-precio'));
      return filtroPrecio === 'menor' ? precioA - precioB : precioB - precioA;
    });
  }

  // Ordenar por fecha
  if (filtroFecha !== 'Filtrar por fecha') {
    eventos.sort((a, b) => {
      const fechaA = new Date(a.getAttribute('data-fecha'));
      const fechaB = new Date(b.getAttribute('data-fecha'));
      return filtroFecha === 'masCercana' ? fechaA - fechaB : fechaB - fechaA;
    });
  }

  // Actualizar con los eventos ordenados
  const galeria = document.querySelector('.galeria-eventos');
  eventos.forEach(evento => galeria.appendChild(evento));
}

function buscarEventoPorNombre() {
  const textoBusqueda = inputBuscarEvento.value.toLowerCase(); // Convertimos el texto a minúsculas para comparar sin distinción de mayúsculas/minúsculas

  eventos.forEach(evento => {
    const nombreEvento = evento.getAttribute('data-nombre').toLowerCase(); // Obtener el nombre del evento en minúsculas

    // Mostrar u ocultar el evento si el nombre contiene el texto de búsqueda
    if (nombreEvento.includes(textoBusqueda)) {
      evento.classList.remove('d-none'); // Mostrar el evento
    } else {
      evento.classList.add('d-none'); // Ocultar el evento
    }
  });
}
// Añadir eventos de cambio a los selects
selectProvincia.addEventListener('change', filtrarEventos);
selectCiudad.addEventListener('change', filtrarEventos);
selectPrecio.addEventListener('change', filtrarEventos);
selectFecha.addEventListener('change', filtrarEventos);
selectCategoria.addEventListener('change', filtrarEventos);

// Añadir el evento click al botón de buscar
botonBuscarEvento.addEventListener('click', buscarEventoPorNombre);
  