<?php
include_once('../componentes/conexion.php');
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario'])) {
    exit;
}else{
    $id_usuario = $_SESSION['id_usuario'];
    $stmt = $conn->prepare("SELECT u.nombre_usuario AS nombre, u.email,u.telefono,u.genero 
    FROM usuarios u WHERE u.id_usuario = :id_usuario;");
    $stmt->execute([':id_usuario' => $id_usuario]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($usuario);


}
 ?>