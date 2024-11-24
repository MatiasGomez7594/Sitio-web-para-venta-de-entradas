<?php
include '../componentes/conexion.php';
header('Content-Type: application/json');

$id_evento = $_POST['id_evento'] ?? NULL;
$id_categoria = $_POST['categoria'] ?? NULL;
$nombre_evento = $_POST['nombreEvento'] ?? NULL;
$recinto = $_POST['recinto'] ?? NULL;
$evento_mayores = $_POST['eventoMayores'] ?? NULL;
$evento_discapacitados = $_POST['eventoDiscapacitados'] ?? NULL;
$fecha_inicio = $_POST['fechaInicio'] ?? NULL;
$fecha_fin = $_POST['fechaFin'] ?? NULL;
$direccion = $_POST['direccion'] ?? NULL;
$ciudad = $_POST['ciudades'] ?? NULL;
$provincia = $_POST['provincias'] ?? NULL;
$total_localidades = $_POST['totalLocalidades'] ?? NULL;
$entradas = $_POST['entradas'] ?? NULL;

try {
    $conn->beginTransaction();

    // Borrar entradas no numeradas
    $buscar_entradas_no_numeradas = $conn->prepare("UPDATE tipos_entradas_evento 
    SET estado = 'inactivo'
        WHERE id_evento = :id_evento ");
    $buscar_entradas_no_numeradas->execute([':id_evento' => $id_evento]);

    // Eliminar entradas numeradas disponibles
    $buscar_entradas_numeradas = $conn->prepare("SELECT id_tipo_x_evento FROM tipos_entradas_evento 
        WHERE id_evento = :id_evento AND estan_numeradas = 'si'");
    $buscar_entradas_numeradas->execute([':id_evento' => $id_evento]);
    $resultados = $buscar_entradas_numeradas->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($resultados as $fila) {
        $stmt = $conn->prepare("DELETE FROM entradas_numeradas 
            WHERE id_tipo_entrada = :id_tipo_entrada AND estado = :estado");
        $stmt->execute([
            ':id_tipo_entrada' => $fila['id_tipo_x_evento'],
            ':estado' => "disponible",
        ]);
    }



    // Actualizar evento
    $sql = "UPDATE eventos SET 
        id_categoria_evento = :id_categoria,
        nombre_evento = :nombre_evento, 
        nombre_recinto = :recinto,
        evento_mayores = :evento_mayores,
        evento_discapacitados = :evento_discapacitados,
        fecha_inicio = :fecha_inicio,
        fecha_fin = :fecha_fin,
        id_provincia = :provincia,
        id_ciudad = :ciudad,
        direccion = :direccion,
        total_localidades = :total_localidades 
        WHERE id_evento = :id_evento";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':id_categoria' => $id_categoria,
        ':nombre_evento' => $nombre_evento,
        ':recinto' => $recinto,
        ':evento_mayores' => $evento_mayores,
        ':evento_discapacitados' => $evento_discapacitados,
        ':fecha_inicio' => $fecha_inicio,
        ':fecha_fin' => $fecha_fin,
        ':provincia' => $provincia,
        ':ciudad' => $ciudad,
        ':direccion' => $direccion,
        ':total_localidades' => $total_localidades,
        ':id_evento' => $id_evento
    ]);
      // Verifica si hay archivos de imagen y guárdalos
      $uploadDirectory = __DIR__ . '/../imgs/';
      $uploadedFiles = [];
      
      foreach (['flyerEvento' => 'flyer', 'mapaUbicaciones' => 'mapaUbicaciones'] as $imgKey => $imgName) {
          if (!empty($_FILES[$imgKey]['tmp_name'])) {
              $originalName = basename($_FILES[$imgKey]['name']); // Nombre original del archivo
              $filePath = $uploadDirectory . $originalName; // Ruta completa del archivo recibido
      
              if (move_uploaded_file($_FILES[$imgKey]['tmp_name'], $filePath)) {
                  $uploadedFiles[] = [
                      'name' => $imgName, // Nombre estático: flyer o mapaUbicaciones
                      'path' => 'imgs/' . $originalName, // Ruta que proviene del archivo recibido
                  ];
              }
          }
      }

    $stmt = $conn->prepare("UPDATE imgs_eventos SET url_img = :ruta WHERE id_evento = :id_evento");
    foreach ($uploadedFiles as $file) {
        $stmt->execute([
            ':ruta' => $file['path'],
            ':id_evento' => $id_evento,
        ]);

    }

    // Inserción de nuevos tipos de entradas
    if ($entradas) {
        $entries = json_decode($entradas, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Error en el formato JSON: " . json_last_error_msg());
        }
        
        $stmt = $conn->prepare("INSERT INTO tipos_entradas_evento (id_tipo_entrada, id_evento, precio, cantidad_por_tipo, estan_numeradas) 
            VALUES (:tipo_entrada, :id_evento, :precio, :cantidad, :opcion_seleccionada)");

        foreach ($entries as $entry) {
            $tipoEntrada = $entry['valoresInputs'][0];
            $cantidad = (int)$entry['valoresInputs'][1];
            $precio = (int)$entry['valoresInputs'][2];
            $opcionSeleccionada = $entry['opcionSeleccionada'];

            $stmt->execute([
                ':tipo_entrada' => $tipoEntrada,
                ':id_evento' => $id_evento,
                ':precio' => $precio,
                ':cantidad' => $cantidad,
                ':opcion_seleccionada' => $opcionSeleccionada
            ]);

            // Crear entradas numeradas si se requiere
            if ($opcionSeleccionada === 'si') {
                $id_tipo_x_evento = $conn->lastInsertId();  // Obtener el último id insertado

                for ($i = 1; $i <= $cantidad; $i++) {
                    $stmt_entradas_numeradas = $conn->prepare("INSERT INTO entradas_numeradas (numeracion_entrada, id_tipo_entrada, estado) 
                        VALUES (:numeracion_entrada, :id_tipo_entrada, :estado)");
                    $stmt_entradas_numeradas->execute([
                        ':numeracion_entrada' => $i,
                        ':id_tipo_entrada' => $id_tipo_x_evento,
                        ':estado' => "disponible"
                    ]);
                }
            }
        }
    }

    $conn->commit();
    echo json_encode(['success' => true, 'message' => 'El evento fue editado con éxito', 'id_evento' => $id_evento]);

} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
