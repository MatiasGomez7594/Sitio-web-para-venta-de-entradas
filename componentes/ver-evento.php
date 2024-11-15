<?php
session_start();
require("../componentes/conexion.php");

// Verificar si el usuario está logueado
if (!isset($_SESSION['id_usuario'])) {
    header("Location: ../login.php");
    exit();
}

$id_evento = $_GET['id'] ?? null;
$nombre = $_GET['nombre'] ?? null;

// Validar parámetros de URL y redirigir si no son válidos
if (!is_numeric($id_evento) || $id_evento <= 0 || empty($nombre)) {
    header("Location: ../inicio.php");
    exit();
}

// Consultar los detalles del evento
$sql_evento = "SELECT e.nombre_evento, e.nombre_recinto, e.direccion, e.fecha_inicio, e.fecha_fin, 
                      c.nombre AS ciudad, p.nombre AS provincia,
                      DATE_FORMAT(e.fecha_inicio, '%H:%i') AS hora_inicio,
                      DATE_FORMAT(e.fecha_fin, '%H:%i') AS hora_fin
               FROM eventos e
               JOIN ciudades c ON e.id_ciudad = c.id_ciudad
               JOIN provincias p ON e.id_provincia = p.id_provincia
               WHERE e.id_evento = :id_evento";

$stmt_evento = $conn->prepare($sql_evento);
$stmt_evento->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
$stmt_evento->execute();
$evento = $stmt_evento->fetch(PDO::FETCH_ASSOC);

if (!$evento) {
    echo "Evento no encontrado.";
    exit();
}

// Consultar las entradas disponibles
$sql_entradas = "SELECT te.id_tipo_x_evento, t.nombre_tipo, te.precio, te.estado, 
                        (te.cantidad_por_tipo - IFNULL(SUM(ce.cantidad), 0)) AS disponibilidad
                 FROM tipos_entradas_evento te
                 JOIN tipos_entradas t ON te.id_tipo_entrada = t.id_tipo
                 LEFT JOIN compra_items ce ON te.id_tipo_entrada = ce.id_tipo_entrada
                 WHERE te.id_evento = :id_evento
                 GROUP BY te.id_tipo_x_evento, t.nombre_tipo, te.precio, te.estado, te.cantidad_por_tipo";
$stmt_entradas = $conn->prepare($sql_entradas);
$stmt_entradas->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
$stmt_entradas->execute();
$entradas = $stmt_entradas->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles del Evento</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Validar cantidad al seleccionar una entrada
            const tipoEntrada = document.getElementById("tipo_entrada");
            const cantidadInput = document.getElementById("cantidad");

            tipoEntrada.addEventListener("change", function() {
                const selectedOption = tipoEntrada.options[tipoEntrada.selectedIndex];
                const disponibilidad = selectedOption.getAttribute("data-disponibilidad");
                cantidadInput.setAttribute("max", disponibilidad);
                if (parseInt(cantidadInput.value) > parseInt(disponibilidad)) {
                    cantidadInput.value = disponibilidad;
                }
            });
        });
    </script>
</head>

<body>
    <div class="fixed-top">
        <?php require_once("nav-cliente.php") ?>
    </div>
    <div class="container pt-5 mt-5">
        <!-- Encabezado del Evento -->
        <div class="card my-4 p-4">
            <h2 class="card-title text-center"><?php echo ($evento['nombre_evento']); ?></h2>
            <p class="card-text text-center">
                <strong>Ubicación:</strong> <?php echo ($evento['nombre_recinto']); ?>,
                <?php echo ($evento['ciudad']); ?>, <?php echo ($evento['provincia']); ?><br>
                <strong>Fecha:</strong> <?php echo date('d/m/Y', strtotime($evento['fecha_inicio'])); ?> al
                <?php echo date('d/m/Y', strtotime($evento['fecha_fin'])); ?><br>
                <strong>Hora de inicio:</strong> <?php echo $evento['hora_inicio']; ?> |
                <strong>Hora de finalización:</strong> <?php echo $evento['hora_fin']; ?>
            </p>
        </div>

        <!-- Sección de Entradas -->
        <h3 class="text-center my-4">Entradas Disponibles</h3>
        <div class="row">
            <?php if (empty($entradas)): ?>
                <p class="text-center text-danger w-100">No hay entradas disponibles para este evento.</p>
            <?php endif; ?>
            <?php foreach ($entradas as $entrada): ?>
                <?php if ($entrada['disponibilidad'] > 0): ?>
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <h5 class="card-title"><?php echo htmlspecialchars($entrada['nombre_tipo']); ?></h5>
                                <p class="card-text"><strong>Precio:</strong>
                                    $<?php echo number_format($entrada['precio'], 2); ?></p>
                                <p class="card-text"><strong>Disponibles:</strong> <?php echo $entrada['disponibilidad']; ?></p>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>

        <!-- Formulario de Compra -->
        <div class="card p-4 mt-4">
            <form action="finalizar-compra.php" method="POST">
                <input type="hidden" name="id_evento" value="<?php echo $id_evento; ?>">

                <!-- Input hidden para pasar el tipo de entrada -->
                <div class="form-group">
                    <label for="tipo_entrada">Selecciona tu entrada:</label>
                    <select class="form-control" name="tipo_entrada" id="tipo_entrada" required>
                        <?php foreach ($entradas as $entrada): ?>
                            <?php if ($entrada['disponibilidad'] > 0): ?>
                                <option value="<?php echo $entrada['id_tipo_x_evento']; ?>"
                                    data-precio="<?php echo $entrada['precio']; ?>"
                                    data-disponibilidad="<?php echo $entrada['disponibilidad']; ?>">
                                    <?php echo htmlspecialchars($entrada['nombre_tipo']); ?> - 
                                    $<?php echo number_format($entrada['precio'], 2); ?>
                                </option>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group mt-2">
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" class="form-control" name="cantidad" id="cantidad" min="1" value="1" required>
                </div>

                <div class="d-flex justify-content-center mt-2">
                    <button type="submit" class="btn btn-primary btn-block mt-4 w-auto">Finalizar Compra</button>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
