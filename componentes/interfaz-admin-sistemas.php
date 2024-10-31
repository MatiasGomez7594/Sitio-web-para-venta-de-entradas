<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/conexion.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['rol_usuario']!= 'administrador de sistemas') {
  // Redirigir si no hay sesion
  header('../inicio.php');
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script>  
<script src="../scripts/script.js"></script>  
<title>Mis entradas</title>
</head>
<body>
  <!-- Añado al html el nav de la interfaz-->
  <?php require_once("nav-sistemas.php")?>

      <h1>Bienvenid@! <?php echo $_SESSION['nombre_usuario']?> esta es la interfaz del administrador de sistemas</h1>

    <div class="container  mx-auto mb-5 mt-5 row gap-1  " >
        <a href="ver-administradores.html" class="btn btn-primary active col-lg-2  col-md-6 col-sm-12"  tabindex="-1" role="button">Ver administradores</a>
        <a href="ver-tipo-entradas.html" class="btn btn-primary active col-lg-2  col-md-6 col-sm-12"  tabindex="-1" role="button">Ver tipos de entradas</a>
        <a href="ver-preguntas-frecuentes.html" class="btn btn-primary active col-lg-2  col-md-6 col-sm-12"  tabindex="-1" role="button">Ver preguntas frecuentes</a>
        <a href="reporte-de-ventas.html" class="btn btn-primary active col-lg-2  col-md-6 col-sm-12"  tabindex="-1" role="button">Generar reporte de ventas</a>
    </div>
</body>
</html>