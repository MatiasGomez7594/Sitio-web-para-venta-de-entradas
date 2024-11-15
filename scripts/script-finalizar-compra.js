document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const mensajeError = document.querySelector("#mensaje-error");

  if (!form || !mensajeError) {
    console.error("El formulario o el contenedor de errores no existen.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar envío automático

    // Limpiar errores previos
    mensajeError.innerHTML = "";
    mensajeError.classList.add("d-none");

    let errores = [];

    // Obtener los valores del formulario
    const nombre = form.nombre_comprador.value.trim();
    const email = form.email.value.trim();
    const dni = form.dni.value.trim();
    const telefono = form.telefono.value.trim();
    const metodoPago = form.metodo_pago.value;

    // Validar los campos
    if (!nombre) errores.push("El nombre completo es obligatorio.");
    if (!email) {
      errores.push("El email es obligatorio.");
    } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
      errores.push("El formato del email es inválido.");
    }
    if (!dni || !/^\d{7,8}$/.test(dni)) {
      errores.push("El DNI debe tener entre 7 y 8 dígitos.");
    }
    if (!telefono || !/^\d{10}$/.test(telefono)) {
      errores.push("El teléfono debe tener 10 dígitos.");
    }
    if (!metodoPago) errores.push("Debe seleccionar un método de pago.");

    // Mostrar errores si existen
    if (errores.length > 0) {
      mensajeError.innerHTML = errores.map(err => `<li>${err}</li>`).join("");
      mensajeError.classList.remove("d-none");
    } else {
      form.submit();
    }
  });
});
