
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css">    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script> 
<script src="scripts/script.js" defer></script>
<script src="scripts/inicio.js" defer></script>   
<title>Mis entradas</title>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed  w-100 " style="z-index: 1;">
    <div class="container-fluid">
      <a class="navbar-brand" href="inicio.html">MisEntradas.com</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="./componentes/iniciar-sesion.php">Ingresar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="./componentes/registrarse.php">Registrarse</a>
          </li>
          <li class="nav-item">
              <?php
              require(__DIR__.'/includes/globals.php');
              require(__DIR__.'/componentes/conexion.php');
              if (isset($_SESSION['nombre_usuario']) &&  $_SESSION['rol_usuario'] == 'cliente') {
                  // Redirigir si no hay sesion
                  echo '<a class="nav-link active" href="./componentes/mi-cuenta.php">'.$_SESSION['nombre_usuario'].'</a>';
                }
              else if (isset($_SESSION['nombre_usuario']) &&  $_SESSION['rol_usuario'] == 'administrador de eventos') {
                // Redirigir si no hay sesion
                echo '<a class="nav-link active" href="./componentes/interfaz-admin-eventos.php">'.$_SESSION['nombre_usuario'].'</a>';
              }
            else if (isset($_SESSION['nombre_usuario']) &&  $_SESSION['rol_usuario'] == 'administrador de sistemas') {
              // Redirigir si no hay sesion
              echo '<a class="nav-link active" href="./componentes/interfaz-admin-sistemas.php">'.$_SESSION['nombre_usuario'].'</a>';
            }
            ?>
          
          </li>
        </ul>
        <select class="form-select navbar-nav me-auto mb-2 mb-lg-0" aria-label="Default select example" id="buscarPrecio">
          <option selected>Filtrar por precio</option>
          <option value="menor">Menor precio</option>
          <option value="mayor">Mayor precio</option>
        </select>
        <select class="form-select navbar-nav me-auto mb-2 mb-lg-0" aria-label="Default select example" id="buscarCategoria">
          <option selected>Buscar por categoría</option>
          <option value="Concierto">Concierto</option>
          <option value="Festival">Festival</option>
          <option value="Otro">Otro</option>
      </select>
      
        <select class="form-select navbar-nav me-auto mb-2 mb-lg-0" aria-label="Default select example" id="buscarFecha">
          <option selected>Filtrar por fecha</option>
          <option value="masCercana">Fecha más cercana</option>
          <option value="masLejana">Fecha más lejana</option>
        </select>
        
        <select class="form-select navbar-nav  me-auto mb-2 mb-lg-0" aria-label="Default select example" id="buscarProv">
          <option selected >Buscar por provincia</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Santa Fé">Santa Fé</option>
          <option value="Córdoba">Córdoba</option>
          <option value="Otra">Otra</option>
        </select>
        <select class="form-select navbar-nav  me-auto mb-2 mb-lg-0" aria-label="Default select example" id="buscarCiudad">
          <option selected >Buscar por ciudad</option>
          <option value="CABA">CABA</option>
          <option value="Merlo">Merlo</option>
          <option value="Córdoba">Córdoba</option>
          <option value="Rosario">Rosario</option>
          <option value="Otra">Otra</option>
        </select>
        <form class="d-flex" role="search">
          <input class="form-control me-2 " type="search" id="buscarEvent" placeholder="Buscar" aria-label="Search">
          <button class="btn btn-outline-primary" type="button" id="botonBuscar">Buscar</button>
        </form>
      </div>
    </div>
  </nav>
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

      <div class="galeria-eventos bg-dark">
        <a class=" link-dark link-underline-opacity-0" id="taylorSwift" data-ciudad="CABA" data-provincia="Buenos Aires" data-precio="15000" data-fecha="2024-09-25" data-nombre="Taylor Swift en concierto" data-categoria="Concierto" href="componentes/ver-evento.html">
          <div class="card mb-3 " style="width: 14rem;">
              <img src="imgs/showimg.jpg " class="card-img-top" alt="...">
              <div class="card-body">
                <i class="fas fa-map-marker-alt text-body-tertiary"> Estadio monumental</i>              
                <h4 class="text-wrap" >Taylor Swift en concierto por primera vez</h4>
                    <hr class="divider">
                    <h6>25/09/2024 - 20:30hs</h6>
                    <h6>Precio: 15000 </h6>
              </div>
            </div>
          </a>
          <a class=" link-dark link-underline-opacity-0" id="therion" data-ciudad="Palermo" data-provincia="Buenos Aires" data-precio="12000" data-fecha="2024-10-30" data-nombre="Therion Leviathan Tour 2024" data-categoria="Concierto" href="componentes/ver-evento.html">
            <div class="card mb-3 " style="width: 14rem;">
                <img src="imgs/therion.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <i class="fas fa-map-marker-alt text-body-tertiary"> Groove, Palermo</i>              
  
                    <h4 class="text-wrap">Therion Leviathan Tour 2024</h4>
                      <hr class="divider">
                      <h6>30/10/2024 - 21:00 hs</h6>
                      <h6>Precio: 12000</h6>
                    </div>
              </div>
            </a>
            <a class=" link-dark link-underline-opacity-0" id="Luis Miguel " data-ciudad="Merlo" data-provincia="Buenos Aires" data-precio="1000" data-fecha="2024-12-08" data-nombre="Luis Miguel en concierto" data-categoria="Concierto" href="componentes/ver-evento.html">
              <div class="card mb-3 " style="width: 14rem;">
                  <img src="imgs/luismiguel.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <i class="fas fa-map-marker-alt text-body-tertiary"> Cancha de Vélez</i>              
  
                      <h4 class="text-wrap">Luis Miguel en concierto</h4>
                        <hr class="divider">
                        <h6>8/12/2024 - 19:30 hs</h6>
                        <h6>Precio: 1000</h6>
                  </div>
                </div>
              </a>
              <a class=" link-dark link-underline-opacity-0" id="Lola" data-ciudad="Chascomus" data-provincia="Buenos Aires" data-precio="100000" data-fecha="2024-02-02" data-nombre="LollaPaloosa Argentina 2024" data-categoria="Festival"  href="componentes/ver-evento.html">
                <div class="card mb-3 " style="width: 14rem;">
                    <img src="imgs/lolla.png" class="card-img-top" alt="...">
                    <div class="card-body">
                      <i class="fas fa-map-marker-alt text-body-tertiary"> Campo de Polo</i>              
                        <h4 class="text-wrap">LollaPaloosa Argentina 2024</h4>
                          <hr class="divider">
                          <h6>2/2/2024 - 10:00 hs</h6>
                          <h6>Precio: 100000 </h6>
                    </div>
                  </div>
                </a>
      </div>
      <div class="container-preguntas-frecuentes w-100 bg-dark pt-2 pb-2">
        <a href="./componentes/preguntas-frecuentes.html" class="preguntasLink">Preguntas frecuentes</a>
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
                <li><a href="inicio.html" class="text-white text-decoration-none">Inicio</a></li>
                <li><a href="./componentes/iniciar-sesion.html" class="text-white text-decoration-none">Ingresar</a></li>
                <li><a href="./componentes/registrarse.php" class="text-white text-decoration-none">Registrarse</a></li>
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