document.addEventListener("DOMContentLoaded", function() {
    CargarPreguntas();
});

function CargarPreguntas() {
    fetch('../BBDD/cargar-preguntas-frecuentes.php')
        .then(response => response.json())
        .then(data => {
            MostrarPreguntas(data);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function MostrarPreguntas(datos) {
    const preguntas = document.getElementById('accordionPreguntas');
    preguntas.innerHTML = ''; // Limpiar contenido previo
    datos.forEach(registro => {
        console.log(registro.pregunta)
        let pregunta =`
            <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${registro.id_pregunta}" aria-expanded="false" aria-controls="collapseTwo">
                  ${registro.pregunta}
                  </button>
                </h2>
                <div id="collapse${registro.id_pregunta}" class="accordion-collapse collapse" data-bs-parent="#accordionPreguntas">
                  <div class="accordion-body"> 
                    ${registro.contenido}      
                  </div>
                </div>
              </div>
             `
        preguntas.innerHTML += pregunta;
  
    });
  }


function ValidarFormulario() {
    
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('mensaje').value;

    var nombreError = document.querySelector('#errorNombre');
    var emailError = document.querySelector('#errorEmail');
    var mensajeError = document.querySelector('#errorMensaje');

    var validado = true;

    //valido el nombre
    if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúüÜ\s.,;'\-]+$/.test(nombre)){
        
        nombreError.classList.remove("oculto")
        validado = false;
    }

    // Validar el email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.classList.remove("oculto")
        validado = false;
    }

    if (!mensaje) {
        mensajeError.classList.remove("oculto")

        validado = false;
    }

    // Si el formulario está validado llamo a la funcion registrarse
    if (validado==true) {
        EnviarPregunta()         
    }

}

 function EnviarPregunta() {

            // Crear un objeto FormData y agregar los datos del formulario
            const formData = new FormData(document.getElementById('formulario'));

            var nombreError = document.querySelector('#errorNombre');
            var emailError = document.querySelector('#errorEmail');
            var mensajeError = document.querySelector('#errorMensaje');
            nombreError.classList.add("oculto")
            emailError.classList.add("oculto")
            mensajeError.classList.add("oculto")
            // Enviar la solicitud AJAX
            fetch('../BBDD/enviar-pregunta.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success == false) {
                    document.getElementById("error").textContent = "Hubo un error intente mas tarde"
                }else{
                    document.getElementById("notificacion").classList.remove("oculto")
                    document.getElementById("formulario").reset()

                }
            })
            .catch(error => {
                console.log(error)
            });
        }
    
document.getElementById('btnEnviar').addEventListener('click', function() {
    ValidarFormulario(); // Llamada a la función de validación
});