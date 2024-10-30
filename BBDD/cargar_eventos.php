<?php
// obtener_evento.php
// Conexión a la base de datos usando PDO
require("../componentes/conexion.php");
try {
    $id_admin = 3;
    $sql = "
    SELECT 
        e.id_evento,
        e.nombre_evento,
        e.nombre_recinto,
        e.evento_mayores,
        e.evento_discapacitados,
        e.fecha_inicio,
        e.fecha_fin,
        e.provincia,
        e.ciudad,
        e.direccion,
        e.total_localidades,
        e.fecha_registro,
        (SELECT GROUP_CONCAT(url_img ORDER BY id_img SEPARATOR ', ')
         FROM imgs_eventos i
         WHERE i.id_evento = e.id_evento
         LIMIT 2) AS imagenes,
        GROUP_CONCAT(
            JSON_OBJECT(
                'id_tipo_x_evento', te.id_tipo_x_evento,
                'precio', te.precio,
                'cantidad_por_tipo', te.cantidad_por_tipo,
                'estan_numeradas', te.estan_numeradas
            ) ORDER BY te.id_tipo_x_evento
        ) AS tipos_entradas,
        GROUP_CONCAT(
            JSON_OBJECT(
                'id_entrada', en.id_entrada,
                'numeracion_entrada', en.numeracion_entrada,
                'estado', en.estado
            ) ORDER BY en.id_entrada
        ) AS entradas_numeradas
    FROM eventos e
    LEFT JOIN tipos_entradas_evento te ON e.id_evento = te.id_evento
    LEFT JOIN entradas_numeradas en ON te.id_tipo_x_evento = en.id_tipo_entrada
    WHERE e.id_admin_evento = :id_admin_evento 
    GROUP BY e.id_evento;
    ";
    // Preparar la declaración
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_admin_evento', $id_admin, PDO::PARAM_INT);
    // Ejecutar la consulta
    $stmt->execute();
    // Obtener todos los resultados
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Procesar cada evento para decodificar JSON en los campos necesarios
    foreach ($eventos as &$evento) {
        $evento['tipos_entradas'] = json_decode("[" . $evento['tipos_entradas'] . "]");
        $evento['entradas_numeradas'] = json_decode("[" . $evento['entradas_numeradas'] . "]");
    }
    // Retornar los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($eventos);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
