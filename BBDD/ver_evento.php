<?php
header('Content-Type: application/json');
$input = json_decode(file_get_contents("php://input"), true);
include '../componentes/conexion.php';

$id_evento = $input['id'] ?? null;
if ($id_evento) {
    // Conexión a la base de datos (supón que ya tienes la conexión en $conn)
    $sd = "SELECT 
    e.id_evento,
    e.nombre_evento,
    e.nombre_recinto,
    e.fecha_inicio,
    e.direccion,
    p.nombre AS provincia_nombre,
    c.nombre AS ciudad_nombre,
    (SELECT GROUP_CONCAT(url_img ORDER BY id_img SEPARATOR ', ')
     FROM imgs_eventos i
     WHERE i.id_evento = e.id_evento
     LIMIT 2) AS imagenes,
    GROUP_CONCAT(
        JSON_OBJECT(
            'id_tipo_x_evento', te.id_tipo_x_evento,
            'precio', te.precio,
            'cantidad_por_tipo', te.cantidad_por_tipo,
            'estan_numeradas', te.estan_numeradas,
            'nombre_tipo', t.nombre_tipo,
            'id_entrada', en.id_entrada

        ) ORDER BY en.id_entrada ASC
    ) AS tipos_entradas,
    COALESCE(
        GROUP_CONCAT(
            JSON_OBJECT(
                'id_entrada', en.id_entrada,
                'numeracion_entrada', en.numeracion_entrada,
                'id_tipo_entrada', en.id_tipo_entrada,
                'nombre_tipo', t.nombre_tipo
            ) ORDER BY en.id_entrada
        ), 
        ''  -- Valor predeterminado si no hay coincidencias
    ) AS entradas_numeradas
FROM eventos e
LEFT JOIN provincias p ON e.id_provincia = p.id_provincia
LEFT JOIN ciudades c ON e.id_ciudad = c.id_ciudad
LEFT JOIN tipos_entradas_evento te ON e.id_evento = te.id_evento AND te.estado ='activo'
LEFT JOIN tipos_entradas t ON te.id_tipo_entrada = t.id_tipo
LEFT JOIN entradas_numeradas en ON te.id_tipo_x_evento = en.id_tipo_entrada AND en.estado = 'disponible'
WHERE e.id_evento = :id
GROUP BY e.id_evento, e.nombre_evento, e.nombre_recinto, 
         e.fecha_inicio, e.direccion, provincia_nombre, ciudad_nombre;";

//------------------------------------------
    $s="SELECT 
    e.id_evento,
    e.nombre_evento,
    e.nombre_recinto,
    e.fecha_inicio,
    e.direccion,
    p.nombre AS provincia_nombre,
    c.nombre AS ciudad_nombre,
    (SELECT GROUP_CONCAT(url_img ORDER BY id_img SEPARATOR ', ')
     FROM imgs_eventos i
     WHERE i.id_evento = e.id_evento
     LIMIT 2) AS imagenes,
    GROUP_CONCAT(
        JSON_OBJECT(
            'id_tipo_x_evento', te.id_tipo_x_evento,
            'precio', te.precio,
            'cantidad_por_tipo', te.cantidad_por_tipo,
            'estan_numeradas', te.estan_numeradas,
            'nombre_tipo', t.nombre_tipo,
            'id_entrada', en.id_entrada,
            'numeracion_entrada', en.numeracion_entrada
        ) ORDER BY en.id_entrada ASC
    ) AS tipos_entradas
FROM eventos e
LEFT JOIN provincias p ON e.id_provincia = p.id_provincia
LEFT JOIN ciudades c ON e.id_ciudad = c.id_ciudad
LEFT JOIN tipos_entradas_evento te ON e.id_evento = te.id_evento AND te.estado ='activo'
LEFT JOIN tipos_entradas t ON te.id_tipo_entrada = t.id_tipo
LEFT JOIN entradas_numeradas en ON te.id_tipo_x_evento = en.id_tipo_entrada AND en.estado = 'disponible'
WHERE e.id_evento = :id
GROUP BY e.id_evento, e.nombre_evento, e.nombre_recinto, 
         e.fecha_inicio, e.direccion, provincia_nombre, ciudad_nombre;";
    $stmt = $conn->prepare($s);
    $stmt->bindParam(':id', $id_evento, PDO::PARAM_INT);
    $stmt->execute();
    $evento = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($evento) {
        echo json_encode($evento);
    } else {
        echo json_encode(['error' => 'Evento no encontrado']);
    }
} else {
    echo json_encode(['error' => 'Faltan parámetros']);
}
?>
