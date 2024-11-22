<?php 
session_start();
require "../componentes/conexion.php";
header('Content-Type: application/json');
if (!isset($_SESSION['id_usuario'])) {
    
    exit;
}


$id_usuario=$_SESSION['id_usuario'];

$action = $_POST['action'] ?? null;

switch ($action) {
    


    case 'add': 
        $nombreTerror = $apellidoTerror = $numeroTarjetaerror = $emisiondateerror = $vencimientodateerror = $ccverror = $tipotarjetaerror = "";
        $formValid = true;
        $nombreTitular = $_POST['nombreTitular'];
        $apellidoTitular = $_POST['apellidoTitular'];
        $numeroTarjeta = $_POST['numeroTarjeta'];
        $emisiondate = $_POST['emisiondate'];
        $vencimientodate = $_POST['vencimientodate'];
        $ccv = $_POST['ccv'];
        $tipoTarjeta = $_POST['tipoTarjeta'];
    
        // Validación de nombre
        if (empty($nombreTitular)) {
            $nombreTerror = "El nombre del titular es obligatorio.";
            $formValid = false;
        } else if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/", $nombreTitular)) {
            $nombreTerror = "Ingrese un nombre válido.";
            $formValid = false;
        }
    
        // Validación de apellido
        if (empty($apellidoTitular)) {
            $apellidoTerror = "El apellido del titular es obligatorio.";
            $formValid = false;
        } else if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/", $apellidoTitular)) {
            $apellidoTerror = "Ingrese un apellido válido.";
            $formValid = false;
        }
    
        // Validación de número de tarjeta
        if (empty($numeroTarjeta)) {
            $numeroTarjetaerror = "El número de la tarjeta es obligatorio.";
            $formValid = false;
        } else if (!preg_match("/^\d{16}$/", $numeroTarjeta)) {
            $numeroTarjetaerror = "El número de tarjeta debe contener 16 dígitos.";
            $formValid = false;
        }
    
        // Validación de fecha de emisión
        if (empty($emisiondate)) {
            $emisiondateerror = "La fecha de emisión de la tarjeta es obligatoria.";
            $formValid = false;
        } elseif (!preg_match("/^(0[1-9]|1[0-2])\/\d{2}$/", $emisiondate)) {
            $emisiondateerror = "Formato de fecha de emisión incorrecto. Usa MM/AA.";
            $formValid = false;
        }
    
        // Validación de fecha de vencimiento
        if (empty($vencimientodate)) {
            $vencimientodateerror = "La fecha de vencimiento de la tarjeta es obligatoria.";
            $formValid = false;
        } elseif (!preg_match("/^(0[1-9]|1[0-2])\/\d{2}$/", $vencimientodate)) {
            $vencimientodateerror = "Formato de fecha de vencimiento incorrecto. Usa MM/AA.";
            $formValid = false;
        }
    
        // Validación de CVV
        if (empty($ccv)) {
            $ccverror = "El código de seguridad (CCV) es obligatorio.";
            $formValid = false;
        } elseif (!preg_match("/^\d{3}$/", $ccv)) {
            $ccverror = "El CCV debe contener 3 dígitos.";
            $formValid = false;
        }
    
        // Validación de tipo de tarjeta
        if (empty($tipoTarjeta)) {
            $tipotarjetaerror = "Debe seleccionar un tipo de tarjeta.";
            $formValid = false;
        }
    
        // Si la validación falla, devolver los errores
        if (!$formValid) {
            echo json_encode([
                'success' => false,
                'errors' => [
                    'nombreTitular' => $nombreTerror,
                    'apellidoTitular' => $apellidoTerror,
                    'numeroTarjeta' => $numeroTarjetaerror,
                    'emisiondate' => $emisiondateerror,
                    'vencimientodate' => $vencimientodateerror,
                    'ccv' => $ccverror,
                    'tipoTarjeta' => $tipotarjetaerror,
                ]
            ]);
            exit;
        }
    
        $ccvHasheado = password_hash($ccv, PASSWORD_BCRYPT);
        $sql = "INSERT INTO tarjetas ( id_usuario ,nombre_titular, apellido_titular, numero_tarjeta, fecha_expiracion,fecha_emision,codigo_seguridad, tipo_tarjeta)
        VALUES ( :id_usuario, :nombreTitular, :apellidoTitular, :numeroTarjeta, :vencimientodate,:emisiondate,:ccv, :tipoTarjeta) " ;
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->bindParam(':nombreTitular', $nombreTitular);
            $stmt->bindParam(':apellidoTitular', $apellidoTitular);
            $stmt->bindParam(':numeroTarjeta', $numeroTarjeta);
            $stmt->bindParam(':vencimientodate', $vencimientodate);
            $stmt->bindParam(':emisiondate', $emisiondate);
            $stmt->bindParam(':ccv', $ccvHasheado);
            $stmt->bindParam(':tipoTarjeta', $tipoTarjeta);
            $stmt->execute();
             echo json_encode(['success' => true]);
    

        break;

    case 'delete':
        $idTarjeta = $_POST['id_tarjeta'];
        $sql = "DELETE FROM tarjetas  WHERE id_tarjeta = :id_tarjeta";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_tarjeta', $idTarjeta, PDO::PARAM_INT);
        $stmt->execute();
        echo json_encode(['success' => 'Tarjeta eliminada correctamente']);
        break;

   case 'edit':
   $nombreTerror= $apellidoTerror = $numeroTarjetaerror =  $vencimientodateerror = $tipotarjetaerror = "";
    $formValid = true;
    $idTarjeta = $_POST['id_tarjeta'];
    $nombreTitular = $_POST['nombreTitular_E'];
    $apellidoTitular = $_POST['apellidoTitular_E'];
    $numeroTarjeta = $_POST['numeroTarjeta_E'];
    $vencimientodate = $_POST['fechaExpiracion_E'];
    $tipoTarjeta = $_POST['tipoTarjeta_E'];
   
      // Validación de nombre
      if (empty($nombreTitular)) {
        $nombreTerror = "El nombre del titular es obligatorio.";
        $formValid = false;
    } else if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/", $nombreTitular)) {
        $nombreTerror = "Ingrese un nombre válido.";
        $formValid = false;
    }

    // Validación de apellido
    if (empty($apellidoTitular)) {
        $apellidoTerror = "El apellido del titular es obligatorio.";
        $formValid = false;
    } else if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/", $apellidoTitular)) {
        $apellidoTerror = "Ingrese un apellido válido.";
        $formValid = false;
    }

    // Validación de número de tarjeta
    if (empty($numeroTarjeta)) {
        $numeroTarjetaerror = "El número de la tarjeta es obligatorio.";
        $formValid = false;
    } else if (!preg_match("/^\d{16}$/", $numeroTarjeta)) {
        $numeroTarjetaerror = "El número de tarjeta debe contener 16 dígitos.";
        $formValid = false;
    }
    if (empty($vencimientodate)) {
        $vencimientodateerror = "La fecha de vencimiento de la tarjeta es obligatoria.";
        $formValid = false;
    } elseif (!preg_match("/^(0[1-9]|1[0-2])\/\d{2}$/", $vencimientodate)) {
        $vencimientodateerror = "Formato de fecha de vencimiento incorrecto. Usa MM/AA.";
        $formValid = false;
    }
    if (empty($tipoTarjeta)) {
        $tipotarjetaerror = "Debe seleccionar un tipo de tarjeta.";
        $formValid = false;
    }

    if (!$formValid) {
        echo json_encode([
            'success' => false,
            'errors' => [
                'nombreTitular' => $nombreTerror,
                'apellidoTitular' => $apellidoTerror,
                'numeroTarjeta' => $numeroTarjetaerror,
                'vencimientodate' => $vencimientodateerror,
                'tipoTarjeta' => $tipotarjetaerror,
            ]
        ]);
        exit;
    }



    
    $sql = "UPDATE tarjetas SET nombre_titular = :nombreTitular, apellido_titular = :apellidoTitular, 
            numero_tarjeta = :numeroTarjeta, fecha_expiracion = :vencimientodate, tipo_tarjeta = :tipoTarjeta 
            WHERE id_tarjeta = :idTarjeta";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nombreTitular', $nombreTitular);
    $stmt->bindParam(':apellidoTitular', $apellidoTitular);
    $stmt->bindParam(':numeroTarjeta', $numeroTarjeta);
    $stmt->bindParam(':vencimientodate', $vencimientodate);
    $stmt->bindParam(':tipoTarjeta', $tipoTarjeta);
    $stmt->bindParam(':idTarjeta', $idTarjeta, PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode(['success' => true]);

          break;

        default:
        echo json_encode(['error' => 'Acción no válida']);
        break;




    }