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
    // Preparar e insertar los datos en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre_usuario, email, contrasena) VALUES (:nombre_usuario, :email, :contrasena)");
    $stmt->bindParam(':nombre_usuario', $nombre_usuario);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':contrasena', $contrasena);

    $stmt->execute();

    echo json_encode(['message' => 'Usuario guardado con éxito']);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error al guardar el usuario: ' . $e->getMessage()]);
}

?>