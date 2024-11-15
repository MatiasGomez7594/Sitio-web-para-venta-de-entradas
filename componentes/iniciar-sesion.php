<?php
require(__DIR__.'/../includes/globals.php');
require(__DIR__.'/conexion.php');
// Verifica si el formulario fue enviado
$contrasena_incorrecta = '';
$usuario_incorrecto = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $email = $_POST['InputEmail'];
  $password = trim($_POST['InputPassword']); // Elimina espacios en blanco al inicio y al final


  $stmt = $conn->prepare("SELECT u.id_usuario, u.nombre_usuario, u.email, u.contrasena, 
  r.nombre AS rol_usuario
  FROM usuarios u JOIN roles_usuarios ru ON u.id_usuario = ru.id_usuario 
  JOIN roles r ON ru.id_rol = r.id_rol WHERE u.email = :email");
  $stmt->execute([':email' => $email]);
  $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

//print_r($usuario);

//print_r($usuario['contrasena']); // Hash guardado en la base de datos

//print_r($password); 


if ($usuario) {
  $hash = $usuario['contrasena'];
  if (password_verify($password, $hash)) {
    $_SESSION['id_usuario'] = $usuario['id_usuario'];
    $_SESSION['nombre_usuario'] = $usuario['nombre_usuario'];
    $_SESSION['rol_usuario'] = $usuario["rol_usuario"];

      require(__DIR__.'/../includes/permisos.php'); 
          
    // Comprueba el permiso del usuario
      if (permisos::tienePermiso('ver_panel_admi_sistema', $_SESSION['id_usuario'])) {
        header('Location:/Sitio-web-para-venta-de-entradas/componentes/interfaz-admin-sistemas.php');
        exit;
      } elseif (permisos::tienePermiso('ver_panel_admi_eventos', $_SESSION['id_usuario'])) {
        header('Location:/Sitio-web-para-venta-de-entradas/componentes/interfaz-admin-eventos.php');
        exit;
      } elseif(permisos::tienePermiso('comprar_entrada', $_SESSION['id_usuario'])) {
        header('Location:/Sitio-web-para-venta-de-entradas/componentes/mi-cuenta.php');
        exit;
      }else{
        echo "Usted no posee permisos";
      }
        exit;
  } else {
      $contrasena_incorrecta ='<div class="alert alert-danger mt-5" role="alert">
                  Contraseña incorrecta
                  </div>';
  }
} $usuario_incorrecto ='<div class="alert alert-danger mt-5" role="alert">
El email no se encuentra registrado.
</div>';


      
}

$conn = null;
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
      <a class="navbar-brand" href="../inicio.php">MisEntradas.com</a>
      </div>
    </div>
  </nav>
  <form class="w-50 mx-auto pt-5" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" id="formulario">
  <?php echo $contrasena_incorrecta?>
  <?php echo $usuario_incorrecto?>

  
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
    <a class="link-primary active" aria-current="page" href="registrarse.php">¿No tienes cuenta? Registrate</a>
    <br>
  </form>
  

</body>
</html>