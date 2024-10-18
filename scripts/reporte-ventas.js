//datos que uso para realizar y mostrar los calculos del reporte
const listaEventos = [
    {
      nombreEvento: "Concierto de Rock",
      fecha: "15/09/2024",
      totalEntradasDisponibles: 500,  // Total de entradas disponibles
      totalEntradasVendidas: 450,     // Total de entradas que realmente se vendieron
      precioEntrada: 50,
      totalRecaudado: 450 * 50,       // Calculado en base a entradas vendidas
      calificacion: 4.5
    },
    {
      nombreEvento: "Feria de Ciencias",
      fecha: "12/08/2024",
      totalEntradasDisponibles: 300,
      totalEntradasVendidas: 200,
      precioEntrada: 30,
      totalRecaudado: 200 * 30,
      calificacion: 4.8
    },
    {
      nombreEvento: "Festival de Cine",
      fecha: "22/09/2024",
      totalEntradasDisponibles: 1000,
      totalEntradasVendidas: 850,
      precioEntrada: 15,
      totalRecaudado: 850 * 15,
      calificacion: 4.2
    }
  ];

// Función para generar el reporte anual
function ReporteAnual() {
//Obtener el año actual dinámicamente
const año = new Date().getFullYear(); // Por ejemplo, 2024 si ejecutas este año
return listaEventos.filter(evento => {
  const añoEvento = evento.fecha.split('/')[2]; // Obtener el año de la fecha
  return añoEvento === String(año);
});

}

//funcion para generar el reporte mensual
function ReporteMensual(mes){

const año = new Date().getFullYear(); 
return listaEventos.filter(evento => {
    const [dia, mesEvento, añoEvento] = evento.fecha.split('/'); // Desestructurar la fecha
    return mesEvento == String(mes) && añoEvento == String(año); // Filtrar por mes y año
  });

 


}

function generarReporte(eventos){
// Función para calcular y mostrar estadísticas
let resultados = document.getElementById('resultados');
    if(eventos.length>0){
        resultados.innerHTML = ""
        resultados.classList.remove("oculto")
  
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
          resultados.innerHTML += `<p>${evento.nombreEvento} - Calificación: ${evento.calificacion}</p>`;
        });

    }else{
        resultados.innerHTML = ""
        resultados.innerHTML = `<p class="text-danger"><strong>No hay resultados</p>`;
    }

}


document.getElementById('btnReporte').addEventListener('click', function() {
    let periodo = document.getElementById("reporte").value
    let mes = document.getElementById("mes")
    let eventos
    //periodo anual = 0 mensual = 1
    if(periodo == "1" && mes.value){
        eventos = ReporteMensual(mes.value)
    }else{
        eventos = ReporteAnual()
    }   
    generarReporte(eventos)
    
});

