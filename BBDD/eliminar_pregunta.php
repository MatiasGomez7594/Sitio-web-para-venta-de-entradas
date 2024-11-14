<?php
require_once 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$stmt = $conn->prepare("DELETE FROM preguntas_frecuentes WHERE id = :id");
$stmt->bindParam(':id', $id);

$response = ['success' => $stmt->execute()];
echo json_encode($response);
