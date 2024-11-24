<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/conexion.php');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Evento</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script> 
    <script src="../scripts/ver-evento.js" defer></script>
</head>
<body>
  <?php require_once('nav-sitio-2.php');?>
  <div class="infoEvento container-fluid pt-5 row bg-body-secondary mx-auto" id="infoEvento">

  </div>
    <div class="container w-75 mx-auto pt-5" id="entradasSeleccionadas">
        <p id="nombreRecinto"></p>
        <p id="fechaInicio"></p>
        <p id="direccion"></p>
        <div id="imagenes"></div>
        <div id="tiposEntradas" class="mt-5 mb-5">
          <div id="error-mensaje" class="text-danger"></div>
        </div>
        <h3>Entradas Seleccionadas</h3>
        <!-- Botón para finalizar la compra -->
    </div>
    <div class="formItemsCompra mb-5" id="formItemsCompra">
    </div>
    <div id="detalleEntradasSeleccionadas" class="mt-4  w-75 mx-auto mb-5">
      <h5>Entradas Seleccionadas</h5>
      <ul class="list-group"></ul>
    </div>
    <div class="container w-75 mx-auto mb-5">
        <button class="btn-primary btn" id="btnComprar">Comprar</button>
    </div>
    <div class="modal fade " data-bs-backdrop="static" id="modalSesion" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Atención</h5>
            </div>
            <div class="modal-body">
              Debes iniciar sesión o registrarte como cliente para poder comprar.            
          </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnAceptar">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
</body>
</html>

