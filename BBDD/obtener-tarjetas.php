<?php
session_start();
include '../componentes/conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario'])) {
    
    exit;
}



   
    
    // Consulta para obtener las tarjetas del usuario
    $id_usuario = $_SESSION['id_usuario'];

    $sql = "SELECT * FROM tarjetas WHERE id_usuario = :id_usuario";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
    $stmt->execute();
    $tarjetas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($tarjetas); // Devuelve los datos en formato JSON
    $conn=null;