<?php
// Conexión a la base de datos usando PDO
require("../componentes/conexion.php");
try {
    //selecciono las consultas activas
    $estado_consulta = "activa";
    $sql = "
    SELECT id_consulta,
    contenido_consulta,	
    nombre_usuario,
    email_usuario,	
    fecha_consulta,
    estado
    FROM 
    consultas_usuarios
    WHERE estado = :estado_consulta
    ";
    // Preparar la declaración
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':estado_consulta', $estado_consulta, PDO::PARAM_STR);
    // Ejecutar la consulta
    $stmt->execute();
    // Obtener todos los resultados
    $consultas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Retornar los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($consultas);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
