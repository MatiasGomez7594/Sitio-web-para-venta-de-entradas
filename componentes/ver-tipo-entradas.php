<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script>  
<script src="../scripts/tipo-entrada.js" defer></script>  
<title>Mis entradas</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark  w-100 " style="z-index: 1;">
        <div class="container-fluid">
          <a class="navbar-brand" href="../inicio.php">MisEntradas.com</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link active dropdown-toggle " href="interfaz-admin-eventos.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Mi cuenta
                </a>
                <ul class="dropdown-menu bg-dark">
                  <li><a class="dropdown-item bg-dark text-light" href="interfaz-admin-sistemas.html">Mi cuenta</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="editar-datos.html">Datos personales</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="cambiar-contraseña.html">Cambiar contraseña</a></li>
                  <li> <a href="ver-administradores.html" class="dropdown-item bg-dark text-light"  >Ver administradores</a></li>
                  <li> <a href="ver-tipo-entradas.html" class="dropdown-item bg-dark text-light"  >Ver tipos de entradas</a></li>
                  <li> <a href="ver-preguntas-frecuentes.html" class="dropdown-item bg-dark text-light"  >Ver preguntas frecuentes</a></li>
                  <li> <a href="reporte-de-ventas.html" class="dropdown-item bg-dark text-light"  >Generar reporte de ventas</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="../inicio.html">Cerrar sesión</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <h1>Ver tipo de entradas</h1>
    <form class="container mt-5 mb-5 " id="formulario">
      <p id ="errorNombre"class="text-danger oculto">El nombre no puede quedar vacío</p>
      <div class="row " id="tipoEntrada">
        <div class="modal fade" id="exampleModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar</h1>
              </div>
              <div class="modal-body">
                ¿Está seguro que desea eliminar el elemento?
                </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary eliminarTipo" data-bs-dismiss="modal" >Aceptar</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-3">Nombre de la entrada        
          <input value="Anticipada"  placeholder="Nombre del tipo de entrada" type="text" class="form-control edicionDeshabilitada " id="nombreEntrada">
        </div>
        <div class="col-md-3">
          <div class="d-flex justify-content-center">
            <button  type="button" class="btn btn-primary btn-sm me-2 editarTipo" >
              Editar
            </button>
            <button type="button" class="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" >
              Eliminar
            </button>
          </div>
        </div>
        <hr>

      </div>
      <div class="row oculto" id="agregarNuevo" >
        <div class="container col-lg-12 col-sm-12 mb-3 ">
          <input required  placeholder="Nombre de la entrada" type="text" class="form-control " id="entradaNueva" aria-describedby="emailHelp">
          <p id ="errorNombre"class="text-danger oculto">El nombre no puede quedar vacío</p>
        </div>
        <div class="col-lg-12 col-md-6">
          <button type="button"class="btn btn-primary mb-5 mt-5 w-25" id="btnAgregar">Agregar</button>
          <button type="button"class="btn btn-primary w-25" id="btnCancelar">Cancelar</button>
        </div>
      </div>
      <div class="row">
        <button type="button" class="btn btn-primary w-25" id="btnMostrar" >Nuevo tipo</button>
      </div>
    </form>

    
</body>
</html>