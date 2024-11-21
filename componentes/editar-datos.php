<?php
  session_start();
  if (!isset($_SESSION['id_usuario'])) {
    // mandar a inicio si no inicio session
    header("Location: ../index.php");
    exit(); 
}
  include 'conexion.php';
  
  $msgSuccess ="";
  $usuario = $_SESSION['id_usuario'];

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formValid = true;
    $nameusererror = $emailerror= $telefonoerror=  $generoerror ="";
    $nombre_usuario = $_POST['nombre_usuario'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $genero = $_POST['genero'];

    if (empty($nombre_usuario) ){
          $nameusererror = "El nombre completo es obligatorio.";
          $formValid=false;
      }else if ( !preg_match("/^[A-Za-z0-9]{3,}$/", $nombre_usuario)) {
           $nameusererror= "Por favor, el nombre debe ser mayor a 4 caracteres, puede incluir letras y numeros";
           $formValid=false;
      }

//validar email
    if(empty($email)){
           $emailerror="El email es obligatorio.";
           $formValid=false;
       }else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
          $emailerror="El formato del email es inválido.";
          $formValid=false;
      }
  
     if(empty($telefono)){
          $telefonoerror="El telefono es obligatorio";
          $formValid=false;

       }else if (!preg_match('/^\d{10}$/', $telefono)) {
             $telefonoerror = "El teléfono solo puede contener maximo 10 digitos.";
            $formValid=false;
       }
      
       if (empty($genero)) {
        $generoerror = "El género es obligatorio.";
        $formValid = false;
       }


    if($formValid){// Prepara la consulta para actualizar los datos del usuario
      
      $query = "UPDATE usuarios 
          SET nombre_usuario = :nombre, 
              telefono = :telefono, 
              email = :email, 
              genero = :genero 
          WHERE id_Usuario = :idUsuario";
          
              $resultadoQuery = $conn->prepare($query);
              $resultadoQuery->bindParam(':nombre', $nombre_usuario);
              $resultadoQuery->bindParam(':telefono', $telefono);
              $resultadoQuery->bindParam(':email', $email);
              $resultadoQuery->bindParam(':genero', $genero);
              $resultadoQuery->bindParam(':idUsuario', $usuario);
            
              if($resultadoQuery->execute()) {
        
                $msgSuccess="Se editaron tus datos correctamente";
        
              }else {
               $msgSuccess="no se pudo realizar la edicion";
              }
            }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <title>Editar Datos</title>
<!--
    <script src="../scripts/editar-datos.js" defer></script>-->
    <script src="../scripts/datos-usuario.js" defer></script>

</head>
<body>
<?php 
        if ($_SESSION['rol_usuario'] == 'cliente') {
                // Redirigir si no hay sesion
                require_once("nav-cliente.php");

              }
            else if ( $_SESSION['rol_usuario'] == 'administrador de eventos') {
              // Redirigir si no hay sesion
              require_once("nav-admin-eventos.php");

            }
          else if ($_SESSION['rol_usuario'] == 'administrador de sistemas') {
            // Redirigir si no hay sesion
            require_once("nav-sistemas.php");

          }
          ?>

<form class="w-75 mx-auto pt-5"    action=""  method="post" id="formeditardatos">
        <h1 class="mt-5">Edita los datos de tu cuenta</h1>
        <div class="row g-3 mt-5">
            <div class="col">
                <label for="nombre_usuario" class="form-label">Nombre de usuario</label>
              <input type="text"  placeholder="Nombre de usuario" name="nombre_usuario" id="nombre_usuario" aria-label="First name"class="form-control <?php if(!empty($nameusererror)){echo 'is-invalid';} ?>">
        <div class="invalid-feedback">
                    <?php   
                     echo $nameusererror;
                    ?>
                </div>
            </div>
            <div class="col">
                <label for="email" class="form-label">Email</label>
              <input type="text" value="" id="email" name="email" placeholder="Email@ejemplo.com" aria-label="Last name"class="form-control <?php if(!empty($emailerror)){echo 'is-invalid';} ?>">
        <div class="invalid-feedback">
                    <?php   
                     echo $emailerror;
                    ?>
                </div>
            </div>
          </div>
          <div class="row g-3 mt-5">
            <div class="col">
                <label for="telefono" class="form-label">Teléfono</label>
              <input type="text"  id="telefono" name="telefono" placeholder="Teléfono" aria-label="First name"class="form-control <?php if(!empty($telefonoerror)){echo 'is-invalid';} ?>">
        <div class="invalid-feedback">
                    <?php   
                     echo $telefonoerror;
                    ?>
                </div>
            </div>
            <div class="col">
                <label for="genero" class="form-label">Género</label>
                <select class="form-select  <?php if (!empty($generoerror)) { echo 'is-invalid'; } ?>" aria-label="Default select example" id="genero" name="genero">
                    <option value="">selecione una opcion..</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="otro">Otro</option>
                  </select>  
                  <div  id=generoerror class="invalid-feedback">
                              <?php echo $generoerror; ?>
                 </div>          
            </div>
          </div>
          <button class="btn btn-primary btn-lg mt-5" type="submit">Guardar</button>
    
          <div class="mt-4">
          <?php if (!empty($msgSuccess)) { ?>
                                  <div class="alert alert-success">
                                      <?php echo  $msgSuccess; ?>
                                  </div>
                              <?php } ?> 
       </div>

   </form>
       
</body>
</html>
