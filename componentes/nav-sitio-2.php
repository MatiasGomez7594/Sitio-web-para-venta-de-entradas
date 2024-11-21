
<nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed  w-100 " style="z-index: 1;">
    <div class="container-fluid">
      <a class="navbar-brand" href="../index.php">MisEntradas.com</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <?php if(!isset($_SESSION['id_usuario'])){?>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="./componentes/iniciar-sesion.php">Ingresar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="./componentes/registrarse.php">Registrarse</a>
            </li>
            <?php }?>
          <li class="nav-item">
              <?php
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
      </div>
    </div>
  </nav>