<?php
include '../componentes/conexion.php';

//devuelve todos los tipos de entrada  para la tabla 

$sql = "SELECT  id_tipo,
    nombre_tipo,
    estado FROM tipos_entradas ";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $tipos_entradas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($tipos_entradas); 



