<?php
// Conexión a la base de datos
require 'conexion.php';
try {
    // Preparación y ejecución de la consulta para obtener las preguntas frecuentes
    $stmt = $conn->prepare("SELECT id_pregunta, pregunta, contenido FROM preguntas_frecuentes WHERE estado = 'activa'");
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../scripts/preguntas.js" defer></script>
    <title>Mis preguntas frecuentes</title>
</head>
<body>
    <?php include_once("nav-sistemas.php");?>
    <div class="container w-75 mx-auto my-4">
        <h1>Preguntas frecuentes</h1>
        <div id="listadoPreguntas" class="mb-5">
            <?php foreach ($preguntas as $pregunta): ?>
                <div class="mb-5 row" id="pregunta-<?php echo $pregunta['id_pregunta']; ?>">
                    <div class="col-lg-12">
                        <label class="form-label">Título</label>
                        <input type="text" value="<?php echo htmlspecialchars($pregunta['pregunta']); ?>" class="form-control pregunta-titulo" readonly>
                        <label class="form-label mt-3">Descripción</label>
                        <textarea class="form-control pregunta-contenido" readonly><?php echo htmlspecialchars($pregunta['contenido']); ?></textarea>
                    </div>
                    <div class="col-lg-12 mt-3">
                        <button type="button" class="btn btn-primary editarPregunta" data-id="<?php echo $pregunta['id_pregunta']; ?>" data-bs-toggle="modal" data-bs-target="#modalEdicion">Editar</button>
                        <button type="button" class="btn btn-danger eliminarPregunta" data-id="<?php echo $pregunta['id_pregunta']; ?>" data-bs-toggle="modal" data-bs-target="#modalEliminacion">Eliminar</button>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <button class="btn btn-primary w-25 mb-3" id="btnMostrar" data-bs-toggle="modal" data-bs-target="#modalAgregar">Nueva pregunta</button>

        <!-- Modal de Agregar Nueva Pregunta -->
        <div class="modal fade" id="modalAgregar" tabindex="-1" aria-labelledby="modalAgregarLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalAgregarLabel">Añadir nueva pregunta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <input required type="text" placeholder="Pregunta" class="form-control" id="tituloAgregar">
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" placeholder="Contenido" id="contenidoAgregar"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnCancelarAgregar">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnGuardarAgregar">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Edición -->
        <div class="modal fade" id="modalEdicion" tabindex="-1" aria-labelledby="modalEdicionLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalEdicionLabel">Editar pregunta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <input required type="text" placeholder="Pregunta" class="form-control" id="tituloEditar">
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" placeholder="Contenido" id="contenidoEditar"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnCancelarEditar">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnGuardarEditar">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Eliminación -->
        <div class="modal fade" id="modalEliminacion" tabindex="-1" aria-labelledby="modalEliminacionLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalEliminacionLabel">Eliminar pregunta</h5>
                    </div>
                    <div class="modal-body">
                        ¿Está seguro que desea eliminar esta pregunta?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger"  data-bs-dismiss="modal" id="confirmarEliminar">Eliminar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
