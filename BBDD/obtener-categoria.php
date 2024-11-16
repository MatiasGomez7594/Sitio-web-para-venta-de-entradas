<?php
include "../componentes/conexion.php";

// devuelve la info de la categoria que se selecciono para editar 
$id_categoria = $_GET['id'] ?? null;

if ($id_categoria) {
    $sql = "SELECT id_categoria, nombre_categoria, estado FROM categorias_eventos WHERE id_categoria = :id_categoria";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_categoria', $id_categoria, PDO::PARAM_INT);
    $stmt->execute();

    $categoria = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($categoria) {
        echo json_encode($categoria);
    } else {
        echo json_encode(['error' => 'Categoría no encontrada']);
    }
} else {
    echo json_encode(['error' => 'ID de categoría no proporcionado']);
}







$conn=null;




?>