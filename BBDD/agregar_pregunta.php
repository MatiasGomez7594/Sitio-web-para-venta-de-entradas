<?php
require_once '../componentes/conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$titulo = $data['titulo'] ?? null;
$contenido = $data['contenido'] ?? null;

if ($titulo && $contenido) {
    $stmt = $conn->prepare("INSERT INTO preguntas_frecuentes (pregunta, contenido, estado) VALUES (:pregunta, :contenido, :estado)");
    $stmt->bindParam(':pregunta', $titulo);
    $stmt->bindParam(':contenido', $contenido);
    $estado = 'activa';
    $stmt->bindParam(':estado', $estado);
    $stmt->execute();
    //Obtengo el id de la ultima pregunta que inserte
    $id_ultima_pregunta = $conn->lastInsertId();
    $response = ['success' => true,'id_ultima_pregunta'=>$id_ultima_pregunta];
} else {
    $response = ['success' => false, 'error' => 'Datos incompletos'];
}

echo json_encode($response);
