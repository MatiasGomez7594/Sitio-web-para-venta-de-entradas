<?php
include '../componentes/conexion.php';

//devuelve todas las categorias para la tabla 

$sql = "SELECT id_provincia,nombre FROM provincias;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $provincias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($provincias); 
