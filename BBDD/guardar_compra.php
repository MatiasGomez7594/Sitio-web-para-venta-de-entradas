<?php
require_once('../componentes/conexion.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Decodificar el JSON recibido.
        $input = json_decode(file_get_contents('php://input'), true);

        $formData = $input['form'];
        $entradas = $input['entradas'];

        // Iniciar la transacción.
        $conn->beginTransaction();

        // Insertar los datos de la compra.
        $sql_compra = "INSERT INTO compras (id_usuario, nombre_comprador, email, dni, telefono, metodo_pago) 
        VALUES (:id_usuario, :nombre_comprador, :email, :dni, :telefono, :metodo_pago)";
        $stmt_compra = $conn->prepare($sql_compra);
        $result = $stmt_compra->execute([
        ':id_usuario' => $formData['id_usuario'],
        ':nombre_comprador' => $formData['nombre_comprador'],
        ':email' => $formData['email'],
        ':dni' => $formData['dni'],
        ':telefono' => $formData['telefono'],
        ':metodo_pago' => $formData['metodo_pago']
        ]);

        // Obtener el ID de la compra recién insertada.
        $id_compra = $conn->lastInsertId();

        // Insertar las entradas asociadas.
        $stmt_item = $conn->prepare("INSERT INTO compra_items (id_compra, id_tipo_entrada, cantidad) 
        VALUES (:id_compra, :id_tipo_entrada, :cantidad)");

        foreach ($entradas as $entrada) {
          $result_item = $stmt_item->execute([
            ':id_compra' => $id_compra,
            ':id_tipo_entrada' => $entrada['id'],
            ':cantidad' => $entrada['cantidad']
            ]);
            // Restar las entradas compradas del stock
            $sql_actualizar_stock = "UPDATE tipos_entradas_evento 
            SET cantidad_por_tipo = cantidad_por_tipo - :nuevo_stock 
            WHERE id_tipo_x_evento = :id_entrada";
            $stmt_actualizar_stock = $conn->prepare($sql_actualizar_stock);
            $result_stock_update = $stmt_actualizar_stock->execute([
            ':nuevo_stock' => $entrada['cantidad'],
            ':id_entrada' => $entrada['id'],
          ]);
          // Marcar como vendida la entrada si es numerada
          if($entrada['numeracion'] !== 'no numerada'){
            $actualizar_entrada = "UPDATE entradas_numeradas 
            SET estado = :estado WHERE 
             id_tipo_entrada = :id_entrada AND numeracion_entrada = :numeracion;";
            $stmt_actualizar_entrada = $conn->prepare($actualizar_entrada);
            $result_actualizado = $stmt_actualizar_entrada->execute([
            ':id_entrada' => $entrada['id'],
            ':numeracion' => $entrada['numeracion'],
            ':estado' => 'vendida'
              ]);
          }

        }
        $conn->commit();
        // Responder con éxito.
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        // Revertir la transacción en caso de error.
        if ($conn->inTransaction()) {
            $conn->rollBack();
        }
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
?>
