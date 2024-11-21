<?php
include_once('../componentes/conexion.php');
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario']) && $_SESSION['rol_usuario'] !=='administrador de sistemas') {
    exit;
}else{
    $sql="SELECT 
    e.nombre_evento,
    DATE_FORMAT(e.fecha_inicio, '%d/%m/%Y') AS fecha_inicio,
    e.total_localidades,
    SUM(te.cantidad_por_tipo) AS total_entradas_vendidas,
    SUM(te.cantidad_por_tipo * te.precio) AS total_recaudado,
    ROUND(AVG(ce.calificacion), 2) AS calificacion_promedio
    FROM 
    eventos e
    LEFT JOIN 
    tipos_entradas_evento te 
    ON e.id_evento = te.id_evento AND te.estado = 'activo'
    LEFT JOIN 
    calificacion_evento ce 
    ON e.id_evento = ce.id_evento
    WHERE 
    e.estado = 'activo' 
    AND e.fecha_inicio < NOW()
    GROUP BY 
    e.id_evento, e.nombre_evento, e.fecha_inicio, e.total_localidades;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datos); // Devuelve los datos en formato JSON
    

} 



?>