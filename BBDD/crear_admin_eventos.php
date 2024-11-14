<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/../componentes/conexion.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Hashea la contraseña
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    try {
        // Verificar si el email ya está registrado
        $buscar_usuario = $conn->prepare("SELECT email FROM usuarios WHERE email = :email");
        $buscar_usuario->bindParam(':email', $email);
        $buscar_usuario->execute();
        if ($buscar_usuario->fetch()) {
            echo "<div class='alert alert-danger'>El email ya se encuentra registrado</div> ";
            exit;
        }
        $conn->beginTransaction();

        // Inserta el usuario en la base de datos
        $query = "INSERT INTO usuarios (nombre_usuario, email, contrasena, estado) VALUES (:nombre, :email, :contrasena, 1)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':contrasena', $hashedPassword);
        $stmt->execute();

        // Obtiene el id del nuevo usuario
        $usuarioId = $conn->lastInsertId();

        // Asigna el rol de administrador de eventos
        $queryRol = "INSERT INTO roles_usuarios (id_usuario, id_rol) VALUES (:id_usuario, (SELECT id_rol FROM roles WHERE nombre = 'administrador de eventos'))";
        $stmtRol = $conn->prepare($queryRol);
        $stmtRol->bindParam(':id_usuario', $usuarioId);
        $stmtRol->execute();

        $conn->commit();

        // Redirige a la página de éxito
        header("Location: ../componentes/ver-administradores.php");
        echo "<div class='alert alert-success'>Administrador creado con exito.</div> " . $e->getMessage();
        exit();
    } catch (Exception $e) {
        $conn->rollBack();
        echo "Error al crear el administrador de eventos: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Crear Administrador de Eventos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2 class="text-center">Agregar Nuevo Administrador de Eventos</h2>
        <form action="crear_admin_eventos.php" method="post" class="row g-3 mt-4">
            <div class="col-md-6">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required placeholder="Nombre Completo">
            </div>
            <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" required placeholder="email@ejemplo.com">
            </div>
            <div class="col-md-6">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" name="password" required placeholder="Mínimo 4 caracteres">
            </div>
            <div class="col-md-12 d-flex justify-content-center mt-4">
                <button type="submit" class="btn btn-primary w-50">Crear Administrador</button>
            </div>
        </form>
    </div>
</body>
</html>
