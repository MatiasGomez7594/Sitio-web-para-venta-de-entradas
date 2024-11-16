<?php
include '../componentes/conexion.php';

//devuelve todas las categorias para la tabla 

$sql = "SELECT id_categoria,nombre_categoria,estado FROM categorias_eventos;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($categorias); 



   