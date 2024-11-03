<?php
require("../componentes/conexion.php");
header('Content-Type: application/json');

//Obtener todos los eventos activos 
try {
    $sql ="SELECT 
    e.id_evento,
    e.nombre_evento,
    e.nombre_recinto,
    e.fecha_inicio,
    e.direccion,
    e.total_localidades,
    p.nombre AS provincia_nombre,
    c.nombre AS ciudad_nombre,
    cat.nombre_categoria AS categoria,
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
        ) ORDER BY te.precio ASC  -- Ordena por precio para obtener el menor primero
    ) AS tipos_entradas,
    GROUP_CONCAT(
        JSON_OBJECT(
            'id_entrada', en.id_entrada,
            'numeracion_entrada', en.numeracion_entrada,
            'estado', en.estado
        ) ORDER BY en.id_entrada
    ) AS entradas_numeradas,
    MIN(te.precio) AS precio_minimo  -- Obtiene el precio mínimo
FROM eventos e
LEFT JOIN categorias_eventos cat ON e.id_categoria_evento = cat.id_categoria 
LEFT JOIN provincias p ON e.id_provincia = p.id_provincia
LEFT JOIN ciudades c ON e.id_ciudad = c.id_ciudad
LEFT JOIN tipos_entradas_evento te ON e.id_evento = te.id_evento
LEFT JOIN entradas_numeradas en ON te.id_tipo_x_evento = en.id_tipo_entrada
WHERE e.estado = 'activo'
GROUP BY e.id_evento, e.nombre_evento, e.nombre_recinto, 
e.fecha_inicio, e.direccion, categoria,provincia_nombre, ciudad_nombre
ORDER BY e.fecha_registro ASC;
";

    // Preparar la declaración
    $stmt = $conn->prepare($sql);
    // Ejecutar la consulta
    $stmt->execute();
    // Obtener todos los resultados
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Retornar los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($eventos);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}
