<?php
require_once 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$pregunta = $data['pregunta'];
$contenido = $data['contenido'];

$stmt = $conn->prepare("UPDATE preguntas_frecuentes SET pregunta = :pregunta, contenido = :contenido WHERE id = :id");
$stmt->bindParam(':pregunta', $pregunta);
$stmt->bindParam(':contenido', $contenido);
$stmt->bindParam(':id', $id);

$response = ['success' => $stmt->execute()];
echo json_encode($response);
