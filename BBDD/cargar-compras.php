<?php
session_start();
require '../componentes/conexion.php';

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

$user_id = $_SESSION['id_usuario'];

$query = "
    SELECT 
        c.id_compra, 
        DATE_FORMAT(c.fecha_compra, '%d/%m/%Y') AS fecha_compra, 
        c.metodo_pago, 
        c.email, 
        e.nombre_evento, 
        e.id_evento, 
        e.fecha_inicio, 
        GROUP_CONCAT(CONCAT(te.nombre_tipo, ' x ', ci.cantidad, ' (', tee.precio, ')') SEPARATOR '|') AS items,
        SUM(ci.cantidad * tee.precio) AS total_compra
    FROM compras c
    INNER JOIN compra_items ci ON c.id_compra = ci.id_compra
    INNER JOIN tipos_entradas_evento tee ON ci.id_tipo_entrada = tee.id_tipo_x_evento
    INNER JOIN tipos_entradas te ON tee.id_tipo_entrada = te.id_tipo
    INNER JOIN eventos e ON tee.id_evento = e.id_evento
    WHERE c.id_usuario = :user_id
    GROUP BY c.id_compra";

$stmt = $conn->prepare($query);
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
$stmt->execute();

$compras = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($compras);
