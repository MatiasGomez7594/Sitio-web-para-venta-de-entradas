<?php
header('Content-Type: application/json');
include_once("../componentes/conexion.php");
$nombre_usuario = $_POST['nombre'] ?? null;
$email = $_POST['email'] ?? null;
$contenido = $_POST['mensaje'] ?? null;

if ($nombre_usuario && $email && $contenido) {
    $stmt = $conn->prepare("INSERT INTO consultas_usuarios ( contenido_consulta, nombre_usuario, email_usuario, estado) 
    VALUES (:contenido_consulta,:nombre_usuario,:email_usuario,:estado);");
    $stmt->bindParam(':nombre_usuario', $nombre_usuario);
    $stmt->bindParam(':contenido_consulta', $contenido);
    $stmt->bindParam(':email_usuario', $email);
    $estado = 'activa';
    $stmt->bindParam(':estado', $estado);
    $stmt->execute();
    $response = ['success' => true];
} else {
    $response = ['success' => false, 'error' => 'Datos incompletos'];
}

echo json_encode($response);

?>