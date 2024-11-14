<?php
require_once '../componentes/conexion.php';
$data = json_decode(file_get_contents("php://input"), true);
$id_pregunta = $data['id_pregunta'] ?? null;
$pregunta = $data['titulo'] ?? null;
$contenido = $data['contenido'] ?? null;

if ($id_pregunta && $pregunta && $contenido) {
    $stmt = $conn->prepare("UPDATE preguntas_frecuentes SET pregunta = :pregunta, contenido = :contenido WHERE id_pregunta = :id_pregunta");
    $stmt->bindParam(':pregunta', $pregunta);
    $stmt->bindParam(':contenido', $contenido);
    $stmt->bindParam(':id_pregunta', $id_pregunta);
    $stmt->execute();
    $response = ['success' => true];
} else {
    $response = ['success' => false, 'error' => 'Hubo un problema con los datos recibidos'];
}

echo json_encode($response);
