<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Historial de Compras</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>
<body>
<div class="fixed-top">
    <?php require_once("nav-cliente.php") ?>
</div>
<div class="container pt-5">
    <h2 class="text-center mt-3">Historial de Compras</h2>

    <?php
    session_start();
    require 'conexion.php';

    // Verifica si el usuario está logueado
    if (isset($_SESSION['id_usuario'])) {
        $user_id = $_SESSION['id_usuario'];

        // Consulta para obtener las compras del usuario logueado
        $sql = "SELECT c.id_compra, c.fecha_compra, c.metodo_pago, c.email, ci.cantidad, te.nombre_tipo, e.nombre_evento, u.nombre_usuario AS nombre_completo
                FROM compras c
                INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
                INNER JOIN compra_items ci ON c.id_compra = ci.id_compra
                INNER JOIN tipos_entradas_evento tee ON ci.id_tipo_entrada = tee.id_tipo_x_evento
                INNER JOIN tipos_entradas te ON tee.id_tipo_entrada = te.id_tipo
                INNER JOIN eventos e ON tee.id_evento = e.id_evento
                WHERE c.id_usuario = :user_id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $compras = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($compras) {
            echo '<h4 class="text-center">Compras de: ' . htmlspecialchars($compras[0]['nombre_completo']) . '</h4>';
            echo '<table class="table table-striped table-bordered mt-3">';
            echo '<thead class="thead-dark"><tr><th>ID Compra</th><th>Fecha</th><th>Método de Pago</th><th>Email</th><th>Cantidad</th><th>Tipo de Entrada</th><th>Evento</th></tr></thead><tbody>';
            foreach ($compras as $compra) {
                echo '<tr>';
                echo '<td>' . ($compra['id_compra']) . '</td>';
                echo '<td>' . ($compra['fecha_compra']) . '</td>';
                echo '<td>' . ($compra['metodo_pago']) . '</td>';
                echo '<td>' . ($compra['email']) . '</td>'; 
                echo '<td>' . ($compra['cantidad']) . '</td>';
                echo '<td>' . ($compra['nombre_tipo']) . '</td>';
                echo '<td>' . ($compra['nombre_evento']) . '</td>';
                echo '</tr>';
            }
            echo '</tbody></table>';
        } else {
            echo '<p class="text-center mt-4 text-warning">No se encontraron compras para este usuario.</p>';
        }
    } else {
        echo '<p class="text-center mt-4 text-danger">Por favor, inicia sesión para ver tu historial de compras.</p>';
    }
    ?>
</div>
</body>
</html>



