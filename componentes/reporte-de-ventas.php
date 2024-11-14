<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/783263774b.js" crossorigin="anonymous"></script>  
<script src="../scripts/reporte-ventas.js" defer></script>  
<title>Mis entradas</title>
</head>
<body>
  <?php include_once("nav-sistemas.php");?>
      <form class="w-75 mx-auto">
        <h1>Generar reporte de ventas</h1>

        <div class="row mt-5">
          <div class="container col-md-6 ">
            <label for="reporte">Seleccione el período</label>
            <select class="form-select" name="reporte" id="reporte">
              <option value="0">Anual</option>
              <option value="1">Mensual</option>
            </select>
          </div>
          <div class="container col-md-6 ">
            <label for="mes">Seleccione el mes</label>
            <select class="form-select " name="reporte" id="mes" >
              <option selected>Mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
        </div>
        <div class="row mt-5">
          <button type="button"class="btn btn-primary btn-sm w-25" id="btnReporte"  >Generar reporte</button>
        </div>
        <div class="container  mt-5 mb-5 oculto" id="resultados">

        </div>
      </form>
    
</body>
</html>