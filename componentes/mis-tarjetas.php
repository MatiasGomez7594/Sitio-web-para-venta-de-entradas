<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis tarjetas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="../scripts/mis-tarjetas.js" defer></script>
</head>
<body>
<?php require_once("nav-cliente.php")?>


    <div class="container mt-5">
        <h1>Tus tarjetas</h1>
        <h3>Estas son el listado de tarjetas que has cargado</h3>

        <table class="table table-hover" id="tablaTarjetas">
            <thead>
                <tr>
                    <th scope="col">Titular</th>
                    <th scope="col">Número</th>
                    <th scope="col">Fecha de emisión</th>
                    <th scope="col">Fecha de vencimiento</th>
                    <th scope="col">CCV</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Matias Gomez</td>
                    <td>8920242233311199</td>
                    <td>06/20</td>
                    <td>06/27</td>
                    <td>123</td>
                    <td>Débito</td>
                    <td><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>
                </tr>
            </tbody>
        </table>

        <form class="mt-5" id="nuevaTarjeta">
            <h2>Añadir tarjeta</h2>
            <div class="mb-3">
                <label for="numeroTarjeta" class="form-label">Número de la tarjeta</label>
                <input type="text" class="form-control" id="numeroTarjeta" required maxlength="16">
            </div>
            <div class="mb-3">
                <label for="nombreTitular" class="form-label">Nombre del titular</label>
                <input type="text" required class="form-control" id="nombreTitular">
            </div>
            <div class="mb-3">
                <label for="apellidoTitular" class="form-label">Apellido del titular</label>
                <input type="text" required class="form-control" id="apellidoTitular">
            </div>
            <div class="container row">
            <div class="mb-3 col-lg-6">
                <label for="fecha1">Fecha de emisión (MM/AA):</label>
                <input type="text" required class="form-control" id="fecha1" placeholder="06/24" maxlength="5">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="fecha2">Fecha de Vencimiento (MM/AA):</label>
                <input type="text" required class="form-control" id="fecha2" placeholder="05/24" maxlength="5">
            </div>
            <div class="mb-3 col-lg-6">
                <label for="tipoTarjeta">Seleccione el tipo de tarjeta</label>
                <select class="form-select" aria-label="Tipo de tarjeta" id="tipoTarjeta">
                    <option value="" disabled selected>Tipo</option>
                    <option value="credito">Crédito</option>
                    <option value="debito">Débito</option>
                </select>
            </div>
            <div class="mb-3 col-lg-6">
                <label for="ccv">Ingrese el código CCV</label>
                <input type="password" class="form-control" maxlength="3" required id="ccv" placeholder="CCV">
            </div>
          </div>
            <button type="submit" class="btn btn-primary">Añadir tarjeta</button>
            <div id="resultado" class="mt-3"></div>
        </form>
    </div>
    <script src="../scripts/mis-tarjetas.js" defer></script>
</body>
</html>

