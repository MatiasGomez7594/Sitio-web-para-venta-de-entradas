<?php
// Conexión a la base de datos
require '../componentes/conexion.php';
try {
    // Preparación y ejecución de la consulta para obtener las preguntas frecuentes
    $stmt = $conn->prepare("SELECT id_pregunta, pregunta, contenido FROM preguntas_frecuentes WHERE estado = 'activa'");
    $stmt->execute();

    // Obtención de los resultados
    $preguntas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($preguntas);
} catch (PDOException $e) {
    // Manejo de errores
    echo json_encode(['error' => $e->getMessage()]);
}
?>