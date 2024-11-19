<?php
include '../componentes/conexion.php';

// devuelve la info de la tarjeta que se selecciono para editar 
$id_tarjeta = $_GET['id'] ?? null;

if ($id_tarjeta) {
    $sql = "SELECT id_tarjeta, nombre_titular,apellido_titular,numero_tarjeta,fecha_expiracion,fecha_emision,tipo_tarjeta FROM tarjetas WHERE id_tarjeta = :id_tarjeta";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_tarjeta', $id_tarjeta, PDO::PARAM_INT);
    $stmt->execute();

    $tarjeta = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($tarjeta) {
        echo json_encode($tarjeta);
    } else {
        echo json_encode(['error' => 'trajeta no encontrada']);
    }
} else {
    echo json_encode(['error' => 'ID de tarjeta no proporcionado']);
}







$conn=null;
