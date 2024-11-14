<?php
require_once '../componentes/conexion.php';
$data = json_decode(file_get_contents("php://input"), true);
$id_pregunta = $data['id_pregunta'] ?? null;
$response = [];
if ($id_pregunta) {
    try {
        // Asegúrate de que la conexión sea válida
        if ($conn) {
            $stmt = $conn->prepare("UPDATE preguntas_frecuentes SET estado = 'inactiva' WHERE id_pregunta = :id_pregunta");
            $stmt->bindParam(':id_pregunta', $id_pregunta);
            $stmt->execute();

            // Verificamos si la actualización tuvo éxito
            if ($stmt->rowCount() > 0) {
                $response = ['success' => true];
            } else {
                // Si no se actualizó ninguna fila, algo salió mal
                $response = ['success' => false, 'error' => 'No se encontró la pregunta o ya estaba inactiva'];
            }
        } else {
            $response = ['success' => false, 'error' => 'Error de conexión a la base de datos'];
        }
    } catch (PDOException $e) {
        // Si ocurre algún error en la base de datos
        $response = ['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()];
    }
} else {
    $response = ['success' => false, 'error' => 'ID de pregunta no proporcionado'];
}

echo json_encode($response);
