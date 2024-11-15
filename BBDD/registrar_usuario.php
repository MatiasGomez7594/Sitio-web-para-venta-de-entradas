<?php
header('Content-Type: application/json');

require('../componentes/conexion.php');

try {
    // Obtener los datos enviados por AJAX
    $nombre_usuario = $_POST['nombre_usuario'] ?? null;
    $email = $_POST['email'] ?? null;
    $contrasena = $_POST['contrasena'] ?? null;
    // Verificar si el email ya está registrado
    $buscar_usuario = $conn->prepare("SELECT email FROM usuarios WHERE email = :email");
    $buscar_usuario->bindParam(':email', $email);
    $buscar_usuario->execute();
    if ($buscar_usuario->fetch()) {
        echo json_encode(["status" => "email registrado","message" => "El email ya está registrado."]);
        exit;
    } else {
        $estado = 'activo';
        // Preparar e insertar los datos en la base de datos
        $contrasena = password_hash($contrasena,PASSWORD_DEFAULT);
        $registrar_usuario = $conn->prepare("INSERT INTO usuarios (nombre_usuario, email, contrasena, estado) VALUES (:nombre_usuario, :email, :contrasena, :estado)");
        $registrar_usuario->bindParam(':nombre_usuario', $nombre_usuario);
        $registrar_usuario->bindParam(':email', $email);
        $registrar_usuario->bindParam(':contrasena',$contrasena );
        $registrar_usuario->bindParam(':estado', $estado);
        $registrar_usuario->execute();
        // Obtener el último ID del usuario registrado
        $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $ultimoUsuario = $stmt->fetchColumn();
        if ($ultimoUsuario) {
            // Insertar el rol del usuario
            $id_rol = 1; // 3 = cliente
            $asignar_rol = $conn->prepare("INSERT INTO roles_usuarios(id_rol, id_usuario) VALUES (:id_rol, :id_usuario)");
            $asignar_rol->bindParam(':id_rol', $id_rol);
            $asignar_rol->bindParam(':id_usuario', $ultimoUsuario);
            $asignar_rol->execute();
            // Enviar respuesta JSON
            echo json_encode(["status" => "success","message" => "Usuario guardado con éxito"]);
        } else {
            echo json_encode(["status" => "error", "message" => "No se encontró el ID de usuario después del registro."]);
        }
    }

} catch (PDOException $e) {
    echo json_encode(['message' => 'Error al guardar el usuario: ' . $e->getMessage()]);
}
?>