<?php
include '../componentes/conexion.php';

//devuelve todas las categorias para la tabla 

$sql = "SELECT c.id_ciudad,c.id_provincia,c.nombre, p.nombre 
AS 'nombre_provincia' 
FROM ciudades c 
LEFT JOIN provincias p ON p.id_provincia = c.id_provincia;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $ciudades = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($ciudades); 
