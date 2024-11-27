<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/../componentes/conexion.php');
$email_registrado = '';
$admin_agregado ='';
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
            $email_registrado = '<div class="alert alert-danger" role="alert">El email ya se encuentra registrado</div> ';
        }else{
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
            //header("Location: ../componentes/ver-administradores.php");
            $admin_agregado = " <div class='row justify-content-center mt-4'>

            <div class='alert alert-success text-center'>Administrador creado con exito.</div> 
                </div> ";
        }

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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script></head>
    <script src="../scripts/crear-admin-eventos.js" defer></script>
<body>
    <div class="container mt-5">
        <h2 class="text-center">Agregar Nuevo Administrador de Eventos</h2>
        <form id="crearAdminForm" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="POST" class="row g-3 mt-4">
            <?php echo $email_registrado;?>
            <?php echo $admin_agregado;?>

            <div class="col-md-6">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required placeholder="Nombre Completo">
                <p id="nombreError" class="text-danger"></p>
            </div>
            <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" required placeholder="email@ejemplo.com">
                <p id="emailError" class="text-danger"></p>
            </div>
            <div class="col-md-6">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" name="password" required placeholder="Mínimo 8 caracteres">
                <p id="passwordError" class="text-danger"></p>
            </div>
            <div class="col-md-12 d-flex justify-content-evenly mt-4">
                <button type="submit" class="btn btn-primary w-25 ">Crear Administrador</button>
                <a class='btn btn-primary w-25 ml-1' role='button' href='../componentes/ver-administradores.php'>Volver</a>

            </div>
        </form>
    </div>
</body>
</html>
