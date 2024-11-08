<?php
session_start();
require 'conexion.php';

// Verifica si el usuario está logueado y tiene un ID de usuario
if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.php");
    exit;
}

// Manejo del cambio de contraseña
$mensaje = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_usuario = $_SESSION['id_usuario'];
    $contrasena_actual = $_POST['contrasena_actual'];
    $nueva_contrasena = $_POST['nueva_contrasena'];
    $confirmar_contrasena = $_POST['confirmar_contrasena'];

    if ($nueva_contrasena === $confirmar_contrasena) {
        // Verifica la contraseña actual
        $consulta = $conn->prepare("SELECT contrasena FROM usuarios WHERE id_usuario = :id_usuario");
        $consulta->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);
        $consulta->execute();
        $usuario = $consulta->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($contrasena_actual, $usuario['contrasena'])) {
            // Hash de la nueva contraseña y actualización
            $nueva_contrasena_hash = password_hash($nueva_contrasena, PASSWORD_DEFAULT);
            $actualizar = $conn->prepare("UPDATE usuarios SET contrasena = :nueva_contrasena WHERE id_usuario = :id_usuario");
            $actualizar->bindParam(":nueva_contrasena", $nueva_contrasena_hash);
            $actualizar->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);

            if ($actualizar->execute()) {
                $mensaje = "<div class='alert alert-success'>Contraseña actualizada exitosamente.</div>";
            } else {
                $mensaje = "<div class='alert alert-danger'>Error al actualizar la contraseña. Inténtelo de nuevo.</div>";
            }
        } else {
            $mensaje = "<div class='alert alert-danger'>La contraseña actual es incorrecta.</div>";
        }
    } else {
        $mensaje = "<div class='alert alert-danger'>Las nuevas contraseñas no coinciden.</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cambiar Contraseña</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>     
</head>
<body>
<?php require_once("nav-cliente.php")?>
<div class="container pt-5 ">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2 class="text-center m-4">Cambiar Contraseña</h2>
            <?= $mensaje ?>
            <form action="cambiar-contraseña.php" method="POST">
                <div class="form-group">
                    <label for="contrasena_actual">Contraseña Actual</label>
                    <input type="password" class="form-control" id="contrasena_actual" name="contrasena_actual" required>
                </div>
                <div class="form-group">
                    <label for="nueva_contrasena">Nueva Contraseña</label>
                    <input type="password" class="form-control" id="nueva_contrasena" name="nueva_contrasena" required>
                </div>
                <div class="form-group">
                    <label for="confirmar_contrasena">Confirmar Nueva Contraseña</label>
                    <input type="password" class="form-control" id="confirmar_contrasena" name="confirmar_contrasena" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Actualizar Contraseña</button>
            </form>
        </div>
    </div>
</div>


</body>
</html>

