<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/conexion.php'); 
require_once(__DIR__ . '/../includes/permisos.php');


if (isset($_SESSION['id_usuario'])){
  $id_usuario = $_SESSION['id_usuario'];

// Verifica que el usuario tenga sesión activa 
// Consulta para obtener administradores de eventos
$query = "SELECT u.id_usuario, u.nombre_usuario, u.email, u.estado 
          FROM usuarios u
          JOIN roles_usuarios ru ON u.id_usuario = ru.id_usuario
          JOIN roles r ON ru.id_rol = r.id_rol
          WHERE r.nombre = 'administrador de eventos';";


 $stmt = $conn->prepare($query);
 $stmt->execute();
 $administradores = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

 $puedeCrearAdmin = false;
 $puedeEliminarAdmi = false;

 $permisos = Permisos::getPermisos($id_usuario);
 $permisosNombres = array_column($permisos, 'nombre'); // Solo obtenemos los nombres de los permisos
 $_SESSION['permisos'] = $permisos;
 // Verificamos si el usuario tiene un permiso especifico
 
 /*function tienePermiso($permiso) {
     global $permisosNombres;
     return in_array($permiso, $permisosNombres);
 }*/

 $permisosRequeridos = ['ver_administradores_eventos', 'ver_tipo_entradas', 'ver_preguntas_frecuentes', 'generar_reporte_de_ventas','crear_admi_eventos','eliminar_admi_eventos' ];

 // 
 if (in_array('crear_admi_eventos', $permisosNombres)) {
     $puedeCrearAdmin = true;
 }
 if (in_array('eliminar_admi_eventos', $permisosNombres)) {
       $puedeEliminarAdmi = true;
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['estado'], $_POST['id_usuario'])) {
        $nuevo_estado = $_POST['estado'];
        $id_usuario = $_POST['id_usuario'];  //recibe el ID de usuario desde el formulario
    
        // Consulta para actualizar el estado
        $updateQuery = "UPDATE usuarios SET estado = :estado WHERE id_usuario = :id_usuario";
        $stmtestado = $conn->prepare($updateQuery);
        $stmtestado->bindParam(':estado', $nuevo_estado, PDO::PARAM_INT);
        $stmtestado->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
        $stmtestado->execute();
    
        // Redirigir para evitar reenvío del formulario
        header('Location: ver-administradores.php');
       
    }
    
            
    
?>

<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script>  
    <script src="../scripts/ver_administradores_eventos.js" defer></script>  
    <title>Administradores de Eventos</title>
</head>
<body>
    <?php include_once("nav-sistemas.php");?>

    <div class="container mt-5">
        <h1 class="text-center mb-4">Listado de Administradores de Eventos</h1>
        
        <!-- Formulario para listar administradores -->
        <?php foreach ($administradores as $admin): ?>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">Administrador: <?php echo htmlspecialchars($admin['nombre_usuario']); ?></h5>
            <div class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">Nombre</label>
                    <input value="<?php echo htmlspecialchars($admin['nombre_usuario']); ?>" type="text" class="form-control" readonly>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Email</label>
                    <input value="<?php echo htmlspecialchars($admin['email']); ?>" type="email" class="form-control" readonly>
                </div>
                <div class="col-md-4">
                <form method="post" action="">
                    <label class="form-label">Estado</label>
                    <input type="hidden" name="id_usuario" value="<?php echo $admin['id_usuario']; ?>">
                    <select name="estado" class="form-select" onchange="this.form.submit()">
                        <option value="1" <?php echo $admin['estado'] ? 'selected' : ''; ?>>Activo</option>
                        <option value="0" <?php echo !$admin['estado'] ? 'selected' : ''; ?>>Inactivo</option>
                    </select>
                 </form>
                </div>
            </div>
            <div class="mt-3 d-flex justify-content-end">
            <?php if ($puedeEliminarAdmi): ?>
                <form action="../eliminar_admin_eventos.php" method="post" class="eliminar-form">
                    <input type="hidden" name="id_usuario_eliminar" value="<?php echo $admin['id_usuario']; ?>">
                    <button type="submit" class="btn btn-danger btn-sm" name="eliminar">Eliminar</button>
                </form>
                <?php endif; ?>
            </div>
        </div>
    </div>
<?php endforeach; ?>
        <!-- Boton para agregar nuevo administrador -->
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-success w-25 mb-3" id="btnNuevo">Agregar nuevo administrador</button>
        </div>
        <?php 
    $conn = null;
        ?>
</body>
</html>
