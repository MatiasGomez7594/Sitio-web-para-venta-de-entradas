<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/mis-compras.css"> 
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="../scripts/mis-compras.js" defer></script>
    <title>Mis compras</title>
</head>
<body>
<?php require_once("nav-cliente.php")?>

  <form class="w-75 p-5 ">
    <h1 class="mt-5">Historial de compras</h1>
    <h3 class="mt-5 mb-5">Estas son las compras que ha hecho desde que creó su cuenta</h3>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Evento</th>
          <th scope="col">Fecha de compra</th>
          <th scope="col">Total</th>
          <th scope="col">Medio de pago</th>
          <th scope="col">Estado</th>
          <th scope="col">Calificación</th>
        </tr>
      </thead>
      <tbody>
        <tr class="conciertos">
          <td>Taylor swift argentina 2024</td>
          <td>8/9/2024</td>
          <td>$10000</td>
          <td>Débito</td>
          <td class="estado">Activo</td>
          <td class="acciones"><button type="button" class="btn btn-primary cancelar">Cancelar compra</button></td>
        </tr>
        <tr class="conciertos">
          <td>Kiss argentina 2023</td>
          <td>1/2/2023</td>
          <td>$8500</td>
          <td>Crédito</td>
          <td class="estado">Finalizado</td>
          <td class="acciones"><button type="button" class="btn btn-primary cancelar">Cancelar compra</button></td>
        </tr>
        <tr class="conciertos">
          <td>Therion Leviathan Tour III 2024</td>
          <td>30/8/2024</td>
          <td>$7200</td>
          <td>Efectivo</td>
          <td class="estado">Activo</td>
          <td class="acciones"><button type="button" class="btn btn-primary cancelar">Cancelar compra</button></td>
        </tr>
      </tbody>
    </table>
  </form>
</body>
</html>
