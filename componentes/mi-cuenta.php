<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/conexion.php');

// Verificamos si el cliente inicio sesion
if (!isset($_SESSION['id_usuario']) || $_SESSION['rol_usuario'] != 'cliente') {
    header("Location: ../index.php");
    exit;
}

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
<!-- Añado al html el nav de la interfaz-->
  <?php require_once("nav-cliente.php")?>

    <div class="mx-auto w-75 pt-5">
        <h1 class="pt-5 mb-3"><?php echo "Bienvenido, " . $_SESSION['nombre_usuario'];?>
        </h1>
        <p class="mb-5">Desde tu perfil podrás administrar tus datos y tarjetas además revisar tus entradas compradas</p>
        <div class="container mt-5 row ">
            <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
                <a href="historial-compras.php" class="btn btn-primary btn-lg  " tabindex="-1" role="button" >Mis compras</a>
            </div>
            <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
                <a href="editar-datos.php" class="btn btn-primary btn-lg  " tabindex="-1" role="button" >Datos personales</a>
            </div>
            <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
                <a href="cambiar-contraseña.php" class="btn btn-primary btn-lg  " tabindex="-1" role="button" >Cambiar contraseña</a>
            </div>
            <div class="mb-3 col-lg-3 col-md-6 col-sm-12">
                <a href="mis-tarjetas.php" class="btn btn-primary btn-lg  " tabindex="-1" role="button" >Mis tarjetas</a>
            </div>
        </div>

    </div>
</body>
</html>