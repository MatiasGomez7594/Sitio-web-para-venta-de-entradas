<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Compras</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
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

    if (isset($_SESSION['id_usuario'])) {
        $user_id = $_SESSION['id_usuario'];

        // Manejador de calificación
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id_evento'], $_POST['calificacion'])) {
            $id_evento = $_POST['id_evento'];
            $calificacion = $_POST['calificacion'];

            if (!empty($calificacion) && is_numeric($calificacion) && $calificacion >= 1 && $calificacion <= 5) {
                // Verificar si el evento ha finalizado
                $stmt_evento = $conn->prepare("SELECT fecha_fin FROM eventos WHERE id_evento = :id_evento");
                $stmt_evento->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
                $stmt_evento->execute();
                $evento = $stmt_evento->fetch(PDO::FETCH_ASSOC);

                if ($evento && strtotime($evento['fecha_fin']) <= time()) {
                    // Verificar si el usuario ya ha calificado el evento
                    $stmt_check = $conn->prepare("SELECT 1 FROM calificacion_evento WHERE id_evento = :id_evento AND id_usuario = :id_usuario");
                    $stmt_check->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
                    $stmt_check->bindParam(':id_usuario', $user_id, PDO::PARAM_INT);
                    $stmt_check->execute();

                    if ($stmt_check->rowCount() == 0) {
                        // Insertar calificación
                        $stmt_insert = $conn->prepare("INSERT INTO calificacion_evento (id_evento, id_usuario, calificacion) VALUES (:id_evento, :id_usuario, :calificacion)");
                        $stmt_insert->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
                        $stmt_insert->bindParam(':id_usuario', $user_id, PDO::PARAM_INT);
                        $stmt_insert->bindParam(':calificacion', $calificacion, PDO::PARAM_INT);

                        if ($stmt_insert->execute()) {
                            echo '<div class="alert alert-success text-center">¡Calificación registrada con éxito!</div>';
                        } else {
                            echo '<div class="alert alert-danger text-center">Error al registrar la calificación. Inténtalo de nuevo.</div>';
                        }
                    } else {
                        echo '<div class="alert alert-warning text-center">Ya has calificado este evento.</div>';
                    }
                } else {
                    echo '<div class="alert alert-info text-center">Este evento aún no ha finalizado y no se puede calificar.</div>';
                }
            } else {
                echo '<div class="alert alert-danger text-center">Por favor, selecciona una calificación válida.</div>';
            }
        }

        // Consulta para obtener las compras del usuario logueado
        $sql = "SELECT c.id_compra, c.fecha_compra, c.metodo_pago, c.email, ci.cantidad, te.nombre_tipo, e.nombre_evento, e.id_evento, e.fecha_fin, u.nombre_usuario AS nombre_completo
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
            echo '<h4 class="text-center">Compras de: ' . ($compras[0]['nombre_completo']) . '</h4>';
            echo '<table class="table table-striped table-bordered mt-3">';
            echo '<thead class="thead-dark"><tr><th>ID Compra</th><th>Fecha</th><th>Método de Pago</th><th>Email</th><th>Cantidad</th><th>Tipo de Entrada</th><th>Evento</th><th>Calificar</th></tr></thead><tbody>';
            foreach ($compras as $compra) {
                echo '<tr>';
                echo '<td>' . ($compra['id_compra']) . '</td>';
                echo '<td>' . ($compra['fecha_compra']) . '</td>';
                echo '<td>' . ($compra['metodo_pago']) . '</td>';
                echo '<td>' . ($compra['email']) . '</td>';
                echo '<td>' . ($compra['cantidad']) . '</td>';
                echo '<td>' . ($compra['nombre_tipo']) . '</td>';
                echo '<td>' . ($compra['nombre_evento']) . '</td>';
                echo '<td>';

                if (strtotime($compra['fecha_fin']) <= time()) {
                    echo '<form method="post">';
                    echo '<input type="hidden" name="id_evento" value="' . ($compra['id_evento']) . '">';

                    // Usar un select para calificar
                    echo '<div class="form-group">';
                    echo '<label for="calificacion">Calificación:</label>';
                    echo '<select name="calificacion" class="form-control" id="calificacion">';
                    for ($i = 1; $i <= 5; $i++) {
                        echo '<option value="' . $i . '">' . $i . '</option>';
                    }
                    echo '</select>';
                    echo '</div>';

                    echo '<button type="submit" class="btn btn-primary btn-sm mt-2">Guardar</button>';
                    echo '</form>';
                } else {
                    echo '<span class="text-muted">No disponible</span>';
                }

                echo '</td></tr>';
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
