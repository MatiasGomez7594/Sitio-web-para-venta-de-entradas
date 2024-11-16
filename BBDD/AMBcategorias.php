<?php
require "../componentes/conexion.php";
header('Content-Type: application/json');

// maneja la eliminacion , edicion y agregacion de las categorias 
$action = $_POST['action'] ?? null;
switch ($action) {
    case 'add': 
        $nombrecategoriaerror = $estadocategoriaerror ="";
        $formValid = true;
        $nombrecategoria = $_POST['nombrecategoria'];
        $estadocategoria = $_POST['estadocategoria'];

        if (empty($nombrecategoria)) {
            $nombrecategoriaerror = "El nombre de la categoria es obligatorio.";
            $formValid = false;
        } else if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/", $nombrecategoria)) {
            $nombrecategoriaerror = "El nombre solo puede contener hasta 50 letras ";
            $formValid = false;
        }
        if (empty($estadocategoria)) {
            $estadocategoriaerror = "DEbe seleccionar un estado.";
            $formValid = false;
        }
        if (!$formValid) {
            echo json_encode([
                'success' => false,
                'errors' => [
                    'nombrecategoria' => $nombrecategoriaerror,
                    'estadocategoria' => $estadocategoriaerror,
                    
                ]
            ]);
            exit;
        }else {
            $sql = "INSERT INTO categorias_eventos (nombre_categoria ,estado)
            VALUES ( :nombrecategoria, :estadocategoria ) " ;
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':nombrecategoria', $nombrecategoria);
                $stmt->bindParam(':estadocategoria', $estadocategoria);
                
                $stmt->execute();
                 echo json_encode(['success' => true]);
        

        }
    

        break;

           
        case 'delete': 
                    $idcategoria = $_POST['id_categoria'];
                    $sql = "UPDATE categorias_eventos set estado ='inactiva' WHERE id_categoria =:id_categoria";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':id_categoria', $idcategoria, PDO::PARAM_INT);
                    $stmt->execute();
                    echo json_encode(['success' => 'categoria eliminada correctamente']);
                    break;



      case 'edit':
                        $id_categoria = $_POST['id_categoria'];
                        $nombrecategoria = $_POST['nombre_categoria'];
                        $estadocategoria = $_POST['estado'];
                    
                        // Validación de los datos (puedes agregar validaciones adicionales)
                        $nombrecategoriaerror = $estadocategoriaerror = "";
                        $formValid = true;
                    
                        if (empty($nombrecategoria)) {
                            $nombrecategoriaerror = "El nombre de la categoría es obligatorio.";
                            $formValid = false;
                        } else if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/", $nombrecategoria)) {
                            $nombrecategoriaerror = "El nombre solo puede contener hasta 50 letras.";
                            $formValid = false;
                        }
                    
                        if (empty($estadocategoria)) {
                            $estadocategoriaerror = "Debe seleccionar un estado.";
                            $formValid = false;
                        }
                    
                        if (!$formValid) {
                            echo json_encode([
                                'success' => false,
                                'errors' => [
                                    'nombre_categoria' => $nombrecategoriaerror,
                                    'estado' => $estadocategoriaerror
                                ]
                            ]);
                            exit;
                        } else {
                            $sql = "UPDATE categorias_eventos SET nombre_categoria = :nombrecategoria, estado = :estadocategoria WHERE id_categoria = :id_categoria";
                            $stmt = $conn->prepare($sql);
                            $stmt->bindParam(':nombrecategoria', $nombrecategoria);
                            $stmt->bindParam(':estadocategoria', $estadocategoria);
                            $stmt->bindParam(':id_categoria', $id_categoria, PDO::PARAM_INT);
                            
                            $stmt->execute();
                            echo json_encode(['success' => true]);
                        }
                        break;
   
   
          default:
   
   
   
   
 }