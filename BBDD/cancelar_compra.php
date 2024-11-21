<?php
session_start();
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

require_once('../componentes/conexion.php');
$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);

// Verifica si el JSON se ha decodificado correctamente
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Error al decodificar JSON: ' . json_last_error_msg()]);
    exit;
}

// Ahora verifica si el id_compra está presente en los datos decodificados
if (isset($data['idcompra'])) {
    $id_compra = $data['idcompra'];
} else {
    echo json_encode(['error' => 'id_compra no recibido']);
    exit;
}

// Resto del código

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($id_compra)) {
    try {
        // Eliminar los ítems de la compra.
        $conn->beginTransaction();
        $query_items = "SELECT id_tipo_entrada, cantidad, numeracion_entrada 
                        FROM compra_items 
                        WHERE id_compra = :id_compra;";
        $stmt_items = $conn->prepare($query_items);
        $stmt_items->bindParam(':id_compra', $id_compra, PDO::PARAM_INT);
        $stmt_items->execute();
        $compra_items = $stmt_items->fetchAll(PDO::FETCH_ASSOC);

        foreach ($compra_items as $entrada) {
            // Actualizar el stock de las entradas.
            $sql_actualizar_stock = "UPDATE tipos_entradas_evento 
                                     SET cantidad_por_tipo = cantidad_por_tipo + :nuevo_stock 
                                     WHERE id_tipo_x_evento = :id_entrada";
            $stmt_actualizar_stock = $conn->prepare($sql_actualizar_stock);
            $stmt_actualizar_stock->execute([
                ':nuevo_stock' => $entrada['cantidad'],
                ':id_entrada' => $entrada['id_tipo_entrada']
            ]);
            // Actualizar el estado de entradas numeradas, si corresponde.
            if (!empty($entrada['numeracion_entrada']) && strtolower($entrada['numeracion_entrada']) !== '0') {
                $actualizar_entrada = "UPDATE entradas_numeradas 
                                       SET estado = :estado 
                                       WHERE id_tipo_entrada = :id_entrada 
                                       AND numeracion_entrada = :numeracion;";
                $stmt_actualizar_entrada = $conn->prepare($actualizar_entrada);
                $stmt_actualizar_entrada->execute([
                    ':id_entrada' => $entrada['id_tipo_entrada'],
                    ':numeracion' => $entrada['numeracion_entrada'],
                    ':estado' => 'disponible'
                ]);
            }
        }

        // Eliminar los ítems de la compra.
        $stmt_delete_items = $conn->prepare("DELETE FROM compra_items WHERE id_compra = :id_compra");
        $stmt_delete_items->bindParam(':id_compra', $id_compra, PDO::PARAM_INT);
        $stmt_delete_items->execute();

        // Eliminar la compra.
        $stmt_delete_compra = $conn->prepare("DELETE FROM compras WHERE id_compra = :id_compra");
        $stmt_delete_compra->bindParam(':id_compra', $id_compra, PDO::PARAM_INT);
        $stmt_delete_compra->execute();

        // Confirmar la transacción.
        $conn->commit();

        // Responder con éxito.
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        // Revertir la transacción en caso de error.
        if ($conn->inTransaction()) {
            $conn->rollBack();
        }
        echo json_encode(['success' => false, 'error' => 'Error al procesar la solicitud.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Solicitud inválida.']);
}
