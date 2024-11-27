
function GuardarCompra() {
    // Obtener las entradas  de la tabla productos.
    const filas = document.querySelectorAll('#productos tbody .tipo-entrada');
    const entradas = [];
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        entradas.push({
            id: celdas[0].textContent.trim(),
            numeracion: celdas[1].textContent.trim(),
            cantidad: parseInt(celdas[4].textContent.trim()),
        });
    });

    // Obtener los datos del formulario.
    const formData = new FormData(document.getElementById('formCompra'));

    // Añadir las entradas al objeto que se enviará.
    const datos = {
        form: Object.fromEntries(formData.entries()),
        entradas: entradas
    };
    // Enviar los datos con fetch.
    fetch('../BBDD/guardar_compra.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
          document.getElementById("formCompra").reset()
          var modalElement = document.getElementById('successModal');
          var modal = new bootstrap.Modal(modalElement);
          modal.show();
          // Escuchar el evento cuando el modal se oculta
          modalElement.addEventListener('hidden.bs.modal', function () {
              window.location.href = 'historial-compras.php'; // redirige a las compras del usuario
          });
        } else {
            alert('Ocurrió un error al registrar la compra.');
        }
    })
    .catch(error => console.error('Error:', error));
}




document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("formCompra");
  let mensajeError = document.querySelector("#mensaje-error");
  let mensajeErrorTarjeta = document.querySelector("#mensaje-error-tarjeta");

  let formTarjeta = document.getElementById("formTarjeta");
  let btnConfirmar = document.getElementById("btnConfirmar");
  let miTarjeta = document.getElementById("miTarjeta");
  let metodoPago = document.getElementById("metodoPago");

  if (!form || !mensajeError || !btnConfirmar || !metodoPago) {
    console.error("El formulario o algunos elementos no existen.");
    return;
  }

  const convertirFecha = (mmYY) => {
    const [mes, anio] = mmYY.split("/").map(Number);
    return new Date(2000 + anio, mes - 1); // Ajustar año al completo
  };

  // Validación al confirmar la compra
  btnConfirmar.addEventListener("click", async () => {
    mensajeError.innerHTML = "";
    mensajeError.classList.add("d-none");
    mensajeErrorTarjeta.innerHTML = "";
    mensajeErrorTarjeta.classList.add("d-none");

    let errores = [];
    let erroresTarjeta = [];

    // Obtener valores del formulario
    let nombre = form.nombre_comprador.value.trim();
    let email = form.email.value.trim();
    let dni = form.dni.value.trim();
    let telefono = form.telefono.value.trim();
    let metodo = metodoPago.value;

    // Validaciones generales
    if (!nombre) errores.push("El nombre completo es obligatorio.");
    if (!email || !/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
      errores.push("El email es inválido.");
    }
    if (!dni || !/^\d{7,8}$/.test(dni)) {
      errores.push("El DNI debe tener entre 7 y 8 dígitos.");
    }
    if (!telefono || !/^\d{10}$/.test(telefono)) {
      errores.push("El teléfono debe tener 10 dígitos.");
    }
    if (metodo === "0") {
      errores.push("Debe seleccionar un método de pago.");
    }
    let numeroTarjeta = document.getElementById("numeroTarjeta")
    let nombreTitular = document.getElementById("nombreTitular")
    let apellidoTitular = document.getElementById("apellidoTitular")
    let fechaEmision = document.getElementById("emisiondate")
    let fechaVencimiento = document.getElementById("vencimientodate")
    let ccv = document.getElementById("ccv")


    // Validaciones de tarjeta si se selecciona Crédito/Débito
    if (metodo === "Credito/Debito") {

      const fechaActual = new Date();

      if (!numeroTarjeta.value.trim() || !/^\d{16}$/.test(numeroTarjeta.value.trim())) {
        erroresTarjeta.push("El número de la tarjeta debe tener 16 dígitos.");
      }
      if (!nombreTitular.value.trim() || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/.test(nombreTitular.value.trim())) {
        erroresTarjeta.push("El nombre del titular no es válido.");
      }
      if (!apellidoTitular.value.trim() || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/.test(apellidoTitular.value.trim())) {
        erroresTarjeta.push("El apellido del titular no es válido.");
      }
      if (!fechaEmision.value.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaEmision.value.trim())) {
        erroresTarjeta.push("La fecha de emisión no es válida.");
      } else if (convertirFecha(fechaEmision.value.trim()) >= fechaActual) {
        erroresTarjeta.push("La fecha de emisión debe ser menor a la actual.");
      }
      if (!fechaVencimiento.value.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaVencimiento.value.trim())) {
        erroresTarjeta.push("La fecha de vencimiento no es válida.");
      } else if (convertirFecha(fechaVencimiento.value.trim()) <= convertirFecha(fechaEmision.value.trim())) {
        erroresTarjeta.push("La fecha de vencimiento debe ser mayor a la fecha de emisión.");
      }
      if (!ccv.value.trim() || !/^\d{3}$/.test(ccv.value.trim())) {
        erroresTarjeta.push("El código CCV debe tener 3 dígitos.");
      }
    }

    // Mostrar errores
    if (errores.length > 0) {
      mensajeError.innerHTML = errores.map(err => `<li>${err}</li>`).join("");
      mensajeError.classList.remove("d-none");
    }
    if (erroresTarjeta.length > 0) {
      mensajeErrorTarjeta.innerHTML = erroresTarjeta.map(err => `<li>${err}</li>`).join("");
      mensajeErrorTarjeta.classList.remove("d-none");
    }
    if (errores.length === 0 && erroresTarjeta.length === 0) {
      console.log("Formulario validado correctamente.");
      mensajeError.classList.add("d-none");
      mensajeErrorTarjeta.classList.add("d-none");
      GuardarCompra() 
    }
  });

  // Cambio en el método de pago
  metodoPago.addEventListener("change", async function (event) {
    if (event.target.value === "Credito/Debito") {
      formTarjeta.classList.remove("d-none");
      try {
        const response = await fetch("../BBDD/obtener-tarjetas.php");
        const tarjetas = await response.json();

        miTarjeta.innerHTML = `
          <option value="">Seleccione una tarjeta</option>
          <option value="nueva">Ingresar nueva tarjeta</option>
        `;
        tarjetas.forEach(tarjeta => {
          console.log(tarjeta)
          const option = document.createElement("option");
          option.value = tarjeta.id_tarjeta;
          option.textContent = `finalizada en: ${tarjeta.numero_tarjeta.slice(-4)}`;
          miTarjeta.appendChild(option);
        });
        miTarjeta.disabled = false;
      } catch (error) {
        console.error("Error al cargar las tarjetas:", error);
      }
    } else {
      formTarjeta.classList.add("d-none");
    }
  });

        // Escuchar cambios en el select de tarjetas
      miTarjeta.addEventListener("change", async function () {
          const tarjetaId = miTarjeta.value;

          console.log(tarjetaId)
          if (tarjetaId === "nueva") {
            // Permitir ingresar datos manualmente
            formTarjeta.style.display = "block";
            numeroTarjeta.value = "";
            nombreTitular.value = "";
            apellidoTitular.value = "";

            document.getElementById("emisiondate").value = '';       
            document.getElementById("vencimientodate").value = ''
            ccv.value = '';

            // Hacer los campos de solo lectura
            numeroTarjeta.classList.remove("deshabilitado")
            nombreTitular.classList.remove("deshabilitado")
            apellidoTitular.classList.remove("deshabilitado")
            document.getElementById("emisiondate").classList.remove("deshabilitado")
            document.getElementById("vencimientodate").classList.remove("deshabilitado")
                 

          } else if (tarjetaId) {
            try {
              // Obtener los datos de la tarjeta seleccionada
              const response = await fetch(`../BBDD/obtener-tarjeta.php?id=${tarjetaId}`);
              const tarjeta = await response.json();
      
              // Mostrar los datos de la tarjeta en los inputs correspondientes
              formTarjeta.style.display = "block";
              numeroTarjeta.value = tarjeta.numero_tarjeta;
              nombreTitular.value = tarjeta.nombre_titular;
              apellidoTitular.value = tarjeta.apellido_titular;
              console.log(tarjeta.fecha_emision+tarjeta.fecha_expiracion)
              
              document.getElementById("emisiondate").value = tarjeta.fecha_emision;
              document.getElementById("vencimientodate").value = tarjeta.fecha_expiracion;
              ccv.value = ''

              // Hacer los campos de solo lectura
              numeroTarjeta.classList.add("deshabilitado")
              nombreTitular.classList.add("deshabilitado")
              apellidoTitular.classList.add("deshabilitado")
              document.getElementById("emisiondate").classList.add("deshabilitado")
              document.getElementById("vencimientodate").classList.add("deshabilitado")
              
            } catch (error) {
              console.error("Error al obtener los datos de la tarjeta:", error);
            }
          } else {
            formTarjeta.style.display = "none";
          }
        });

  
});
