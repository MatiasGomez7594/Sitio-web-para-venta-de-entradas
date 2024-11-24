<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Compras</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script> 
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="../scripts/historial-compras.js" defer></script>
    <link rel="stylesheet" href="../css/mis-compras.css">
</head>
<body>
<div class="fixed-top">
    <?php require_once("nav-cliente.php") ?>
</div>
<div class="container pt-5">
    <h2 class="text-center mt-3">Historial de Compras</h2>
    <!-- Aquí se cargan las compras mediante JavaScript -->
    <div id="compras-container" class="mt-4"></div>
</div>

<!-- Modal para calificar un evento -->
<div class="modal fade" id="calificarModal" tabindex="-1" aria-labelledby="calificarModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="calificarModalLabel">Calificar Evento</h5>
            </div>
            <div class="modal-body text-center">
                <p id="error-calificacion" class="text-danger"></p>
                <p>Selecciona la calificación para el evento:</p>
                <div id="rating-stars" class="mb-3">
                    <!-- Estrellas de calificación -->
                    <i class="fa fa-star fa-2x" data-value="1"></i>
                    <i class="fa fa-star fa-2x" data-value="2"></i>
                    <i class="fa fa-star fa-2x" data-value="3"></i>
                    <i class="fa fa-star fa-2x" data-value="4"></i>
                    <i class="fa fa-star fa-2x" data-value="5"></i>
                </div>
                <input type="hidden" id="calificarEventoId">
            </div>
            <div class="modal-footer">
                <button type="button" id="btnCerrar" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" id="guardarCalificacion" class="btn btn-primary">Guardar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal para cancelar una compra -->
<div class="modal fade" id="cancelarModal" tabindex="-1" aria-labelledby="cancelarModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <p id="error-cancelar" class="text-danger"></p>
                <h5 class="modal-title" id="cancelarModalLabel">Cancelar Compra</h5>
            </div>
            <div class="modal-body">
                <p>¿Estás seguro de que deseas cancelar esta compra? Esta acción no se puede deshacer.</p>
                <input type="hidden" id="cancelarCompraId">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  id="btnCerrarCancelar" data-bs-dismiss="modal">No</button>
                <button type="button" id="confirmarCancelar" class="btn btn-danger">Sí, cancelar</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
