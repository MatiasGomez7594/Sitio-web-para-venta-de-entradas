function FormatearFecha(fechaStr) {
    // Crear un objeto Date a partir de la cadena
    const fecha = new Date(fechaStr);

    // Validar si la fecha es válida
    if (isNaN(fecha.getTime())) {
        return "Fecha inválida";
    }

    // Arrays para nombres de días y meses
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Extraer partes de la fecha
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    // Formatear la hora
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    // Devolver la fecha formateada
    return `${diaSemana} ${dia} de ${mes} ${anio} - ${hora}:${minutos} hrs.`;
}

document.addEventListener("DOMContentLoaded", function () {
    let urlParams = new URLSearchParams(window.location.search);
    let idEvento = urlParams.get("id_evento");
    

    if (idEvento) {
        fetch(`../BBDD/ver_info_evento.php?id_evento=${idEvento}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    return;
                }

                // Mostrar datos del evento
                let flyer = "img-no-disponible.jpg";
                if(data.imagenes){
                    let imagenes = data.imagenes.split(","); // obtener el flyer y el mapa del evento
                    console.log(imagenes[0],imagenes[1])
                    flyer = imagenes[0]
                }


                const eventoDescripcion = document.getElementById('infoEvento');
                eventoDescripcion.innerHTML = `
                    <hr class="divider">
                    <div class="p-5 mb-2 bg-body-secondary col-lg-2 col-md-12 flyer">
                        <img src="../${flyer}" class="img-fluid" style="height: 100%; object-fit: cover;" alt="Flyer">
                    </div>
                    <div class="p-5 mb-2 bg-body-secondary col-lg-8 col-md-12">
                        <h4 class="mt-3 mb-3">${data.nombre_evento}</h4>
                        <h5 class="mb-3 text-warning">${FormatearFecha(data.fecha_inicio)}</h5>
                    </div>
                    <div class="col col-lg-2 col-md-12 ubicacionEvento"> 
                        <i class="fas fa-map-marker-alt text-warning globo fa-lg fa-2x mb-3"></i>
                        <h5>${data.nombre_recinto}</h5>
                        <h5>${data.direccion}</h5>
                        <h5>${data.ciudad_nombre}, ${data.provincia_nombre}</h5>
                    </div>
                    <hr class="divider">
                `;

                // Mostrar tipos de entradas
                const formItemsCompra = document.getElementById("formItemsCompra");
                let entradasSeleccionadas = [];
                let tabla = `
                    <table class="table table-responsive w-75 mx-auto">
                        <thead>
                            <tr>
                                <th>Tipo de ticket</th>
                                <th>Valor</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.tipos_entradas.forEach(entrada => {
                    let fila = `
                        <tr class="tipo-entrada">
                            <td>${entrada.nombre_tipo}</td>
                            <td>$${entrada.precio}</td>
                            <td>
                    `;

                    if (entrada.estan_numeradas === 'si' && entrada.cantidad_por_tipo > 0) {
                        fila += `
                            <label for="selectEntrada${entrada.id_tipo_x_evento}">Numeración:</label>
                            <select id="selectEntrada${entrada.id_tipo_x_evento}" class="form-select">
                                <option value="" selected>Selecciona la numeración</option>
                                ${entrada.numeraciones.split(',').map(num => `<option value="${num}">${num}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary mt-1 agregarEntrada" 
                                data-id="${entrada.id_tipo_x_evento}" data-numerada="si" data-precio="${entrada.precio}">
                                Agregar
                            </button>
                        `;
                    } else  if(entrada.estan_numeradas !== 'si' && entrada.cantidad_por_tipo > 0){
                        const maxCantidad = Math.min(6, entrada.cantidad_por_tipo);
                        fila += `
                            <input type="number" id="cantidadNoNumerada${entrada.id_tipo_x_evento}" 
                                   class="form-control" min="1" max="${maxCantidad}" placeholder="Máximo ${maxCantidad}">
                            <button class="btn btn-primary mt-1 agregarEntrada" 
                                data-id="${entrada.id_tipo_x_evento}" data-numerada="no" data-precio="${entrada.precio}">
                                Agregar
                            </button>
                        `;
                    }else{
                        fila += `<p class="text-danger">Entrada agotada</p>`;
                    }

                    fila += `</td></tr>`;
                    tabla += fila;
                });

                tabla += `</tbody></table>`;
                formItemsCompra.innerHTML = tabla;
                let errorMensaje = document.getElementById("error-mensaje")

                const contenedorEntradasSeleccionadas = document.getElementById("detalleEntradasSeleccionadas").querySelector(".list-group");

                function actualizarVistaEntradas() {
                    contenedorEntradasSeleccionadas.innerHTML = ""; // Limpia la lista
                
                    entradasSeleccionadas.forEach((entrada, index) => {
                        const li = document.createElement("li");
                        li.className = "list-group-item d-flex justify-content-between align-items-center";
                
                        // Mostrar información de la entrada
                        li.innerHTML = `
                            ${entrada.valor === "no numerada" ? `No Numerada: ${entrada.cantidad} tickets` : `Numerada: ${entrada.valor}`} - $${entrada.precio * entrada.cantidad}
                            <button class="btn btn-danger btn-sm eliminarEntrada" data-index="${index}">
                                Eliminar
                            </button>
                        `;
                
                        contenedorEntradasSeleccionadas.appendChild(li);
                        console.log(entradasSeleccionadas)
                    });
                }
                
                formItemsCompra.addEventListener("click", function (event) {
                    if (event.target.classList.contains("agregarEntrada")) {
                        const button = event.target;
                        const idTipo = button.dataset.id;
                        const numerada = button.dataset.numerada === "si";
                        const precio = parseFloat(button.dataset.precio);
                        let cantidad = 1;
                        let valor = null;

                        if (numerada) {
                            const select = document.getElementById(`selectEntrada${idTipo}`);
                            valor = select.value;

                            if (!valor) {
                                errorMensaje.textContent ='Por favor, selecciona una numeración válida.'
                                return;
                            }

                            if (entradasSeleccionadas.some(e => e.id === idTipo && e.valor === valor)) {
                                errorMensaje.textContent ="Esta numeración ya está seleccionada."
                                return;
                            }

                            entradasSeleccionadas.push({ id: idTipo, valor, cantidad, precio });
                            select.querySelector(`option[value="${valor}"]`).disabled = true;

                        } else {
                            const input = document.getElementById(`cantidadNoNumerada${idTipo}`);
                            cantidad = parseInt(input.value);
                            if (entradasSeleccionadas.some(e => e.id === idTipo)) {
                                 errorMensaje.textContent ="Esta entrada ya está seleccionada."
                                return;
                            }

                            if (isNaN(cantidad) || cantidad < 1 || cantidad > parseInt(input.max)) {
                                errorMensaje.textContent ='Por favor, selecciona una cantidad válida.'
                                return;
                            }

                            valor = "no numerada";
                            entradasSeleccionadas.push({ id: idTipo, valor, cantidad, precio });
                        }

                        actualizarVistaEntradas();
                    }
                });
                if(contenedorEntradasSeleccionadas){
                    contenedorEntradasSeleccionadas.addEventListener("click", function (event) {
                        if (event.target.classList.contains("eliminarEntrada")) {
                            const index = parseInt(event.target.dataset.index);
    
                            const entradaEliminada = entradasSeleccionadas.splice(index, 1)[0];
    
                            if (entradaEliminada.valor !== "no numerada") {
                                const select = document.getElementById(`selectEntrada${entradaEliminada.id}`);
                                select.querySelector(`option[value="${entradaEliminada.valor}"]`).disabled = false;
                            }
    
                            actualizarVistaEntradas();
                        }
                    });
                }
                const finalizarCompraBtn = document.getElementById("btnComprar");
                if (finalizarCompraBtn) {
                    finalizarCompraBtn.addEventListener("click", function () {
                        fetch("../BBDD/verificar_sesion.php")
                            .then(response => response.json())
                            .then(session => {
                                if (!session || session.rolUsuario !== "cliente") {
                                    // Si no está autenticado, mostramos el modal para iniciar sesión
                                    const modalSesion = new bootstrap.Modal(document.getElementById("modalSesion"));
                                    modalSesion.show();
    
                                    document.getElementById("btnAceptar").addEventListener("click", function () {
                                        window.location.href = "iniciar-sesion.php";
                                    });
                                } else {
                                    // Si está autenticado y hay entradas seleccionadas
                                    if (entradasSeleccionadas.length === 0) {
                                        errorMensaje.textContent ='Debes seleccionar al menos una entrada.'
                                        return;
                                    }
    
                                    // Crear un formulario dinámico para enviar los datos a finalizar-compra.php
                                    const form = document.createElement("form");
                                    form.method = "POST";
                                    form.action = "finalizar-compra.php";  // Acción al archivo PHP que procesará la compra
    
                                    // Agregar el ID del evento
                                    const inputEvento = document.createElement("input");
                                    inputEvento.type = "hidden";
                                    inputEvento.name = "evento";
                                    inputEvento.value = data.nombre_evento+'\n'+FormatearFecha(data.fecha_inicio);
                                    form.appendChild(inputEvento);
                                    const flyerEvento = document.createElement("input")
                                    flyerEvento.type= "hidden";
                                    flyerEvento.name = "flyerEvento";
                                    flyerEvento.value = flyer;
                                    form.appendChild(flyerEvento);

                                    // Agregar las entradas seleccionadas
                                    entradasSeleccionadas.forEach(entrada => {
                                        const inputEntrada = document.createElement("input");
                                        inputEntrada.type = "hidden";
                                        inputEntrada.name = "entradas[]";  // El nombre 'entradas[]' para enviar un array
                                        inputEntrada.value = JSON.stringify(entrada);
                                        form.appendChild(inputEntrada);
                                    });    
                                    // Agregar el formulario al body y enviarlo
                                    document.body.appendChild(form);
                                    errorMensaje.textContent =''
                                    form.submit();  // Enviar el formulario

                                }
                            });
                    });
                } else {
                    console.error("El botón 'btnComprar' no se encontró en el DOM.");
                }
                
            })
            .catch(error => console.error("Error al obtener los datos del evento:", error));
    } else {
        console.error("ID del evento no encontrado en la URL");
    }
});









