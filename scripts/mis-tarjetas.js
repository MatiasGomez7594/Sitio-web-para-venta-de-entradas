
const tablaTarjetas = document.getElementById('tablaTarjetas');
  // Llamar a cargarTarjetas cuando la página se cargue
 document.addEventListener('DOMContentLoaded', cargarTarjetas);

function cargarTarjetas() {
    fetch('../BBDD/obtener-tarjetas.php')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar las tarjetas");
            }
            return response.json();
        })
        .then(data => {
            mostrarTarjetas(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Función para mostrar las tarjetas en la tabla
function mostrarTarjetas(tarjetas) {
    const tablaTarjetasBody = document.getElementById('tablaTarjetasBody');
    tablaTarjetasBody.innerHTML = ''; 
    tarjetas.forEach(tarjeta => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${tarjeta.nombre_titular}</td>
            <td>${tarjeta.apellido_titular}</td>
            <td>${tarjeta.numero_tarjeta}</td>
            <td>${tarjeta.fecha_expiracion}</td>
            <td>${tarjeta.tipo_tarjeta}</td>
            <td>
                <button class="btn btn-warning btn-edit" data-id="${tarjeta.id_tarjeta}">Editar</button>
                <button class="btn btn-danger btn-delete" data-id="${tarjeta.id_tarjeta}">Eliminar</button>
            </td>
        `;
        tablaTarjetasBody.appendChild(fila);
    });
}

      

        document.getElementById("formTarjeta").addEventListener("submit",function(event){
        
            event.preventDefault();
            validarFormulariotarjeta();
            
        });
  
  
      function validarFormulariotarjeta(){
  
  
      let isValid = true;
      const numeroTarjeta = document.getElementById('numeroTarjeta');
      const nombreTitular = document.getElementById('nombreTitular');
      const apellidoTitular = document.getElementById('apellidoTitular');
      const fechaEmision = document.getElementById('emisiondate');
      const fechaVencimiento = document.getElementById('vencimientodate');
      const ccv = document.getElementById('ccv');
      const tipoTarjeta = document.getElementById('tipoTarjeta'); 
  
      const [mesEmision, anioEmision] = fechaEmision.value.split('/');
      const fechaActual = new Date();
      const fechaEmisionDate = new Date(`20${anioEmision}`, mesEmision - 1);
  
           //  para Validar fecha de vencimiento
      const [mesVencimiento, anioVencimiento] = fechaVencimiento.value.split('/');
      const fechaVencimientoDate = new Date(`20${anioVencimiento}`, mesVencimiento - 1);
  
  
  
      limpiarError(numeroTarjeta);
      limpiarError(nombreTitular);
      limpiarError(apellidoTitular);
      limpiarError(fechaEmision);
      limpiarError(fechaVencimiento);
      limpiarError(ccv);
      limpiarError(tipoTarjeta);
  
      if(nombreTitular.value.trim() === ''){    // valido nombre
          mostrarError(nombreTitular,'El nombre es requerido.')
          isValid = false;
     
          } else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/.test(nombreTitular.value)){
  
                     mostrarError(nombreTitular,'Ingrese un nombre correcto.')
                      isValid = false;
          }
  
  
       if(apellidoTitular.value.trim() === ''){    // valido apellido 
          mostrarError(apellidoTitular,'El apellido es requerido.')
          isValid = false;
     
          } else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/.test(apellidoTitular.value)){
        
                     mostrarError(apellidoTitular,'Ingrese un apellido correcto.')
                      isValid = false;
           }
  
  
      if (numeroTarjeta.value.trim() === '') {   // valido nro tarjeta 
          mostrarError(numeroTarjeta, 'El número de tarjeta es requerido.');
          isValid = false;
  
         } else if (!/^\d{16}$/.test(numeroTarjeta.value)) {
  
                  mostrarError(numeroTarjeta, 'El número de tarjeta debe contener solo 16 dígitos.');
                  isValid = false;
         }
       
  
      if(fechaEmision.value.trim() === ''){  // valido fecha de emision
          mostrarError(fechaEmision,'La fecha de emision es requerida.');
          isValid=false;
  
         } else if (fechaEmisionDate > fechaActual) {  
                    mostrarError(fechaEmision,'Ingrese una  fecha de emisión valida.');
                    isValid = false;
         } else if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaEmision.value)){
                    mostrarError(fechaEmision,'Recuerde el formato MM/AA..');
                    isValid = false;
         }
  
  
  
      if (fechaVencimiento.value.trim() === '') { // valido vec de tarjeta 
          mostrarError(fechaVencimiento, 'La fecha de vencimiento es requerida.');
          isValid = false;
          } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaVencimiento.value)) {
                     mostrarError(fechaVencimiento, 'Recuerde el formato MM/AA..');
                     isValid = false;
         
          }else if(fechaVencimientoDate < fechaActual){
                   mostrarError(fechaVencimiento,'La tarjeta se encuentra vencida.')
                   isValid = false;
          }
  
      if (ccv.value.trim() === '') {  //valido cod seguridad
          mostrarError(ccv, 'El código de seguridad es requerido.');
          isValid = false;
         } else if (!/^\d{3}$/.test(ccv.value)) {
                   mostrarError(ccv, 'El código de seguridad invalido.');
                   isValid = false;
      }
  
     if(tipoTarjeta.value  ===""){
          mostrarError(tipoTarjeta, 'Debe ingresar el tipo de tarjeta.');
          isValid = false;
     
     }
  
              if(isValid){
                  
                  agregartarjetas();
                  
              
                  
                  }
  
  
    }

    

    // si se hace click a algun boton de la tabla 
    tablaTarjetas.addEventListener('click', function(e) {
        const idtarjeta = e.target.dataset.id;
       
        if (e.target.classList.contains('btn-delete')) {
            eliminarTarjeta(idtarjeta);
        } else if (e.target.classList.contains('btn-edit')) {
            editarTarjeta(idtarjeta);
        }
    });



    function eliminarTarjeta(idtarjeta){
       
       
        fetch('../BBDD/ABMtarjetas.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ action: 'delete', id_tarjeta: idtarjeta })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                
                
                cargarTarjetas()  
            } else {
                
            }
        });
    



    }



     // si se hace click para editar  se muestran los datos 
    function editarTarjeta(idtarjeta) {
        fetch(`../BBDD/obtener-tarjeta.php?id=${idtarjeta}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Llenar el formulario con los datos de la tarjeta
                document.getElementById('idtarjetaEditar').value = data.id_tarjeta;
                document.getElementById('nombreTitularEditar').value = data.nombre_titular;
                document.getElementById('apellidoTitularEditar').value = data.apellido_titular;
                document.getElementById('numeroTarjetaEditar').value = data.numero_tarjeta;
                document.getElementById('fechaExpiracionEditar').value = data.fecha_expiracion;
                document.getElementById('tipoTarjetaEditar').value = data.tipo_tarjeta;
                // Abrir el modal
                const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
                modalEditar.show();
            }
        })
    }

 
     // se valida los datos que se editan 
    document.getElementById('formEditar').addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const numeroTarjetaEditar = document.getElementById('numeroTarjetaEditar');
        const nombreTitularEditar = document.getElementById('nombreTitularEditar');
        const apellidoTitularEditar = document.getElementById('apellidoTitularEditar');
        const fechaExpiracionEditar = document.getElementById('fechaExpiracionEditar');
        const tipoTarjetaEditar = document.getElementById('tipoTarjetaEditar'); 
        const fechaActual = new Date();
        const [mesVencimiento, anioVencimiento] = fechaExpiracionEditar.value.split('/');
        const fechaVencimientoDate = new Date(`20${anioVencimiento}`, mesVencimiento - 1);
        limpiarError(numeroTarjetaEditar);
        limpiarError(nombreTitularEditar);
        limpiarError(apellidoTitularEditar);
        limpiarError(tipoTarjetaEditar);
        limpiarError(fechaExpiracionEditar);

        if(nombreTitularEditar.value.trim() === ''){    // valido nombre
            mostrarError(nombreTitularEditar,'El nombre es requerido.')
            isValid = false;
       
            } else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/.test(nombreTitularEditar.value)){
    
                       mostrarError(nombreTitulaEditarr,'Ingrese un nombre correcto.')
                        isValid = false;
            }
    
    
         if(apellidoTitularEditar.value.trim() === ''){    // valido apellido 
            mostrarError(apellidoTitularEditar,'El apellido es requerido.')
            isValid = false;
       
            } else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,}$/.test(apellidoTitularEditar.value)){
          
                       mostrarError(apellidoTitularEditar,'Ingrese un apellido correcto.')
                        isValid = false;
             }
    
    
        if (numeroTarjetaEditar.value.trim() === '') {   // valido nro tarjeta 
            mostrarError(numeroTarjetaEditar, 'El número de tarjeta es requerido.');
            isValid = false;
    
           } else if (!/^\d{16}$/.test(numeroTarjetaEditar.value)) {
    
                    mostrarError(numeroTarjetaEditar, 'El número de tarjeta debe contener solo 16 dígitos.');
                    isValid = false;
           }
           if (fechaExpiracionEditar.value.trim() === '') { // valido vec de tarjeta 
            mostrarError(fechaExpiracionEditar, 'La fecha de vencimiento es requerida.');
            isValid = false;
            } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaExpiracionEditar.value)) {
                       mostrarError(fechaExpiracionEditar, 'Recuerde el formato MM/AA..');
                       isValid = false;
           
            }else if(fechaVencimientoDate < fechaActual){
                     mostrarError(fechaVencimientoEditar,'La tarjeta se encuentra vencida.')
                     isValid = false;
            }
            if(tipoTarjetaEditar.value  ===""){
                mostrarError(tipoTarjetaEditar, 'Debe ingresar el tipo de tarjeta.');
                isValid = false;
           
           }

       if(isValid){ 
                 actualizarTarjeta();

       }

       
        
    });

     // se edita una tarjeta 
   function actualizarTarjeta(){

    const formData = new FormData(document.getElementById('formEditar'));
    formData.append('action', 'edit');

    fetch('../BBDD/ABMtarjetas.php', {
        method: 'POST',
        body: formData
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            
            // Cerrar el modal
            const modalEditar = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
            modalEditar.hide();
             cargarTarjetas();

        } else {

            mostrarError(nombreTitularEditar, data.errors.nombreTitular);
            mostrarError(apellidoTitularEditar, data.errors.apellidoTitular);
            mostrarError(numeroTarjetaEditar, data.errors.numeroTarjeta);
            mostrarError(fechaVencimientoEditar, data.errors.vencimientodate);
            mostrarError(tipoTarjetaEditar, data.errors.tipoTarjeta);
            
        }
    });
    
}
    

      //se envian los datos del form para agreagr una tarjeta 

    function agregartarjetas(){
        const formulario=document.getElementById("formTarjeta");
        const formData = new FormData(document.getElementById("formTarjeta"));
        formData.append('action', 'add');
    
        fetch('../BBDD/ABMtarjetas.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())  
        .then(data => {
            if (data.success) {
                
                document.getElementById("formTarjeta").reset();
                const modalAgregar = bootstrap.Modal.getInstance(document.getElementById('modalAgregar'));
                modalAgregar.hide(); 
                cargarTarjetas(); 
                 
            } else {
                
                mostrarError(nombreTitular, data.errors.nombreTitular);
                mostrarError(apellidoTitular, data.errors.apellidoTitular);
                mostrarError(numeroTarjeta, data.errors.numeroTarjeta);
                mostrarError(fechaEmision, data.errors.emisiondate);
                mostrarError(fechaVencimiento, data.errors.vencimientodate);
                mostrarError(ccv, data.errors.ccv);
                mostrarError(tipoTarjeta, data.errors.tipoTarjeta);
            }
        });
    }




function mostrarError(input, mensaje) {
    
    const errorExistente = input.parentNode.querySelector('.error-message');
    if (errorExistente) {
        errorExistente.remove();
    }

    
    const errorContainer = document.createElement('p');
    errorContainer.textContent = mensaje;
    errorContainer.classList.add('error-message', 'text-danger');
    input.parentNode.appendChild(errorContainer);
}


function limpiarError(input) {
    const errorExistente = input.parentNode.querySelector('.error-message');
    if (errorExistente) {
        errorExistente.remove();
    }
}