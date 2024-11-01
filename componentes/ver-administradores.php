<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/conexion.php'); 

// Verifica que el usuario tenga sesión activa 
if (isset($_SESSION['usuario_id'])){

// Consulta para obtener administradores de eventos
$query = "SELECT u.id_usuario, u.nombre_usuario, u.email, u.estado 
          FROM usuarios u
          JOIN roles_usuarios ru ON u.id_usuario = ru.id_usuario
          JOIN roles r ON ru.id_rol = r.id_rol
          WHERE r.nombre_rol = 'administrador de eventos';";


 // Preparar la declaración
 $stmt = $conn->prepare($query);
 // Ejecuta la consulta
 $stmt->execute();
 // Obtener todos los resultados
 $administradores = $stmt->fetchAll(PDO::FETCH_ASSOC);
}


/*if (isset($_POST['eliminar'])) {
    $adminId = $_POST['eliminar'];
    $deleteQuery = "DELETE FROM usuarios 
            WHERE id = (SELECT u.id 
            FROM usuarios u
            JOIN roles_usuarios ru ON u.id = ru.usuario_id
            WHERE ru.nombre_rol = 'administrador_evento' AND u.id = :id_usuario);
";
    $stmt = $conn->prepare($deleteQuery);
    $stmt->bind_param('i', $adminId);
    $stmt->execute();
    header("Location: " . $_SERVER['PHP_SELF']); // Recargar la página después de eliminar
    exit();
}*/

?>

<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script>  
    <script src="../scripts/script.js" defer></script>  
    <title>Administradores de Eventos</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100" style="z-index: 1;">
        <div class="container-fluid">
            <a class="navbar-brand" href="../inicio.html">MisEntradas.com</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link active dropdown-toggle" href="interfaz-admin-eventos.php" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mi cuenta</a>
                        <ul class="dropdown-menu bg-dark">
                            <li><a class="dropdown-item bg-dark text-light" href="interfaz-admin-sistemas.php">Mi cuenta</a></li>
                            <li><a class="dropdown-item bg-dark text-light" href="editar-datos.php">Datos personales</a></li>
                            <li><a class="dropdown-item bg-dark text-light" href="cambiar-contraseña.php">Cambiar contraseña</a></li>
                            <li><a href="ver-administradores.php" class="dropdown-item bg-dark text-light">Ver administradores</a></li>
                            <li><a href="ver-tipo-entradas.php" class="dropdown-item bg-dark text-light">Ver tipos de entradas</a></li>
                            <li><a href="ver-preguntas-frecuentes.php" class="dropdown-item bg-dark text-light">Ver preguntas frecuentes</a></li>
                            <li><a href="reporte-de-ventas.php" class="dropdown-item bg-dark text-light">Generar reporte de ventas</a></li>
                            <li><a class="dropdown-item bg-dark text-light" href="../inicio.php">Cerrar sesión</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-5">
        <h1 class="text-center mb-4">Listado de Administradores de Eventos</h1>
        
        <!-- Formulario para listar administradores -->
        <form id="formulario">
            <?php foreach ($administradores as $admin): ?>
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Administrador: <?php echo htmlspecialchars($admin['nombre_usuario']); ?></h5>
                        <div class="row g-3">
                            <div class="col-md-4">
                                <label for="nombre<?php echo $admin['id_usuario']; ?>" class="form-label">Nombre</label>
                                <input value="<?php echo htmlspecialchars($admin['nombre_usuario']); ?>" type="text" class="form-control" id="nombre<?php echo $admin['id_usuario']; ?>" readonly>
                            </div>
                            <div class="col-md-4">
                                <label for="email<?php echo $admin['id_usuario']; ?>" class="form-label">Email</label>
                                <input value="<?php echo htmlspecialchars($admin['email']); ?>" type="email" class="form-control" id="email<?php echo $admin['id_usuario']; ?>" readonly>
                            </div>
                            <div class="col-md-4">
                                <label for="estadoAdmin<?php echo $admin['id_usuario']; ?>" class="form-label">Estado</label>
                                <select class="form-select" id="estadoAdmin<?php echo $admin['id_usuario']; ?>">
                                    <option value="1" <?php echo $admin['estado'] ? 'selected' : ''; ?>>Activo</option>
                                    <option value="0" <?php echo !$admin['estado'] ? 'selected' : ''; ?>>Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-3 d-flex justify-content-end">
                            <button type="submit" class="btn btn-danger btn-sm me-2" name="eliminar" value="<?php echo $admin['id_usuario']; ?>">Eliminar</button>
                            <button type="button" class="btn btn-primary btn-sm">Guardar</button>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </form>

        <!-- Botón para agregar nuevo administrador -->
        <div class="d-flex justify-content-center">
            <button class="btn btn-success w-25 mb-3" id="btnNuevo">Agregar nuevo administrador</button>
        </div>

        <!-- Formulario para agregar nuevo administrador -->
        <div class="card mb-5 d-none" id="agregarNuevo">
            <div class="card-body">
                <h5 class="card-title">Agregar Nuevo Administrador</h5>
                <div class="row g-3">
                    <div class="col-md-4">
                        <label for="nombreNuevo" class="form-label">Nombre Completo</label>
                        <input required pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ]+( [A-Za-záéíóúÁÉÍÓÚñÑ]+)+$" type="text" class="form-control" id="nombreNuevo" placeholder="Nombre Completo">
                    </div>
                    <div class="col-md-4">
                        <label for="emailNuevo" class="form-label">Email</label>
                        <input required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" type="email" class="form-control" id="emailNuevo" placeholder="email@ejemplo.com">
                    </div>
                    <div class="col-md-4">
                        <label for="contrasena" class="form-label">Contraseña</label>
                        <input required pattern=".{4,}" type="password" class="form-control" id="contrasena" placeholder="4 caracteres mínimo">
                    </div>
                </div>
                <div class="mt-4 d-flex justify-content-end">
                    <button type="button" class="btn btn-primary w-25" id="btnAgregar">Agregar</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const btnNuevo = document.getElementById('btnNuevo');
        const agregarNuevo = document.getElementById('agregarNuevo');

        btnNuevo.addEventListener('click', () => {
            agregarNuevo.classList.toggle('d-none');
        });
    </script>
</body>
</html>
