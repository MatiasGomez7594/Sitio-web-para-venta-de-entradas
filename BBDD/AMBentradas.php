<?php
require "/../conexion.php";
header('Content-Type: application/json');

// maneja la eliminacion , edicion y agregacion de los tipos de entrada 
$action = $_POST['action'] ?? null;

switch ($action) {
    


    case 'add': 
        $nombreentradaerror = $estadoentradaerror ="";
        $formValid = true;
        $nombreentrada = $_POST['nombreentrada'];
        $estadoentrada = $_POST['estadoentrada'];

        if (empty($nombreentrada)) {
            $nombreentradaerror = "El nombre del tipo de entrada  es obligatorio.";
            $formValid = false;
        } else if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/", $nombreentrada)) {
            $nombreentradaerror = "El nombre solo puede contener hasta 50 letras ";
            $formValid = false;
        }
        if (empty($estadoentrada)) {
            $estadoentradaerror = "Debe seleccionar un estado.";
            $formValid = false;
        }
        if (!$formValid) {
            echo json_encode([
                'success' => false,
                'errors' => [
                    'nombreentrada' => $nombreentradaerror,
                    'estadoentrada' => $estadoentradaerror,
                    
                ]
            ]);
            exit;
        }else {
            $sql = "INSERT INTO tipos_entradas (nombre_tipo ,estado)
            VALUES ( :nombreentrada, :estadoentrada ) " ;
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':nombreentrada', $nombreentrada);
                $stmt->bindParam(':estadoentrada', $estadoentrada);
                
                $stmt->execute();
                 echo json_encode(['success' => true]);
        

        }
    

        break;

           
        case 'delete': 
                    $identrada = $_POST['id_entrada'];
                    $sql = "DELETE FROM tipos_entradas WHERE id_tipo =:id_entrada";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':id_entrada', $identrada, PDO::PARAM_INT);
                    $stmt->execute();
                    echo json_encode(['success' => 'tipo entrada eliminada correctamente']);
                    break;



      case 'edit':
                        $id_entrada = $_POST['id_entrada'];
                        $nombreentrada = $_POST['nombre_entrada'];
                        $estadoentrada = $_POST['estado'];
                    
                        
                        $nombreentradaerror = $estadoentradaerror = "";
                        $formValid = true;
                    
                        if (empty($nombreentrada)) {
                            $nombreentradaerror = "El nombre del tipo de entrada  es obligatorio.";
                            $formValid = false;
                        } else if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/", $nombreentrada)) {
                            $nombrecategoriaerror = "El nombre solo puede contener hasta 50 letras.";
                            $formValid = false;
                        }
                    
                        if (empty($estadoentrada)) {
                            $estadoentradaerror = "Debe seleccionar un estado.";
                            $formValid = false;
                        }
                    
                        if (!$formValid) {
                            echo json_encode([
                                'success' => false,
                                'errors' => [
                                    'nombre_entrada' => $nombreentradaerror,
                                    'estado' => $estadoentradaerror
                                ]
                            ]);
                            exit;
                        } else {
                            $sql = "UPDATE tipos_entradas SET nombre_tipo = :nombreentrada, estado = :estadoentrada WHERE id_tipo = :id_entrada";
                            $stmt = $conn->prepare($sql);
                            $stmt->bindParam(':nombreentrada', $nombreentrada);
                            $stmt->bindParam(':estadoentrada', $estadoentrada);
                            $stmt->bindParam(':id_entrada', $id_entrada, PDO::PARAM_INT);
                            
                            $stmt->execute();
                            echo json_encode(['success' => true]);
                        }
                        break;
   
   
          default:
                     break;
   
   
   
  
 }
 $conn=null;