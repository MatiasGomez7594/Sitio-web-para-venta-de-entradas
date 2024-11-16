<?php
include '../componentes/conexion.php';

//devuelve todas las categorias para la tabla 

$sql = "SELECT id_ciudad,id_provincia,nombre FROM ciudades;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $ciudades = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($ciudades); 
