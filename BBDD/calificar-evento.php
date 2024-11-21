<?php
session_start();
require '../componentes/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar el JSON enviado por JavaScript
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id_evento'], $data['calificacion'], $_SESSION['id_usuario'])) {
        $id_evento = $data['id_evento'];
        $calificacion = $data['calificacion'];
        $id_usuario = $_SESSION['id_usuario'];

        // Validar calificación
        if (!is_numeric($calificacion) || $calificacion < 1 || $calificacion > 5) {
            echo json_encode(['error' => 'Calificación no válida.']);
            exit;
        }

        try {
            // Verificar si el evento ya finalizó
            $stmt_evento = $conn->prepare("SELECT fecha_fin FROM eventos WHERE id_evento = :id_evento");
            $stmt_evento->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
            $stmt_evento->execute();
            $evento = $stmt_evento->fetch(PDO::FETCH_ASSOC);

            if (!$evento || strtotime($evento['fecha_fin']) > time()) {
                echo json_encode(['error' => 'El evento no ha finalizado.']);
                exit;
            }

            // Verificar si ya existe una calificación
            $stmt_check = $conn->prepare("SELECT 1 FROM calificacion_evento WHERE id_evento = :id_evento AND id_usuario = :id_usuario");
            $stmt_check->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
            $stmt_check->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
            $stmt_check->execute();

            if ($stmt_check->rowCount() > 0) {
                echo json_encode(['error' => 'Ya has calificado este evento.']);
                exit;
            }

            // Insertar calificación
            $stmt_insert = $conn->prepare("
                INSERT INTO calificacion_evento (id_evento, id_usuario, calificacion) 
                VALUES (:id_evento, :id_usuario, :calificacion)
            ");
            $stmt_insert->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
            $stmt_insert->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
            $stmt_insert->bindParam(':calificacion', $calificacion, PDO::PARAM_INT);

            if ($stmt_insert->execute()) {
                echo json_encode(['success' => 'Calificación registrada con éxito.']);
            } else {
                echo json_encode(['error' => 'Error al registrar la calificación.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Error de servidor: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Datos incompletos.']);
    }
} else {
    echo json_encode(['error' => 'Método no permitido.']);
}
