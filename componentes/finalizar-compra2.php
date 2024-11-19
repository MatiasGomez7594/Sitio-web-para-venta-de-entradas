<?php
session_start();
require("../componentes/conexion.php");
// Verifica que el usuario esté logueado
if (!isset($_SESSION['id_usuario']) ||  $_SESSION['rol_usuario'] !== 'cliente') {
  header("Location: ../inicio.php");
  exit();

}

$id_evento = $_POST['id_evento'] ?? null;
$id_tipo_x_evento = $_POST['tipo_entrada'] ?? null;
$cantidad = $_POST['cantidad'] ?? null;
$id_usuario = $_SESSION['id_usuario'];

// Validar que los datos necesarios estén presentes
if (!$id_evento || !$id_tipo_x_evento || !$cantidad) {
  echo "Datos de compra incompletos.";
  exit();
}

// Obtener los tipos de entradas válidos para el evento usando id_tipo_x_evento
$sql_tipos_validos = "SELECT id_tipo_x_evento 
                      FROM tipos_entradas_evento 
                      WHERE id_evento = :id_evento";
$stmt_tipos_validos = $conn->prepare($sql_tipos_validos);
$stmt_tipos_validos->execute([':id_evento' => $id_evento]);

// Verificar si la consulta fue exitosa
if (!$stmt_tipos_validos) {
  var_dump($stmt_tipos_validos->errorInfo());
  exit("Error al obtener los tipos de entrada.");
}

$tipos_validos = $stmt_tipos_validos->fetchAll(PDO::FETCH_COLUMN);

// Validar que el id_tipo_x_evento corresponde a uno de los tipos válidos para el evento
if (!in_array($id_tipo_x_evento, $tipos_validos)) {
  echo "Tipo de entrada no válido para este evento.";
  exit();
}

// Verificar stock para el id_tipo_x_evento
$sql_stock = "SELECT cantidad_por_tipo 
              FROM tipos_entradas_evento 
              WHERE id_evento = :id_evento 
              AND id_tipo_x_evento = :id_tipo_x_evento";
$stmt_stock = $conn->prepare($sql_stock);
$stmt_stock->execute([
  ':id_evento' => $id_evento,
  ':id_tipo_x_evento' => $id_tipo_x_evento
]);

// Verificar si la consulta de stock fue exitosa
if (!$stmt_stock) {
  var_dump($stmt_stock->errorInfo());
  exit("Error al verificar el stock.");
}

$stock = $stmt_stock->fetchColumn();

// Verificar si se obtuvo el stock correctamente
if ($stock === false) {
  echo "Error: No se encontró el stock para el evento $id_evento y tipo de entrada $id_tipo_x_evento.";
  exit();
}

// Verificar si hay suficiente stock
if ($stock < $cantidad) {
  echo "No hay suficientes entradas disponibles. Stock disponible: $stock, cantidad solicitada: $cantidad";
  exit();
}

// Procesar la compra solo si el método es POST y se han recibido los datos completos del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['nombre_comprador'])) {
  $nombre_comprador = $_POST['nombre_comprador'];
  $email = $_POST['email'];
  $dni = $_POST['dni'];
  $telefono = $_POST['telefono'];
  $metodo_pago = $_POST['metodo_pago'];

  // Insertar en la tabla compras
  $sql_compra = "INSERT INTO compras (id_usuario, nombre_comprador, email, dni, telefono, metodo_pago) 
                   VALUES (:id_usuario, :nombre_comprador, :email, :dni, :telefono, :metodo_pago)";
  $stmt_compra = $conn->prepare($sql_compra);
  $result = $stmt_compra->execute([
    ':id_usuario' => $id_usuario,
    ':nombre_comprador' => $nombre_comprador,
    ':email' => $email,
    ':dni' => $dni,
    ':telefono' => $telefono,
    ':metodo_pago' => $metodo_pago
  ]);

  if (!$result) {
    var_dump($stmt_compra->errorInfo());
    exit("Error al realizar la compra.");
  }

  // Obtener el ID de la compra
  $id_compra = $conn->lastInsertId();

  // Insertar en la tabla compra_items
  $sql_item = "INSERT INTO compra_items (id_compra, id_tipo_entrada, cantidad) 
             VALUES (:id_compra, :id_tipo_entrada, :cantidad)";
  $stmt_item = $conn->prepare($sql_item);
  $result_item = $stmt_item->execute([
    ':id_compra' => $id_compra,
    ':id_tipo_entrada' => $id_tipo_x_evento,  // Aquí se usa id_tipo_entrada
    ':cantidad' => $cantidad
  ]);

  // Verificar si la consulta fue exitosa
  if (!$result_item) {
    var_dump($stmt_item->errorInfo());
    exit("Error al agregar los productos de la compra.");
  }

  // Restar las entradas compradas del stock
  $nuevo_stock = $stock - $cantidad;
  $sql_actualizar_stock = "UPDATE tipos_entradas_evento 
                             SET cantidad_por_tipo = :nuevo_stock 
                             WHERE id_evento = :id_evento AND id_tipo_x_evento = :id_tipo_x_evento";

  $stmt_actualizar_stock = $conn->prepare($sql_actualizar_stock);
  $result_stock_update = $stmt_actualizar_stock->execute([
    ':nuevo_stock' => $nuevo_stock,
    ':id_evento' => $id_evento,
    ':id_tipo_x_evento' => $id_tipo_x_evento
  ]);

  // Verificar si la actualización de stock fue exitosa
  if (!$result_stock_update) {
    var_dump($stmt_actualizar_stock->errorInfo());
    exit("Error al actualizar el stock.");
  }

header("Location: ../inicio.php");
exit();
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
</head>

<body>
  <div class="fixed-top">
    <?php require_once("nav-cliente.php") ?>
  </div>
  <div class="container pt-5 mt-5">
    <h3 class="text-center mb-4">Finalizar Compra</h3>

    <!-- Mensaje de error -->
    <div id="mensaje-error" class="alert alert-danger d-none" role="alert"></div>

    <form method="POST">
      <input type="hidden" name="id_evento" value="<?php echo htmlspecialchars($id_evento); ?>">
      <input type="hidden" name="tipo_entrada" value="<?php echo htmlspecialchars($id_tipo_x_evento); ?>">
      <input type="hidden" name="cantidad" value="<?php echo htmlspecialchars($cantidad); ?>">

      <div class="form-group">
        <label for="nombre_comprador" class="col-form-label">Nombre Completo:</label>
        <input type="text" class="form-control" name="nombre_comprador" required>
      </div>

      <div class="form-group">
        <label for="email" class="col-form-label">Email:</label>
        <input type="email" class="form-control" name="email" required>
      </div>

      <div class="form-group">
        <label for="dni" class="col-form-label">DNI:</label>
        <input type="text" class="form-control" name="dni" required>
      </div>

      <div class="form-group">
        <label for="telefono" class="col-form-label">Teléfono:</label>
        <input type="text" class="form-control" name="telefono" required>
      </div>

      <div class="form-group">
        <label for="metodo_pago" class="col-form-label">Método de Pago:</label>
        <select class="form-control" name="metodo_pago" required>
          <option value="">Seleccione un método de pago</option>
          <option value="Credito/Debito">Crédito/Débito</option>
          <option value="Efectivo">Efectivo</option>
        </select>
      </div>

      <div class="form-group text-center">
        <button type="submit" class="btn btn-primary">Confirmar Compra</button>
      </div>
    </form>
  </div>
</body>

</html>
