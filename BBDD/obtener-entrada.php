<?php
include "../componentes/conexion.php";

// devuelve la info de la entrada que se selecciono para editar 
$id_entrada = $_GET['id'] ?? null;

if ($id_entrada) {
    $sql = "SELECT id_tipo, nombre_tipo, estado FROM tipos_entradas WHERE id_tipo = :id_entrada";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_entrada', $id_entrada, PDO::PARAM_INT);
    $stmt->execute();

    $entrada = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($entrada) {
        echo json_encode($entrada);
    } else {
        echo json_encode(['error' => 'entrada no encontrada']);
    }
} else {
    echo json_encode(['error' => 'ID de la entrada no proporcionado']);
}







$conn=null;

