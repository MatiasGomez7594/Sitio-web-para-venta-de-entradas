<!-- pagina-inicial.php -->
<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['id_usuario'])) {
    header("Location: ../inicio.php");
    exit;
}
session_start();
session_unset(); // Limpia todas las variables de sesión
session_destroy(); // Destruye la sesión
header("Location: ../inicio.php"); // Redirige al formulario de inicio de sesión
exit();

?>

