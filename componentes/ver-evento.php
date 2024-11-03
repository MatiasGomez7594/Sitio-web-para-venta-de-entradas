<?php
// Obtener los valores enviados en la URL
require("../componentes/conexion.php");

$id_evento = $_GET['id'] ?? null;
$nombre = $_GET['nombre'] ?? null;

if (!is_numeric($id_evento) || $id_evento <= 0 || empty($nombre)) {
  // Redirigir si los parámetros son inválidos
  header("Location: ../inicio.php");
  exit(); // Asegurarse de que el script no continúe
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script> 
    <script defer src="../scripts/script-ver-evento.js" defer></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/index.css">    
    <link rel="stylesheet" href="../css/tabla-entradas.css">    


    <title>Document</title>
</head>
<body class="bg-body-secondary">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100" style="z-index: 1;">
        <div class="container-fluid">
            <a class="navbar-brand" href="../inicio.php">MisEntradas.com</a>
          </div>
    </nav>
    <input type="hidden" id="id_evento" value="<?php echo $id_evento ?>">
    <div class="container-fluid">
      <div class="p-5 mb-2 bg-body-secondary row align-items-center" id="eventoDescripcion">
      </div>
  </div>
  <form class="container-fluid" id="formItemsCompra">

</form>



</body>
</html>