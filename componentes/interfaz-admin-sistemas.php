<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/conexion.php');
require_once(__DIR__ . '/../includes/permisos.php');

// Verifica si el usuario ha iniciado sesion
if (!isset($_SESSION['id_usuario'])) {
    header('Location: ../inicio.php');
    exit;
}

// Obtiene el id del usuario desde la sesion
$id_usuario = $_SESSION['id_usuario'];

// Consultamos todos los permisos del usuario con la clase permisos
$permisos = Permisos::getPermisos($id_usuario);
$permisosNombres = array_column($permisos, 'nombre'); // Solo obtenemos los nombres de los permisos

// Verificamos si el usuario tiene un permiso especifico
function tienePermiso($permiso) {
    global $permisosNombres;
    return in_array($permiso, $permisosNombres);
}

// Redirecciona a inicio si no tiene ningún permiso requerido
$permisosRequeridos = ['ver_administradores_eventos', 'ver_tipo_entradas', 'ver_preguntas_frecuentes', 'generar_reporte_de_ventas'];
if (empty(array_intersect($permisosRequeridos, $permisosNombres))) {
    header('Location: ../inicio.php');
    exit;
}
print_r($permisosNombres);
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
    <script src="../scripts/script.js"></script>  
    <title>Mis entradas - Administración</title>
</head>
<body>
    <?php require_once("nav-sistemas.php") ?>

    <div class="container mt-5">
        <h1 class="text-center mb-4">Bienvenid@, <?php echo htmlspecialchars($_SESSION['nombre_usuario']); ?></h1>
        <p class="text-center mb-4">Selecciona una de las opciones de administración:</p>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            <?php if (tienePermiso('ver_administradores_eventos')): ?>
                <div class="col">
                    <a href="ver-administradores.php" class="btn btn-primary w-100 p-3" role="button">Ver administradores</a>
                </div>
            <?php endif; ?>

            <?php if (tienePermiso('ver_tipo_entradas')): ?>
                <div class="col">
                    <a href="ver-tipo-entradas.php" class="btn btn-primary w-100 p-3" role="button">Ver tipos de entradas</a>
                </div>
            <?php endif; ?>

            <?php if (tienePermiso('ver_preguntas_frecuentes')): ?>
                <div class="col">
                    <a href="ver-preguntas-frecuentes.php" class="btn btn-primary w-100 p-3" role="button">Ver preguntas frecuentes</a>
                </div>
            <?php endif; ?>

            <?php if (tienePermiso('administrar_categorias')): ?>
                <div class="col">
                    <a href="administrar-categorias.php" class="btn btn-primary w-100 p-3" role="button">Administrar categorias</a>
                </div>
            <?php endif; ?>

            <?php if (tienePermiso('generar_reporte_de_ventas')): ?>
                <div class="col">
                    <a href="reporte-de-ventas.php" class="btn btn-primary w-100 p-3" role="button">Generar reporte de ventas</a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
