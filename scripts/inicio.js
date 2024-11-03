
document.addEventListener("DOMContentLoaded", function() {
  cargarDatos();
});

function cargarDatos() {
  fetch('BBDD/mostrar_eventos.php')
      .then(response => response.json())
      .then(data => {
          mostrarDatos(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
}


//funcion para cambiar el formato de la fecha
function cambiarFormatoFecha(fechaOriginal) {
  let partesFechaHora = fechaOriginal.split(" "); // Dividir la fecha y la hora
  let fecha = partesFechaHora[0]; // "2024-09-24"
  let hora = partesFechaHora[1].split(":"); // "10:20"     
   hora = hora[0]+":"+hora[1]
   // Dividir la fecha (YYYY-MM-DD)
  let partesFecha = fecha.split("-");
  let anio = partesFecha[0];
  let mes = partesFecha[1];
  let dia = partesFecha[2];
   
   // Formato deseado: "DD/MM/YYYY - HH:MM"
  let fechaFormateada = dia + "/" + mes + "/" + anio + " - " + hora;
   
   return fechaFormateada
}
function mostrarDatos(datos) {
  const galeria = document.getElementById('galeriaEventos');
  galeria.innerHTML = ''; // Limpiar contenido previo
  datos.forEach(registro => {
      let flyerEvento;
      if(registro.imagenes){
          let imgs = registro.imagenes.split(","); // Dividir la fecha y la hora
          flyerEvento = imgs[0]
      }else{
          flyerEvento ="imgs/img-no-disponible.jpg"
      }
      let evento =`  
      <a class=" link-dark link-underline-opacity-0 evento" data-ciudad="${registro.ciudad_nombre}" data-provincia="${registro.provincia_nombre}" 
          data-precio="${registro.precio_minimo}" data-fecha="${registro.fecha_inicio}" 
          data-nombre=">${registro.nombre_evento}" 
          data-categoria="${registro.categoria}"            
          href="componentes/ver-evento.php?id=${registro.id_evento}&nombre=${encodeURIComponent(registro.nombre_evento)}">
        <div class="card mb-3 " style="width: 14rem;">
            <img src="${flyerEvento}" class="card-img-top" alt="...">
            <div class="card-body">
              <i class="fas fa-map-marker-alt text-body-tertiary ">${registro.nombre_recinto}</i>              
              <h4 class="text-wrap" >${registro.nombre_evento}</h4>
                  <hr class="divider">
                  <h6>${cambiarFormatoFecha(registro.fecha_inicio) }</h6>
                  <h6>Desde $${registro.precio_minimo} </h6>
            </div>
          </div>
      </a>   `
      galeria.innerHTML += evento;

  });




const eventos = Array.from(document.querySelectorAll('.evento')); // Convertimos NodeList a Array
const selectProvincia = document.getElementById('buscarProv');
const selectCiudad = document.getElementById('buscarCiudad');
const selectPrecio = document.getElementById('buscarPrecio');
const selectFecha = document.getElementById('buscarFecha');
const selectCategoria = document.getElementById('buscarCategoria');
const inputBuscarEvento = document.getElementById("buscarEvent");
const botonBuscarEvento = document.getElementById("botonBuscar");
// Ciudades predefinidas
const ciudadesPredefinidas = ["CABA", "Merlo", "Córdoba", "Rosario","Ezeiza","Palermo"];




// Función para filtrar y ordenar eventos
function filtrarEventos() {
  const provinciaSeleccionada = selectProvincia.value;
  const ciudadSeleccionada = selectCiudad.value;
  const filtroPrecio = selectPrecio.value;
  const filtroFecha = selectFecha.value;
  const categoriaSeleccionada = selectCategoria.value;
  
  

  eventos.forEach(evento => {
    console.log(evento)
    const provinciaEvento = evento.getAttribute('data-provincia');
    const ciudadEvento = evento.getAttribute('data-ciudad');
    const precioEvento = parseFloat(evento.getAttribute('data-precio')); 
    const fechaEvento = new Date(evento.getAttribute('data-fecha'));
    const categoriaEvento = evento.getAttribute('data-categoria');
    let formatofecha = "2024-09-25"
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
}