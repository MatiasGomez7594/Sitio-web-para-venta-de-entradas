<?php
include '../componentes/conexion.php';
if (isset($_GET['id_evento'])) {
    $idEvento = intval($_GET['id_evento']);
    $sql = "
        SELECT 
    e.id_evento,
    e.nombre_evento,
    e.nombre_recinto,
    e.fecha_inicio,
    e.direccion,
    p.nombre AS provincia_nombre,
    c.nombre AS ciudad_nombre,
  (SELECT GROUP_CONCAT(CONCAT(nombre_img, ':', url_img) ORDER BY id_img SEPARATOR ', ') 
    FROM imgs_eventos i
    WHERE i.id_evento = :id_evento
    LIMIT 2) AS imagenes,
    GROUP_CONCAT(
        JSON_OBJECT(
            'id_tipo_x_evento', te.id_tipo_x_evento,
            'precio', te.precio,
            'cantidad_por_tipo', te.cantidad_por_tipo,
            'estan_numeradas', te.estan_numeradas,
            'nombre_tipo', t.nombre_tipo,
            'numeraciones', (
                SELECT GROUP_CONCAT(numeracion_entrada ORDER BY numeracion_entrada ASC)
                FROM entradas_numeradas en
                WHERE en.id_tipo_entrada = te.id_tipo_x_evento AND en.estado = 'disponible'
            )
        ) ORDER BY te.id_tipo_x_evento ASC
    ) AS tipos_entradas
FROM eventos e
LEFT JOIN provincias p ON e.id_provincia = p.id_provincia
LEFT JOIN ciudades c ON e.id_ciudad = c.id_ciudad
LEFT JOIN tipos_entradas_evento te ON e.id_evento = te.id_evento AND te.estado = 'activo'
LEFT JOIN tipos_entradas t ON te.id_tipo_entrada = t.id_tipo
WHERE e.id_evento = :id_evento
GROUP BY e.id_evento, e.nombre_evento, e.nombre_recinto, 
         e.fecha_inicio, e.direccion, provincia_nombre, ciudad_nombre;

    ";

    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute(['id_evento' => $idEvento]);
        $evento = $stmt->fetch(PDO::FETCH_ASSOC);

        // Decodificar las entradas numeradas para poder manipularlas en JS
        if ($evento && $evento['tipos_entradas']) {
            $evento['tipos_entradas'] = json_decode('[' . $evento['tipos_entradas'] . ']');
        }
        header('Content-Type: application/json');
        echo json_encode($evento);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error al realizar la consulta: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'No se proporcionó un ID de evento válido']);
}

?>


