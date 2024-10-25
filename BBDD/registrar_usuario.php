<?php
header('Content-Type: application/json');

require('../componentes/conexion.php');

try {
    // Obtener los datos enviados por AJAX
    $nombre_usuario = $_POST['nombre_usuario'] ?? null;
    $email = $_POST['email'] ?? null;
    $contrasena = $_POST['contrasena'] ?? null;



    /*
    nombre_usuario VARCHAR(100),
    apellido_usuario VARCHAR(100),
    genero VARCHAR(20),
    email VARCHAR(150),
    telefono VARCHAR(12),
    contrasena VARCHAR(25)
    */

    // Verificar si el email ya está registrado
    $buscar_usuario = $conn->prepare("SELECT email FROM usuarios WHERE email = :email");
    $buscar_usuario->bindParam(':email', $email);
    $buscar_usuario->execute();
    if ($buscar_usuario->fetch()) {
        echo json_encode(["status" => "email registrado","message" => "El email ya está registrado."]);
        exit;
    } else {
        // Preparar e insertar los datos en la base de datos
        $registrar_usuario = $conn->prepare("INSERT INTO usuarios (nombre_usuario, email, contrasena) VALUES (:nombre_usuario, :email, :contrasena)");
        $registrar_usuario->bindParam(':nombre_usuario', $nombre_usuario);
        $registrar_usuario->bindParam(':email', $email);
        $registrar_usuario->bindParam(':contrasena', $contrasena);
        $registrar_usuario->execute();

        echo json_encode(['message' => 'Usuario guardado con éxito']);

    }

} catch (PDOException $e) {
    echo json_encode(['message' => 'Error al guardar el usuario: ' . $e->getMessage()]);
}

?>