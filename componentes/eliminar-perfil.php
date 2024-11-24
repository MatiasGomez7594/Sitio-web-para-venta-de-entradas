<?php  
  session_start();
  if (!isset($_SESSION['id_usuario'])) {
    // mandar a inicio si no inicio session
    header("Location: ../index.php");
    exit(); 
}
  include 'conexion.php';





  $passworderror= $emailerror= $comentarioerror="";
  $email= $password= $comentario= "";
 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
   
     $id_usuario =($_SESSION['id_usuario']);
     $email= $_POST["email"];
     $password=$_POST["password"];
     $comentario=$_POST["comentario"];
     $formValid = true;

        $resultadoQuery=$conn->prepare (" SELECT contrasena, email from usuarios where id_usuario= :id_usuario");
        $resultadoQuery->execute([':id_usuario' => $id_usuario]);
        $usuario = $resultadoQuery->fetch(PDO::FETCH_ASSOC);
      
   if($usuario){
    if(!password_verify($password, $usuario['contrasena'])){
        $passworderror ="La contraseña es incorrecta";
        $formValid=false;
   
      }
        
     if( !($email ===  $usuario["email"] )){
         $emailerror="Email incorrecto.";
         $formValid=false;
     }
   }
    if( $formValid){

        $queryRoles = "DELETE FROM roles_usuarios WHERE id_usuario = :id_usuario";
        $resultadoRoles = $conn->prepare($queryRoles);
        $resultadoRoles->bindParam(':id_usuario', $id_usuario);
        $resultadoRoles->execute();

         $query="DELETE FROM usuarios WHERE id_usuario= :id_usuario";
         $resultadoQuery = $conn->prepare($query);
         $resultadoQuery->bindParam(':id_usuario', $id_usuario);
         if($resultadoQuery->execute()) {
               
            session_destroy();
            header("Location: ../index.php");
            exit(); 
         }
   

    }



 }
 


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
        <script defer src="../scripts/eliminar-perfil.js"></script>
    <title>eliminar perfil</title>
</head>

<body>
    <?php require_once("nav-cliente.php")?>
    
    <div class="mx-auto w-75 pt-5 mb-5">
        <form class="w-50 mx-auto  pt-5 " id="miFormulario" action="" method="post">
            <h1 class="pt-5">Eliminar Usuario</h1>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Ingresa tu email </label>
                <input type="email" placeholder="tucorreo@email.com"   name="email" id="exampleInputEmail1"
                    aria-describedby="emailHelp"class="form-control <?php if(!empty($emailerror)){echo 'is-invalid';} ?>">
                    <span class="form-label text-danger" id="mensajeError2"></span>
                <div class="invalid-feedback">
                    <?php   
                     echo $emailerror;
                    ?>
                </div>
               
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                <input type="password" placeholder="Ingresa tu contraseña" 
                    id="exampleInputPassword1" name="password"class="form-control <?php if(!empty($passworderror)){echo 'is-invalid';} ?>">
                    <span class="form-label text-danger" id="mensajeError3"></span>
                 <div class="invalid-feedback">
                    <?php   
                     echo $passworderror;
                    ?>
                </div>
                
            </div>

            <div class="mb-3">
                <label for="exampleText" class="form-label">¿Porque desea eliminar su cuenta? (Opcional)</label>
                <input type="text" placeholder="..." class="form-control" id="exampleText" name="comentario">
                <span class="form-label text-danger" id="mensajeError4"></span>
            </div>
            <button type="submit" class="btn btn-primary w-100 mt-3" >Eliminar</button>
        </form>

    </div>
</body>

</html>