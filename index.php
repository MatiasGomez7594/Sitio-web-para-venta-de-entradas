<?php require(__DIR__.'/includes/globals.php');
  require(__DIR__.'/componentes/conexion.php');?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css">    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script> 
    <script src="scripts/inicio.js" defer></script>   

<title>Mis entradas</title>
</head>
<body>
  <?php require_once('./componentes/nav-sitio.php');?>
      <div id="carouselExampleSlidesOnly" class="carousel slide   pt-5" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="imgs/slide-1.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="imgs/slide-2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="imgs/slide-3.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
      </div>
      <div class="galeria-eventos bg-dark" id="galeriaEventos">
      </div>
      <div class="container-preguntas-frecuentes w-100 bg-dark pt-2 pb-2">
        <a href="./componentes/preguntas-frecuentes.php" class="preguntasLink">Preguntas frecuentes</a>
      </div>
      <footer class="bg-dark text-white pt-4  ">
        <hr>
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <h5>MisEntradas.com</h5>
              <p>Encuentra los mejores eventos y compra tus entradas de manera segura.</p>
            </div>
            <div class="col-md-4">
              <h5>Enlaces</h5>
              <ul class="list-unstyled">
                <li><a href="inicio.php" class="text-white text-decoration-none">Inicio</a></li>
                <?php if(!isset($_SESSION['id_usuario'])){?>
                  <li><a href="./componentes/iniciar-sesion.html" class="text-white text-decoration-none">Ingresar</a></li>
                  <li><a href="./componentes/registrarse.php" class="text-white text-decoration-none">Registrarse</a></li>
                <?php
                };?>
                <li><a href="./componentes/mi-cuenta.php" class="text-white text-decoration-none">Tu perfil</a></li>
              </ul>
            </div>
            <div class="col-md-4">
              <h5>Contactos</h5>
              <ul class="list-unstyled">
                <li><i class="fas fa-envelope"></i> contacto@misentradas.com</li>
                <li><i class="fas fa-phone"></i> +54 11 1234-5678</li>
                <li><i class="fas fa-map-marker-alt"></i> Buenos Aires, Argentina</li>
              </ul>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12 text-center">
              <a href="#" class="text-white me-3"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="text-white me-3"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-white me-3"><i class="fab fa-instagram"></i></a>
              <p class="mt-3">&copy; 2024 MisEntradas.com. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
</body>
</html>