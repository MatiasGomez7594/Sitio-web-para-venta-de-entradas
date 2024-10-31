<?php
include '../componentes/conexion.php';
header('Content-Type: application/json');

if (isset($_POST['id_consulta'])) {
    try {
        $id_consulta = $_POST['id_consulta']; 
        $estado = 'respondida';

        // Iniciar la transacción
        $conn->beginTransaction();

        // Consulta de actualización
        $sql = "UPDATE consultas_usuarios SET estado = :estado WHERE id_consulta = :id_consulta";
        $stmt = $conn->prepare($sql);

        // Vincular los parámetros
        $stmt->bindParam(':estado', $estado, PDO::PARAM_STR);
        $stmt->bindParam(':id_consulta', $id_consulta, PDO::PARAM_INT);

        // Ejecutar la consulta
        $stmt->execute();

        // Comprobar si se actualizaron filas
        $response = [];
        if ($stmt->rowCount()) {
            $conn->commit(); // Hacer commit si se realizó la actualización
            $response = [
                'success' => true,
                'message' => 'Respuesta enviada con éxito.',
                'id_consulta' => $id_consulta,
                'estado' => $estado
            ];
        } else {
            $conn->rollBack(); // Revertir si no hubo cambios
            $response = [
                'success' => false,
                'message' => 'No se pudo enviar la respuesta. Verifica el ID.'
            ];
        }

    } catch (Exception $e) {
        // Revertir en caso de error
        $conn->rollBack();
        $response = [
            'success' => false,
            'message' => 'Error al enviar respuesta: ' . $e->getMessage()
        ];
    }

    // Retornar el resultado en formato JSON
    echo json_encode($response);

} else {
    echo json_encode(['success' => false, 'message' => 'ID no proporcionado.']);
}
