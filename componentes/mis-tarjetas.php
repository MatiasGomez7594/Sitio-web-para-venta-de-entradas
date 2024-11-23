<?php
 session_start();
 if (!isset($_SESSION['id_usuario'])) {
    // mandar a inicio si no inicio session
    header("Location: ../index.php");
    exit(); 
 }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script>  
    <script src="../scripts/mis-tarjetas.js" defer></script>
    <title>Mis tarjetas</title>
</head>
<body>
<?php require_once("nav-cliente.php")?>
      <h1>mis tarjetas</h1>
<div class="container my-5">

        <h2>Mis Tarjetas</h2>
        <!-- Tabla para mostrar las tarjetas -->
        <table class="table table-bordered   table-responsive  mt-4"  id="tablaTarjetas">
            <thead class="table-secondary">
                <tr>
                    <th>Nombre del Titular</th>
                    <th>Apellido del Titular</th>
                    <th>Número de Tarjeta</th>
                    <th>Fecha de Expiración</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaTarjetasBody">
                
            </tbody>
        </table>

        <div class="modal fade" id="modalEditar" tabindex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditarLabel">Editar Tarjeta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Formulario para editar tarjeta -->
        <form id="formEditar">
        <input type="hidden" id="idtarjetaEditar" name="id_tarjeta">
          <div class="mb-3 ">
            <label for="nombreTitularEditar" class="form-label">Nombre del titular</label>
            <input type="text" class="form-control" id="nombreTitularEditar" name=nombreTitular_E required>
          </div>
          <div class="mb-3 ">
            <label for="apellidoTitularEditar" class="form-label">Apellido del titular</label>
            <input type="text" class="form-control" id="apellidoTitularEditar" name="apellidoTitular_E" required>
          </div>
          <div class="mb-3 ">
            <label for="numeroTarjetaEditar" class="form-label">Número de tarjeta</label>
            <input type="text" class="form-control" id="numeroTarjetaEditar" name="numeroTarjeta_E" required required maxlength="16">
          </div>
          <div class="mb-3 ">
            <label for="fechaExpiracionEditar" class="form-label">Fecha de expiración</label>
            <input type="text" class="form-control" id="fechaExpiracionEditar"  name="fechaExpiracion_E"  required>
          </div>
          <div class="mb-3 ">
          <label for="tipoTarjetaEditar">Seleccione el tipo de tarjeta</label>
                <select class="form-select "  id="tipoTarjetaEditar" name="tipoTarjeta_E">
                    <option value=""disabled select>Tipo</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Débito">Débito</option>
                </select>
          </div>
          <button type="submit" class="btn btn-warning" id="actualizarTarjeta">Actualizar</button>
        </form>
      </div>

    </div>
  </div>
</div>

         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAgregar">
            Agregar Nueva Tarjeta
        </button>

  
    

    <div class="modal fade" id="modalAgregar" tabindex="-1" aria-labelledby="modalAgregarLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalAgregarLabel">Agregar Nueva Tarjeta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Formulario para agregar tarjeta -->
                        <form id="formTarjeta">
                            <div class="mb-3">
                                <label for="numeroTarjeta" class="form-label">Número de la tarjeta</label>
                                <input type="text" id="numeroTarjeta" name="numeroTarjeta" required maxlength="16" class="form-control"> 
                            </div>
                            <div class="mb-3">
                                <label for="nombreTitular" class="form-label">Nombre del titular</label>
                                <input type="text" required name="nombreTitular" id="nombreTitular" class="form-control"> 
                            </div>
                            <div class="mb-3">
                                <label for="apellidoTitular" class="form-label">Apellido del titular</label>
                                <input type="text" required name="apellidoTitular" id="apellidoTitular" class="form-control"> 
                            </div>
                            <div class="container row">
                                <div class="mb-3 col-lg-6">
                                    <label for="emisiondate">Fecha de emisión</label>
                                    <input type="text" required id="emisiondate" name="emisiondate" placeholder="(MM/AA)" maxlength="5" class="form-control"> 
                                </div>
                                <div class="mb-3 col-lg-6">
                                    <label for="vencimientodate">Fecha de Vencimiento</label>
                                    <input type="text" required id="vencimientodate" name="vencimientodate" placeholder="(MM/AA)" maxlength="5" class="form-control"> 
                                </div>
                                <div class="mb-3 col-lg-6">
                                    <label for="tipoTarjeta">Seleccione el tipo de tarjeta</label>
                                    <select class="form-select" id="tipoTarjeta" name="tipoTarjeta">
                                        <option value="" disabled selected>Tipo</option>
                                        <option value="Crédito">Crédito</option>
                                        <option value="Débito">Débito</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-lg-6">
                                    <label for="ccv">Ingrese el código CCV</label>
                                    <input type="password" maxlength="3" required name="ccv" id="ccv" placeholder="CCV" class="form-control"> 
                                </div>
                            </div>
                            <button type="submit" class="btn btn-success">Guardar Tarjeta</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    

    </div>

</body>
</html>

