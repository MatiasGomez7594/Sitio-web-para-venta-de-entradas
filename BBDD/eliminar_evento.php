<?php
// archivo: eliminar_dato.php
include '../componentes/conexion.php';
header('Content-Type: application/json');
if (isset($_POST['id_evento'])) {

    // ID del evento a eliminar
    try{
        $id_evento = $_POST['id_evento']; 
        $conn->beginTransaction();
        // Eliminar entradas numeradas asociadas (si existen) 
        //a los tipos de entradas del evento
        $sql = "DELETE en FROM entradas_numeradas en
            INNER JOIN tipos_entradas_evento te ON en.id_tipo_entrada = te.id_tipo_x_evento
            WHERE te.id_evento = :id_evento AND en.estado = 'disponible'";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
        $stmt->execute();
        // Eliminar logicamente tipos de entradas del evento
        $sql = "UPDATE tipos_entradas_evento SET estado = 'inactivo' WHERE id_evento = :id_evento ";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
        $stmt->execute();
        // Eliminar imágenes del evento
        $sql = "DELETE FROM imgs_eventos WHERE id_evento = :id_evento";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
        $stmt->execute();
        // Eliminar el evento logicamente
        $sql = "UPDATE eventos SET estado = 'inactivo' WHERE id_evento = :id_evento";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_evento', $id_evento, PDO::PARAM_INT);
        $stmt->execute();
        // Confirmar la transacción
        $conn->commit();
        // Respuesta en caso de éxito
        $response = ['status' => 'success', 'message' => 'Evento eliminado correctamente'];
    } catch (Exception $e) {
    // Revertir en caso de error
        $conn->rollBack();
        $response = ['status' => 'error', 'message' => 'Error al eliminar el evento: ' . $e->getMessage()];
    }
    // Retornar el resultado en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo json_encode(['success' => false, 'message' => 'ID no proporcionado.']);
}
?>
