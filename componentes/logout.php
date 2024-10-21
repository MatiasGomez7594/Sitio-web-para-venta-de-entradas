<!-- pagina-inicial.php -->
<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../inicio.php");
    exit;
}

echo "Bienvenido, " . $_SESSION['nombre_usuario'];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Inicial</title>
</head>
<body>
    <h1>Página Inicial</h1>
    <p>Has iniciado sesión correctamente.</p>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>
