<?php
require_once 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$pregunta = $data['pregunta'];
$contenido = $data['contenido'];

$stmt = $conn->prepare("INSERT INTO preguntas_frecuentes (pregunta, contenido) VALUES (:pregunta, :contenido)");
$stmt->bindParam(':pregunta', $pregunta);
$stmt->bindParam(':contenido', $contenido);

$response = ['success' => $stmt->execute()];
echo json_encode($response);
