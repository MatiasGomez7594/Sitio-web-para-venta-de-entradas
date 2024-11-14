<?php
// Conexión a la base de datos
require 'conexion.php';

try {
    // Preparación y ejecución de la consulta para obtener las preguntas frecuentes
    $stmt = $conn->prepare("SELECT id, pregunta, contenido FROM preguntas_frecuentes");
    $stmt->execute();

    // Obtención de los resultados
    $preguntas = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Manejo de errores
    echo "Error al obtener las preguntas frecuentes: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../scripts/preguntas.js" defer></script>
    <title>Mis preguntas frecuentes</title>
</head>
<body>
    <!-- Código del menú y navegación omitido para brevedad -->

    <div class="container w-75 mx-auto my-4">
        <h1>Preguntas frecuentes</h1>
        <div id="listadoPreguntas" class="mb-5">
        
        <?php foreach ($preguntas as $pregunta): ?>
            <div class="mb-3 row" id="pregunta">
                <div class="col-lg-12">
                    <label class="form-label">Pregunta</label>
                    <input type="text" value="<?php echo htmlspecialchars($pregunta['pregunta']); ?>" class="form-control" readonly>
                    
                    <label class="form-label mt-3">Descripción</label>
                    <textarea class="form-control" readonly><?php echo htmlspecialchars($pregunta['contenido']); ?></textarea>
                </div>
                
                <!-- Botones para editar o eliminar -->
                <div class="col-lg-12 mt-3">
                    <button type="button" class="btn btn-primary editarPregunta" data-id="<?php echo $pregunta['id']; ?>">Editar</button>
                    <button type="button" class="btn btn-danger eliminarPregunta" data-id="<?php echo $pregunta['id']; ?>" data-bs-toggle="modal" data-bs-target="#modalEliminar">Eliminar</button>
                </div>
            </div>
            <hr>
        <?php endforeach; ?>
        </div>

        <!-- Botón para agregar nueva pregunta -->
        <button class="btn btn-primary w-25 mb-3" id="btnMostrar">Nueva pregunta</button>

        <!-- Formulario para agregar o editar una pregunta -->
        <div id="formulario" class="row oculto">
            <h4 class="mt-3 mb-3" id="formTitle">Añadir nueva pregunta</h4>
            <div class="col-12 mb-3">
                <p id="errorCamposNuevaPregunta" class="text-danger oculto">Complete todos los campos.</p>
                <input required type="text" placeholder="Pregunta" class="form-control" id="pregunta">
            </div>
            <div class="col-12 mb-3">
                <textarea class="form-control" placeholder="Contenido" id="contenido"></textarea>
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-success mb-3 w-25" id="btnGuardar">Guardar</button>
                <button type="button" class="btn btn-secondary mb-3 w-25" id="btnCancelar">Cancelar</button>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEliminarLabel">Eliminar pregunta</h5>
                </div>
                <div class="modal-body">
                    ¿Está seguro que desea eliminar esta pregunta?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="confirmarEliminar">Eliminar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    
</body>
</html>
