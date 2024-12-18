<?php
header('Content-Type: application/json');
require('../componentes/conexion.php');
try {
    // Recoger datos de texto del evento
    $id_admin = $_POST['id_admin_eventos'] ?? NULL;
    $id_categoria = $_POST['categoria'] ?? NULL;
    $nombre_evento = $_POST['nombreEvento'] ?? NULL;
    $recinto = $_POST['recinto'] ?? NULL;
    $evento_mayores = $_POST['eventoMayores'] ?? NULL;
    $evento_discapacitados = $_POST['eventoDiscapacitados'] ?? NULL;
    $fecha_inicio = $_POST['fechaInicio'] ?? NULL;
    $fecha_fin = $_POST['fechaFin'] ?? NULL;
    $provincia = $_POST['provincias'] ?? NULL;
    $ciudad = $_POST['ciudades'] ?? NULL;
    $direccion = $_POST['direccion'] ?? NULL;
    $total_localidades = $_POST['totalLocalidades'] ?? NULL;
    // Obtener las entradas desde el JSON
    $entradas = $_POST['entradas'] ?? NULL;
    //Insertar datos del evento en la base de datos
    $stmt = $conn->prepare("INSERT INTO eventos (id_categoria_evento,
    nombre_evento, nombre_recinto,evento_mayores,evento_discapacitados,fecha_inicio,fecha_fin,
    id_provincia, id_ciudad,direccion,total_localidades, id_admin_evento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,?)");
    $stmt->execute([$id_categoria,$nombre_evento, $recinto,$evento_mayores,$evento_discapacitados,$fecha_inicio,$fecha_fin, 
    $provincia,$ciudad,$direccion, $total_localidades,$id_admin]);

    $stmt = $conn->prepare("SELECT id_evento FROM eventos WHERE id_admin_evento = $id_admin ORDER BY id_evento DESC LIMIT 1");
    $stmt->execute();  
      // Obtener el último ID
    $ultimoEvento = $stmt->fetchColumn();
      
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
      
      $stmt = $conn->prepare("INSERT INTO imgs_eventos (id_evento, nombre_img, url_img) VALUES (:id_evento, :nombre, :ruta)");
      foreach ($uploadedFiles as $file) {
          $stmt->execute([
              ':id_evento' => $ultimoEvento,
              ':nombre' => $file['name'], // Nombre estático: flyer o mapaUbicaciones
              ':ruta' => $file['path'],   // Ruta del archivo recibido
          ]);
      }
      
       
    if ($entradas) {
        // Decodificar el JSON a un array asociativo
        $entries = json_decode($entradas, true);
        // Verificar si hubo algún error al decodificar
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(["success" => false, "message" => "Error en el formato JSON: " . json_last_error_msg()]);
            exit;
        }
        // Preparar la declaración SQL
        $stmt = $conn->prepare("INSERT INTO tipos_entradas_evento ( id_tipo_entrada,id_evento,precio, cantidad_por_tipo, estan_numeradas) VALUES (:tipo_entrada,:id_evento,:precio, :cantidad, :opcion_seleccionada)");
        // Iterar sobre cada entrada y ejecutarla
        foreach ($entries as $entry) {
            // Extraer los datos
            $tipoEntrada = $entry['valoresInputs'][0]; // "General"
            $cantidad = (int)$entry['valoresInputs'][1]; // 100
            $precio = (int)$entry['valoresInputs'][2]; // 100
            $opcionSeleccionada = $entry['opcionSeleccionada']; // "no"

            // Ejecutar la consulta
            $stmt->execute([
                ':tipo_entrada' => $tipoEntrada,
                ':id_evento' =>$ultimoEvento,
                ':precio'=>$precio,
                ':cantidad' => $cantidad,
                ':opcion_seleccionada' => $opcionSeleccionada
            ]);
        }
        $buscar_entradas_numeradas = $conn->prepare("SELECT  id_tipo_x_evento,cantidad_por_tipo FROM tipos_entradas_evento 
        WHERE id_evento = $ultimoEvento AND estan_numeradas = 'si'");
        $buscar_entradas_numeradas->execute();
        $resultados = $buscar_entradas_numeradas->fetchAll(PDO::FETCH_ASSOC);
        foreach ($resultados as $fila) {
           for($i=1;$i<(int)$fila['cantidad_por_tipo']+1 ;$i++){
                $stmt = $conn->prepare("INSERT INTO entradas_numeradas( numeracion_entrada,id_tipo_entrada,estado) 
                VALUES (:numeracion_entrada,:id_tipo_entrada,:estado)");
                $stmt->execute([
                    ':numeracion_entrada' => $i,
                    ':id_tipo_entrada' =>$fila['id_tipo_x_evento'],
                    ':estado'=>"disponible",
                ]);
           }
       }
    echo json_encode(["success" => true, "message" => "Entradas almacenadas correctamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "No se proporcionaron entradas."]);
    }
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
