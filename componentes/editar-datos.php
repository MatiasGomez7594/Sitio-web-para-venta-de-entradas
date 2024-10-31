<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <title>Editar Datos</title>
    <script src="../scripts/editar-datos.js" defer></script>
</head>
<body>
<?php require_once("nav-cliente.php")?>

    <form class="w-75 mx-auto pt-5">
        <h1 class="mt-5">Edita los datos de tu cuenta</h1>

        <!-- Contenedor para mostrar mensajes de error -->
        <div id="error-messages" class="alert alert-danger d-none" role="alert"></div>

        <div class="row g-3 mt-5">
            <div class="col">
                <label for="nombre-usuario" class="form-label">Nombre de usuario</label>
              <input type="text" class="form-control" placeholder="Nombre de usuario" id="nombre-usuario" aria-label="First name" value="Usuario">
            </div>
            <div class="col">
                <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" id="email" placeholder="Email@ejemplo.com" aria-label="Last name" value="Usuario@email.com">
            </div>
          </div>
          <div class="row g-3 mt-5">
            <div class="col">
                <label for="telefono" class="form-label">Teléfono</label>
              <input type="text" class="form-control" id="telefono" placeholder="Teléfono" aria-label="First name" value="1234567890">
            </div>
            <div class="col">
                <label for="genero" class="form-label">Género</label>
                <select class="form-select" aria-label="Default select example" id="genero">
                    <option selected value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="otro">Otro</option>
                  </select>            
            </div>
          </div>
          <button class="btn btn-primary btn-lg mt-5" type="submit">Guardar</button>
    </form>
</body>
</html>
