<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script>  
<script src="../scripts/enviar-pregunta.js" defer></script>  
<title>Mis entradas</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed  w-100 " style="z-index: 1;">
        <div class="container-fluid">
          <a class="navbar-brand" href="../inicio.php">MisEntradas.com</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="iniciar-sesion.html">Ingresar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="registrarse.html">Registrarse</a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" href="mi-cuenta.html">Tu perfil</a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    <div class="container pt-5 w-100">
        <h1 class="mt-5">Preguntas frecuentes</h1>
        <div class="accordion mt-5" id="accordionPreguntas">
          </div>
          <div class="container mb-3 mt-3">
            <h2>¿No encuentras lo que buscas?</h2>
            <p class="mb-3">
                Si tu consulta no se relaciona con los temas anteriores o
                prefieres hablar directamente con nosotros, 
                no dudes en llenar el nuestro formulario de contacto.
                Nos pondremos en contacto contigo lo antes posible.
            </p>
          </div>
          <form class="w-50  mt-5" id="formulario">
            <div id="notificacion" class="alert alert-success alert-dismissible fade show oculto" role="alert">
              Gracias por contactarnos, en breve
              uno de nuestros representantes te enviará una respuesta por mail.              
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <h3 id ="error" class="text-danger "></h3>
            <h3 id ="errorCampos"class="text-danger oculto">Complete todos los campos</h3>
            <div class="mb-3">
                <label for="nombreContacto" class="form-label">Nombre completo</label>
                <input required pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ]+( [A-Za-záéíóúÁÉÍÓÚñÑ]+)+$" placeholder="Nombre Completo" type="text" class="form-control"  name="nombre" id="nombre" aria-describedby="emailHelp">
                <p id ="errorNombre"class="text-danger oculto">El nombre de contacto no es valido, no puede contener signos o caracteres especiales.</p>
              </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email </label>
              <input required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="email@ejemplo.com" type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp">
              <p id ="errorEmail"class="text-danger oculto">El email no es valido, debe ser del tipo email@ejemplo.com.</p>
            </div>
            <div class="mb-3">
                <textarea required minlength="10" class="form-control" placeholder="Mensaje" name="mensaje" id="mensaje" style="height: 100px"></textarea>
                <p id ="errorMensaje"class="text-danger oculto">Para poder responderte debes escribir algún mensaje.</p>
              </div>
            <button type="button" class="btn btn-primary mb-5" id="btnEnviar">Enviar</button>
          </form>
    </div>

    
</body>
</html>