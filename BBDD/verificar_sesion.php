<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/../componentes/conexion.php');

header('Content-Type: application/json');

$response = [
    "enSesion" => false,
    "rolUsuario" => null,
    "idUsuario" => null
];

// Verificar si existe una sesión activa
if (isset($_SESSION['id_usuario']) && isset($_SESSION['rol_usuario'])) {
    $response['enSesion'] = true;
    $response['rolUsuario'] = $_SESSION['rol_usuario'];
    $response['idUsuario'] = $_SESSION['id_usuario'];
}

// Devolver el resultado en formato JSON
echo json_encode($response);
exit;
?>
