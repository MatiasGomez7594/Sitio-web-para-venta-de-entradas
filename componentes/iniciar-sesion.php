<?php
session_start();
require 'conexion.php';

// Verifica si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['InputEmail'];
  $password = $_POST['InputPassword'];


  $stmt = $pdo->prepare("SELECT * FORM  usuarios WHERE email = :email");
  $stmt->execute(['email' => $email]);
  $usuario = $stmt->fetch();

    // Verifica la contraseña
    if ($usuario && password_verify($password, $usuario['password'])) {
      // Inicia sesion y almacena informacion del usuario
      $_SESSION['usuario_id'] = $usuario['id'];
      $_SESSION['nombre_usuario'] = $usuario['username'];
      header("Location: mi-cuenta.php"); // Redirige a la pagina inicial
      exit;
  } else {
      $error = "Usuario o contraseña incorrectos.";
  }

}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>form inicio de sesion</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="../scripts/script-inicio-sesion.js"defer></script>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed  w-100 " style="z-index: 1;">
    <div class="container-fluid">
      <a class="navbar-brand" href="../inicio.html">MisEntradas.com</a>
      </div>
    </div>
  </nav>
  <form class="w-50 mx-auto pt-5"method="POST" action="" id="formulario">
    <h1 class="pt-5">Iniciar sesión</h1>
    <div class="mb-3">
      <label for="InputEmail" class="form-label">Email</label>
      <input type="email" placeholder="Ejemplo@email.com" name="InputEmail" class="form-control" id="InputEmail" aria-describedby="emailHelp" required>
      <small class="email-error"></small>
    </div>
    <div class="mb-3">
      <label for="InputPassword" class="form-label">Contraseña</label>
      <input type="password" placeholder="Tu contraseña" name="InputPassword" class="form-control" id="InputPassword" required>
      <small class="contraseña-error"></small>
    </div>
  
    <button type="submit" class="btn btn-primary w-100 mb-3">Ingresar</button>
    <a class="link-primary active" aria-current="page" href="registrarse.html">¿No tienes cuenta? Registrate</a>
    <br>
    <a class="link-primary active" aria-current="page" href="inicio-sesion-admi.html">¿Eres administrador? haz clic aqui</a>
  </form>
  
    
</body>
</html>