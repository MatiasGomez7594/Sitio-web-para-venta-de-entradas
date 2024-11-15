

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script>  
<script src="../scripts/tipo-entrada.js" defer></script>  

<title>Mis entradas</title>
</head>
<body>
    
    <?php require_once("nav-sistemas.php") ?>
    
    <div class="container my-5">
        <div class="row">
            <!-- form para agregar categoria  -->
            <div class="col-lg-4">
                <div class="card shadow-sm  ">
                    <div class="card-header  bg-success text-white text-center">
                        <h3 class="mb-0" >Agregar Tipo de Entradas</h3>
                        
                    </div>
                    <div class="card-body">
                        <form action="" method="post" id="formentradas">
                            <div class="mb-3">
                                <label for="nombreentrada" class="form-label">Nombre de la entrada</label>
                                <input type="text" name="nombreentrada" id="nombreentrada" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="estadoentrada" class="form-label">Estado</label>
                                <select class="form-select" id="estadoentrada" name="estadoentrada">
                                    <option value="" disabled selected>Seleccione el estado</option>
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div class="text-center mt-4">
                                <button type="submit" class="btn btn-success w-100">Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!--tipo de entradas  tabla -->
            <div class="col-lg-8">
                <div class="card shadow-sm border-0">
                    <div class="card-header   bg-secondary text-white text-center">
                        <h3>Lista de Entradas</h3>
                    </div>
                    <div class="card-body p-0    table-responsive">
                        <table class="table table-hover mb-0 table-light " id="tablaentradas">
                            <thead class="table-secondary">
                                <tr>
                                    <th>Entrada</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="bodytabla">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

 <!-- modal  editar tipo de entrada -->
<div class="modal fade" id="modalEditarEntrada" tabindex="-1" aria-labelledby="modalEditarEntradaLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditarEntradaLabel">Editar Categoría</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="formEditarEntrada">
          <input type="hidden" id="editIdEntrada" name="id_entrada">
          <div class="mb-3">
            <label for="editNombreEntrada" class="form-label">Nombre de la categoría</label>
            <input type="text" name="nombre_entrada" id="editNombreEntrada" class="form-control">
          </div>
          <div class="mb-3">
            <label for="editEstadoEntrada" class="form-label">Estado</label>
            <select class="form-select" id="editEstadoEntrada" name="estado">
                <option value=""disabled select>seleccione el estado</optionvalue>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary w-100">Guardar Cambios</button>
        </form>
      </div>
    </div>
  </div>
</div>



    
</body>
</html>