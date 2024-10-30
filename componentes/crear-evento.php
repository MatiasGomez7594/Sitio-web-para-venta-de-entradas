<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/index.css">
    <script src="../scripts/crear-evento.js" defer></script>
    <title>Document</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark  w-100 " style="z-index: 1;">
        <div class="container-fluid">
          <a class="navbar-brand" href="../inicio.html">MisEntradas.com</a>
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
                  <li><a class="dropdown-item bg-dark text-light" href="crear-evento.html">Crear evento</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="interfaz-admin-eventos.html">Mi cuenta</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="editar-datos.html">Datos personales</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="cambiar-contraseña.html">Cambiar contraseña</a></li>
                  <li><a class="dropdown-item bg-dark text-light" href="#">Cerrar sesión</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <form class="w-50 mx-auto pt-5" id="formEvento" enctype="multipart/form-data">
        <h2>Crea un nuevo evento</h2>
        <div id="errorCampos" class="form-text text-danger  fs-6 oculto">
          Complete todos los campos.
        </div>
        <div class="mb-3 mt-3">
          <label for="nombreEvento" class="form-label">Nombre del evento</label>
          <input type="text" name="nombreEvento" class="form-control" id="nombreEvento" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="recinto" class="form-label">Nombre del recinto o lugar donde se realizará el evento</label>
          <input type="text" name="recinto" class="form-control" id="recinto">
        </div>
        <div class="mb-3 ">
            <label class="form-check-label" for="eventoMayores">
                  *Evento solo para mayores de edad
        </label>
        <select id="eventoMayores" name="eventoMayores" class="form-select" aria-label="Default select example">
            <option selected value="0" >No</option>
            <option value="1">Si</option>
        </select>
        </div>
        <div class="mb-3 ">
        <label class="form-check-label" for="eventoDiscapacitados">
                  *Evento apto para discapacitados
        </label>
        <select id="eventoDiscapacitados" name="eventoDiscapacitados" class="form-select" aria-label="Default select example">
            <option selected value="0">No</option>
            <option value="1">Si</option>
        </select>
        </div>
        <div class="mb-3 ">
            <label class="form-check-label" for="eventoDiscapacitados">
                      Seleccione la categoría del evento
            </label>
            <select id="categoria" name="categoria" class="form-select" aria-label="Default select example" name="categoria">
                <option selected value="0">Categoría</option>
                <option value="1">Musical</option>
                <option value="2">Deportivo</option>
                <option value="3">Artístico</option>
                <option value="4">Historia</option>
                <option value="5">Otra</option>
            </select>
        </div>
        <div class="container w-100 mb-3">
            <label >Seleccione la fecha y hora del evento</label>
            <div class="form-group  mb-3 mt-3">
                 <label for="fechaInicio">Fecha y Hora de Inicio:</label>
                <input type="datetime-local" class="form-control" id="fechaInicio" name="fechaInicio" required>
             </div>
            <div class="form-group  mb-3 mt-3">
                <label for="fechaFin ">Fecha y Hora de Finalización:</label>
                <input type="datetime-local" class="form-control" id="fechaFin" name="fechaFin" required>
            </div>      
            <div id="errorFecha" class="form-text text-danger provinciaError fs-6 oculto">
              Seleccione una fecha válida.
            </div>  
        </div>
        <div class="container row">
            <div class="mb-3 col-lg-6">
                <label for="provincia" class="form-label">Seleccione la provinvia</label>
                  <select class="form-select" id="provincias"  name="provincias" aria-label="Default select example">
                      <option selected value="0">Provincia</option>
                      <option value="1"> Buenos Aires</option>
                      <option value="3">Córdoba</option>
                      <option value="5">Santa Fe</option>
                      <option value="6">Otra</option>
                    </select>
                    <div id="provinciaError" class="form-text text-danger provinciaError fs-6 oculto">
                      Seleccione una provincia.
                    </div>
              </div>
              <div class="mb-3 col-lg-6 ciudad" id="contenedorciudad">
                <label for="ciudad" class="form-label ">Selecciona la ciudad</label>
                  <select class="form-select "  id="ciudades" name="ciudades" aria-label="Default select example" >
                      <option selected value="0">ciudad</option>
                      <option class="ocultarciudad" value="1">Ezeiza</option>
                      <option class="ocultarciudad" value="1">Merlo</option>
                      <option class="ocultarciudad" value="2">CABA</option>
                      <option class="ocultarciudad" value="3"> Córdoba</option>
                      <option class="ocultarciudad" value="3"> Rio cuarto</option>
                      <option class="ocultarciudad" value="5"> Santa fe</option>
                      <option class="ocultarciudad" value="6"> Otra</option>
                    </select>
                    <div id="ciudadError" class="form-text text-danger ciudadError fs-6 oculto">
                      Seleccione un ciudad.
                    </div>
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección del evento</label>
                <input type="text" name="direccion" class="form-control" id="direccion" >
              </div>
              <div class="form-group col-lg-12 mb-3">
                <label for="fecha2">Ingrese el total de localidades/entradas</label>
                <input type="number"  min="1" required class="form-control" name="totalLocalidades" id="totalEntradas" placeholder="Total localidades/entradas" minlength="1">
              </div>
              <div class="container row mb-3">
                <div class="mb-3 col-lg-6">
                  <label for="#">Seleccione el tipo de entradas</label>
                  <select class="form-select" aria-label="Default select example" id="tipoEntrada">
                    <option selected value="0">Tipo</option>
                    <option value="1">General</option>
                    <option value="2">Platea</option>
                    <option value="3">Campo Vip</option>
                    <option value="4">Campo de pie</option>
                    <option value="5">Otra</option>
                  </select>
                </div>
                <div class="mb-3 col-lg-6">
                  <div class="container">
                    <input placeholder="Ingrese total por el tipo" type="number" id="totalEntradaTipo"  min="1" required class="form-control ">
                     <p  class="text-danger oculto" id="errorCantidadEntradas"></p>
                  </div>
                  <div class="container"> 
                    <input placeholder="Ingrese el precio" type="number" id="precioEntrada"  min="1" required class="form-control mt-3">
                  </div>
                  <button class="btn btn-primary btn-sm mt-1" type="button" id="btnAgregarEntrada" >Agregar Tipo de Entrada</button>
              </div>
              <div class="row mb-5" id="listadoTipoEntradas">

              </div>
              <div class="row mb-5 w-75">
                <h5>Seleccione el mapa con las ubicaciones del recinto(opcional)</h5>
                <input class="form-control" type="file" name="mapaUbicaciones" id="mapaUbicaciones" accept="image/png,image/jpeg,image/jpg" >
              </div>
              <div class="row mb-5 w-75">
                <h5>Seleccione el flyer del evento (opcional)</h5>
                <input class="form-control" type="file" name="flyerEvento" id="flyerEvento" accept="image/png,image/jpeg,image/jpg" >
              </div>
        </div>
        <div class="row mb-5 w-75">
          <button type="button" class="btn btn-primary w-25 m-1" id="btnCrear">Crear evento</button>
          <a class="btn btn-primary w-25 m-1" href="interfaz-admin-eventos.html">Cancelar</a>
        </div>
      </form>
      
      
      <div class="modal fade " data-bs-backdrop="static" id="successModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Evento creado</h5>
            </div>
            <div class="modal-body">
              Su el evento fue guardado  exitosamente, ya puedes visualizarlo en tu lista de eventos.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    
</body>
</html>