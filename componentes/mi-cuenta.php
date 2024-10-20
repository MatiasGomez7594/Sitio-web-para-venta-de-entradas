<?php
session_start();

// Verificamos si el usuario inicio sesion
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

echo "Bienvenido, " . $_SESSION['nombre_usuario'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <title>mi cuenta</title>
</head>
<body>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed  w-100 " style="z-index: 1;">
        <div class="container-fluid">
          <a class="navbar-brand" href="../inicio.html">MisEntradas.com</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link active dropdown-toggle " href="mi-cuenta.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Mi perfil
                </a>
                <ul class="dropdown-menu bg-dark">
                  <li><a class="dropdown-item bg-dark text-light" href="mi-cuenta.html">Mi cuenta</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="mis-compras.html">Mis compras</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="editar-datos.html">Datos personales</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="cambiar-contraseña.html">Cambiar contraseña</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="mis-tarjetas.html">Mis tarjetas</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="eliminar-perfil.html">Eliminar perfil</a></li>

                  <li><a class="dropdown-item bg-dark text-light" href="../inicio.html">Cerrar sesión</a></li>

                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <div class="mx-auto w-75 pt-5">
        <h1 class="pt-5 mb-3">¡Bienvenid@ usuari@ !</h1>
        <p class="mb-5">Desde tu perfil podrás administrar tus datos y tarjetas además revisar tus entradas compradas</p>
        <a href="mis-compras.html" class="btn btn-primary btn-lg " tabindex="-1" role="button" >Mis compras</a>
        <a href="editar-datos.html" class="btn btn-primary btn-lg " tabindex="-1" role="button" >Datos personales</a>
        <a href="cambiar-contraseña.html" class="btn btn-primary btn-lg " tabindex="-1" role="button" >Cambiar contraseña</a>
        <a href="mis-tarjetas.html" class="btn btn-primary btn-lg " tabindex="-1" role="button" >Mis tarjetas</a>
        <button type="button" class="btn btn-primary btn-lg">Cerrar sesión</button>


    </div>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>