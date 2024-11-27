<?php

include_once("../componentes/conexion.php");
try{
    $sql="SELECT i.id_evento, i.url_img
    FROM imgs_carousel i 
    LEFT JOIN eventos e ON e.id_evento = i.id_evento  
    WHERE e.estado = 'activo' AND e.fecha_fin > NOW();
    ";
    // Preparar la declaración
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    // Obtener todos los resultados
    $imgs_eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Retornar los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($imgs_eventos);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>