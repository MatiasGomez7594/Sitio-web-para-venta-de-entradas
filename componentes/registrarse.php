<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="../scripts/registrarse.js" defer></script>
</head>
<body >
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed  w-100 " style="z-index: 1;">
        <div class="container-fluid">
          <a class="navbar-brand" href="../inicio.php">MisEntradas.com</a>
          </div>
        </div>
      </nav>
      <form class="w-50 w-md-50 mx-auto pt-5 " id="formularioRegistro">

        <h1 class="pt-5">Completa los datos para registrarte</h1>
        <p class="text-danger lead" id="errorRegistro"></p>

        <div class="mb-3 mt-3">
            <label for="InputUsuario" class="form-label">Nombre de usuario</label>
            <input name="nombre_usuario" type="text" placeholder="Nombre de usuario" class="form-control" id="InputUsuario" aria-describedby="Help" min ="4" required>
            <small class="text-danger lead nombre-error"></small>
          </div>
        <div class="mb-3">
          <label for="InputEmail" class="form-label">Email </label>
          <input name="email" type="email" placeholder="Ingrese su email" class="form-control" id="InputEmail" aria-describedby="emailHelp"required>
          <small class="text-danger lead email-error"></small>
        </div>
        <div class="mb-3">
          <label for="InputPassword" class="form-label">Contraseña</label>
          <input name="contrasena" type="password" placeholder="Ingrese contraseña" class="form-control" id="InputPassword" required>
          <small class="text-danger lead contraseña-error"></small>
        </div>
        <button type="button" class="btn btn-primary w-100 mt-3" id="registrarse">Registrarse</button>
        <div class="mt-3">
            <a class=" link-primary active" aria-current="page" href="iniciar-sesion.php">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </form>

      
      <div class="modal fade " data-bs-backdrop="static" id="successModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Se ha registrado con éxito</h5>
            </div>
            <div class="modal-body">
              Su registro ha finalizado con éxito, ya puedes iniciar sesión.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    
</body>
</html>