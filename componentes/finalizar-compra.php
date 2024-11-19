<?php
require(__DIR__.'/../includes/globals.php');
require_once("conexion.php");

$id_usuario = $_SESSION['id_usuario'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['evento'], $_POST['entradas'], $id_usuario)) {
        $evento = $_POST['evento'];
        $entradas = $_POST['entradas']; // Es un array
        $flyerEvento = $_POST["flyerEvento"];
        $rows = [];
        foreach ($entradas as $entrada) {
            $entrada = json_decode($entrada, true); // Decodificar los datos de la entrada
            if ($entrada['id']) {
                $sql = "SELECT tp.nombre_tipo 
                        FROM tipos_entradas tp
                        INNER JOIN tipos_entradas_evento ev
                        ON tp.id_tipo = ev.id_tipo_entrada
                        WHERE ev.id_tipo_x_evento = :id_entrada;";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id_entrada', $entrada['id'], PDO::PARAM_INT);
                $stmt->execute();
                $nombre_entrada = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($nombre_entrada) {
                    $rows[] = [
                        'id_entrada' => $entrada['id'],
                        'numeracion'=>$entrada['valor'],
                        'producto' => $nombre_entrada['nombre_tipo'] . ' - ' . $entrada['valor'],
                        'precio' => $entrada['precio'],
                        'cantidad' => $entrada['cantidad'],
                        'subtotal' => $entrada['cantidad'] * $entrada['precio']
                    ];
                } else {
                    echo "<p class='text-danger'>Error: Entrada no encontrada (ID: {$entrada['id']})</p>";
                }
            }
        }
    } else {
        echo "<p class='text-danger'>Error: faltan datos.</p>";
    }
}

$sql = "SELECT nombre_titular,
    apellido_titular,
    numero_tarjeta,
    fecha_emision,
    fecha_expiracion,
    codigo_seguridad 
    FROM tarjetas WHERE id_usuario = :id_usuario";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
$stmt->execute();
$tarjeta = $stmt->fetchAll(PDO::FETCH_ASSOC);
if($tarjeta){
  foreach($tarjeta as $t){
  //print_r($tarjeta);
  $tarjetas[] = [
    'nombre_titular' => $t['nombre_titular'],
    'apellido_titular' => $t['apellido_titular'],
    'fecha_emision' => $t['fecha_emision'],
    'fecha_expiracion' => $t['fecha_expiracion'],
    'codigo_seguridad' => $t['codigo_seguridad']
];
  }

}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="../scripts/script-finalizar-compra.js" defer></script> 
    <link rel="stylesheet" href="../css/index.css">
  </head>
<body>
  <?php require_once('nav-sitio-2.php');?>
<div class="container-fluid row pt-5">
    <div class="p-5 mb-2 bg-body-secondary col-lg-2 col-md-12 flyer">
        <img src="../<?php echo $flyerEvento; ?>" class="img-fluid" style="height: 100%; object-fit: cover;" alt="Flyer">
    </div>
    <div class="p-5 mb-2 bg-body-secondary col-lg-4 col-md-12">
        <h3>Comprando</h3>
        <h4 class="mt-3 mb-3"><?php echo htmlspecialchars($evento); ?></h4>
    </div>
</div>
<table class="table table-responsive w-75 mx-auto" id="productos">
    <thead>
    <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
    </tr>
    </thead>
    <tbody>
    <?php if (!empty($rows)): 
            $total=0?>
        <?php foreach ($rows as $row): 
              $total +=$row['subtotal']; ?>
            <tr class="tipo-entrada">
                <td class="d-none"><?php echo htmlspecialchars($row['id_entrada']); ?></td>
                <td class="d-none"><?php echo htmlspecialchars($row['numeracion']); ?></td>
                <td><?php echo htmlspecialchars($row['producto']); ?></td>
                <td>$<?php echo number_format($row['precio'], 2); ?></td>
                <td><?php echo $row['cantidad']; ?></td>
                <td>$<?php echo number_format($row['subtotal'], 2); ?></td>
            </tr>
        <?php endforeach; ?>
    <?php else: ?>
        <tr>
            <td colspan="4" class="text-center">No se seleccionaron entradas válidas.</td>
        </tr>
    <?php endif; ?>
    </tbody>
</table>
<div class="w-75 mx-auto">
  <h5><?php echo 'Total compra: $'.$total;?></h5>
<div class="w-75 mx-auto">
<div class="container pt-5 mt-5">
    <h3 class="text-center mb-4">Finalizar Compra</h3>
    <!-- Mensaje de error -->
    <div id="mensaje-error" class="alert alert-danger d-none" role="alert"></div>
    <form id="formCompra">
      <input type="hidden" name="id_usuario" value="<?php echo htmlspecialchars($id_usuario); ?>">
      <div class="container row">
        <div class="form-group col-lg-6">
          <label for="nombre_comprador" class="col-form-label">Nombre Completo:</label>
          <input type="text" id="nombre"  class="form-control" name="nombre_comprador" required>
        </div>
        <div class="form-group col-lg-6">
          <label for="email" class="col-form-label">Email:</label>
           <input type="email" id="email" class="form-control" name="email" required>
        </div>
      </div>
      <div class="container row">
        <div class="form-group col-lg-6">
          <label for="dni" class="col-form-label">DNI:</label>
          <input type="text" id="dni" class="form-control" name="dni" required>
        </div>
        <div class="form-group col-lg-6">
          <label for="telefono" class="col-form-label">Teléfono:</label>
          <input type="text" id="telefono" class="form-control" name="telefono" required>
        </div>
      </div>
      <div class="container row">
      <div class="form-group col-lg-12">
        <label for="metodo_pago" class="col-form-label">Método de Pago:</label>
        <select class="form-control" id="metodoPago" name="metodo_pago" required>
          <option value="0" selected>Seleccione un método de pago</option>
          <option value="Credito/Debito">Crédito/Débito</option>
          <option value="Efectivo">Efectivo</option>
        </select>
      </div>
      </div>
      <div id="formTarjeta" class="d-none">
      <div id="mensaje-error-tarjeta" class="alert alert-danger d-none" role="alert"></div>
        <div class="container row">
        <div class="mb-3 col-lg-6">
            <label for="miTarjeta">Seleccione una de sus tarjetas</label>
              <select class="form-control" id="miTarjeta" name="miTarjeta">
                <option value="">Seleccione una tarjeta</option>
                <option value="nueva">Ingresar nueva tarjeta</option>
              </select>
          </div>
          <div class="mb-3 col-lg-12">
            <label for="numeroTarjeta" class="form-label">Número de la tarjeta</label>
            <input type="text" id="numeroTarjeta" name="numeroTarjeta" required maxlength="16" class="form-control"> 
        </div>
        </div>
        <div class="container row">
          <div class="mb-3 col-lg-6">
            <label for="nombreTitular" class="form-label">Nombre del titular</label>
            <input type="text" required name="nombreTitular" id="nombreTitular" class="form-control"> 
          </div>
          <div class="mb-3 col-lg-6">
            <label for="apellidoTitular" class="form-label">Apellido del titular</label>
            <input type="text" required name="apellidoTitular" id="apellidoTitular" class="form-control"> 
          </div>
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
                <label for="ccv">Ingrese el código CCV</label>
                <input type="password" maxlength="3" required name="ccv" id="ccv" placeholder="CCV" class="form-control"> 
            </div>
        </div>
    </div>
      <div class="form-group text-center">
        <button type="button" class="btn btn-primary" id="btnConfirmar">Confirmar Compra</button>
      </div>
    </form>
  </div>

        
  <div class="modal fade " data-bs-backdrop="static" id="successModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">¡Felicitaciones compraste!</h5>
            </div>
            <div class="modal-body">
              Te redirigiremos a tus compras donde se verá reflejada.  
          </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnCerrar">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
</body>
</html>
