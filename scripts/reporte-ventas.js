/*
document.addEventListener("DOMContentLoaded", function () {
  CargarDatos();
});

function CargarDatos() {
  fetch('../BBDD/reporte-ventas.php')
      .then(response => response.json())
      .then(data => {
        console.log(data)
          listaEventos = data.map(evento => ({
              nombreEvento: evento.nombre_evento,
              fecha: evento.fecha_inicio,
              totalEntradas: evento.total_localidades,
              totalEntradasVendidas: parseInt(evento.total_entradas_vendidas)|| 0,
              totalRecaudado: parseFloat(evento.total_recaudado) || 0,
              calificacion: parseFloat(evento.calificacion_promedio) || 0,
          }));
          console.log("Datos cargados en listaEventos:", listaEventos);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
}
*/
document.addEventListener("DOMContentLoaded", async function () {
  await CargarDatos(); // Espera a que los datos se carguen completamente
});

async function CargarDatos() {
  try {
      const response = await fetch('../BBDD/reporte-ventas.php');
      const data = await response.json();
      console.log(data);
      listaEventos = data.map(evento => ({
          nombreEvento: evento.nombre_evento,
          fecha: evento.fecha_inicio,
          totalEntradas: evento.total_localidades,
          totalEntradasVendidas: parseInt(evento.total_entradas_vendidas) || 0,
          totalRecaudado: parseFloat(evento.total_recaudado) || 0,
          calificacion: parseFloat(evento.calificacion_promedio) || 0,
      }));
      console.log("Datos cargados en listaEventos:", listaEventos);
  } catch (error) {
      console.error('Error al obtener los datos:', error);
  }
}

let listaEventos = [];

// Función para generar el reporte anual
function ReporteAnual() {
  const año = new Date().getFullYear(); // Por ejemplo, 2024 si ejecutas este año
  return listaEventos.filter(evento => {
      const añoEvento = evento.fecha.split('/')[2]; // Obtener el año de la fecha
      return añoEvento === String(año);
  });
}

// Función para generar el reporte mensual
function ReporteMensual(mes) {
  const año = new Date().getFullYear();
  return listaEventos.filter(evento => {
    console.log(evento.fecha)
      const [dia, mesEvento, añoEvento] = evento.fecha.split('/'); // Desestructurar la fecha
      return mesEvento == String(mes) && añoEvento == String(año); // Filtrar por mes y año
  });
}

function generarReporte(eventos) {
  let resultados = document.getElementById('resultados');
  if (eventos.length > 0) {
      resultados.innerHTML = "";
      resultados.classList.remove("oculto");

      // Calcular la recaudación total
      const recaudacionTotal = eventos.reduce((total, evento) => total + evento.totalRecaudado, 0);

      // Calcular la recaudación promedio
      const recaudacionPromedio = recaudacionTotal / eventos.length;

      // Calcular el total de entradas vendidas entre todos los eventos
      const totalEntradasVendidas = eventos.reduce((total, evento) => total + evento.totalEntradasVendidas, 0);

      // Encontrar evento con mayor recaudación
      const eventoMayorRecaudacion = eventos.reduce((max, evento) => evento.totalRecaudado > max.totalRecaudado ? evento : max);
      // Encontrar evento con menor recaudación
      const eventoMenorRecaudacion = eventos.reduce((min, evento) => evento.totalRecaudado < min.totalRecaudado ? evento : min);

      // Encontrar evento con menor cantidad de entradas vendidas
      const eventoMenorEntradasVendidas = eventos.reduce((min, evento) => evento.totalEntradasVendidas < min.totalEntradasVendidas ? evento : min);

      // Encontrar evento con mayor cantidad de entradas vendidas
      const eventoMayorEntradasVendidas = eventos.reduce((max, evento) => evento.totalEntradasVendidas > max.totalEntradasVendidas ? evento : max);

      // Ordenar eventos por calificación (descendente)
      const eventosOrdenadosPorCalificacion = eventos.slice().sort((a, b) => b.calificacion - a.calificacion);
      resultados.innerHTML += `<p><strong>Recaudación Total:</strong> $${recaudacionTotal}</p>`;
      resultados.innerHTML += `<p><strong>Recaudación Promedio por Evento:</strong> $${recaudacionPromedio.toFixed(2)}</p>`;
      resultados.innerHTML += `<p><strong>Total de Entradas Vendidas:</strong> ${totalEntradasVendidas} entradas</p>`;
      resultados.innerHTML += `<p><strong>Evento con Mayor Recaudación:</strong> ${eventoMayorRecaudacion.nombreEvento} ($${eventoMayorRecaudacion.totalRecaudado})</p>`;
      resultados.innerHTML += `<p><strong>Evento con Menor Recaudación:</strong> ${eventoMenorRecaudacion.nombreEvento} ($${eventoMenorRecaudacion.totalRecaudado})</p>`;
      resultados.innerHTML += `<p><strong>Evento con Menor Entradas Vendidas:</strong> ${eventoMenorEntradasVendidas.nombreEvento} (${eventoMenorEntradasVendidas.totalEntradasVendidas} entradas)</p>`;
      resultados.innerHTML += `<p><strong>Evento con Mayor Entradas Vendidas:</strong> ${eventoMayorEntradasVendidas.nombreEvento} (${eventoMayorEntradasVendidas.totalEntradasVendidas} entradas)</p>`;

      // Listado de eventos ordenados por calificación
      resultados.innerHTML += `<h2>Eventos Ordenados por Calificación (Descendente):</h2>`;
      eventosOrdenadosPorCalificacion.forEach(evento => {
        console.log(evento.nombreEvento)
          resultados.innerHTML += `<p>${evento.nombreEvento} - Calificación: ${evento.calificacion}</p>`;
      });

  } else {
      resultados.innerHTML = `<p class="text-danger"><strong>No hay resultados</strong></p>`;
  }
}

document.getElementById('btnReporte').addEventListener('click', function () {
  let periodo = document.getElementById("reporte").value;
  let mes = document.getElementById("mes");
  let eventos;
  // Periodo anual = 0 mensual = 1
  if (periodo == "1" && mes.value) {
      eventos = ReporteMensual(mes.value);
  } else {
      eventos = ReporteAnual();
  }
  generarReporte(eventos);
});


