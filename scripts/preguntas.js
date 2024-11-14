document.addEventListener('DOMContentLoaded', () => {
  const btnMostrar = document.getElementById('btnMostrar');
  const formulario = document.getElementById('formulario');
  const tituloPregunta = document.getElementById('tituloPregunta');
  const contenidoPregunta = document.getElementById('contenidoPregunta');
  const btnGuardar = document.getElementById('btnGuardar');
  const btnCancelar = document.getElementById('btnCancelar');
  const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
  let preguntaId = null; // Para identificar la pregunta en edición o eliminación

  btnMostrar.addEventListener('click', () => {
      formulario.classList.remove('oculto');
      btnMostrar.classList.add('oculto');
      preguntaId = null; // Reset para agregar nueva pregunta
  });

  btnCancelar.addEventListener('click', () => {
      formulario.classList.add('oculto');
      btnMostrar.classList.remove('oculto');
      preguntaId = null;
      resetForm();
  });

  // Guardar o actualizar pregunta
  btnGuardar.addEventListener('click', () => {
      const data = {
          id: preguntaId,
          titulo: tituloPregunta.value,
          contenido: contenidoPregunta.value
      };

      const url = preguntaId ? '../BBDD/editar_pregunta.php' : '../BBDD/agregar_pregunta.php';
      fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              formulario.classList.add('oculto');
              btnMostrar.classList.remove('oculto');
              resetForm();
              // Recargar preguntas aquí
          }
      });
  });

  // Confirmar eliminación de pregunta
  document.getElementById('confirmarEliminar').addEventListener('click', () => {
      fetch('../BBDD/eliminar_pregunta.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: preguntaId })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              modalEliminar.hide();
              // Recargar preguntas aquí
          }
      });
  });

  function resetForm() {
      tituloPregunta.value = '';
      contenidoPregunta.value = '';
  }
});
