document.addEventListener("DOMContentLoaded", function() {
    CargarDatos();

});

function CargarDatos() {
    fetch('../BBDD/cargar-datos-usuario.php')
        .then(response => response.json())
        .then(data => {
            MostrarDatos(data);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function MostrarDatos(datos) {
    console.log(datos)
    let nombreInput = document.getElementById('nombre_usuario');
    let emailInput = document.getElementById('email');
    let telefonoInput = document.getElementById('telefono');
    let generoSelect = document.getElementById('genero');
    nombreInput.value=datos.nombre
    emailInput.value = datos.email
    telefonoInput.value = datos.telefono
    datos.genero
  
    
  }
  