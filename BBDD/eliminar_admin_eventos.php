<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/../componentes/conexion.php'); 
require_once(__DIR__ . '/../includes/permisos.php');




if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_usuario = $_POST['id_usuario_eliminar'] ?? null;

    
    
    // Verificar si el usuario tiene permiso para eliminar administradores de eventos
    if (tienePermiso('eliminar_admi_eventos')){     
        try {
            // Inicia la trans
            $conn->beginTransaction();

            // Elimina al usuario de la tabla roles_usuarios
            $query_eliminar_rol = "DELETE FROM roles_usuarios WHERE id_usuario = :id_usuario";
            $stmt_eliminar_rol = $conn->prepare($query_eliminar_rol);
            $stmt_eliminar_rol->bindParam(':id_usuario', $id_usuario);
            $stmt_eliminar_rol->execute();

            // Elimina al usuario de la tabla usuarios
            $query_eliminar_usuario = "DELETE FROM usuarios WHERE id_usuario = :id_usuario";
            $stmt_eliminar_usuario = $conn->prepare($query_eliminar_usuario);
            $stmt_eliminar_usuario->bindParam(':id_usuario', $id_usuario);
            $stmt_eliminar_usuario->execute();

            // Confirma la transac
            $conn->commit();
            header("Location: ver-administradores.php");  
            exit;

            echo "<div class='alert alert-success'>Administrador de eventos eliminado exitosamente.</div>";
        } catch (Exception $e) {
            // Revierte la transaccion en caso de error
            $conn->rollBack();
            echo "<div class='alert alert-danger'>Error al eliminar el administrador de eventos: " . $e->getMessage() . "</div>";
        }
    } else {
        echo "<div class='alert alert-warning'>No tienes permiso para realizar esta acción.</div>";
    }
}
?>
