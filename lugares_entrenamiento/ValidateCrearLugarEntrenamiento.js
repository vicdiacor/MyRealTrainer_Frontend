export default function validateCrearLugarEntrenammiento(form){

    let errors = {}
    
  
    // Validacion titulo
    if(!form.titulo.trim()){
        errors.titulo= "El título es un campo obligatorio" 
    }else if(form.titulo.length>80){
        errors.titulo= "El título no puede tener más de 80 caracteres" 
    }

    
    // Validacion descripcion
    if(form.descripcion.length>500){
        errors.descripcion= "La descripcion no puede tener más de 500 caracteres" 
    }

    // Validacion calle
    if(form.calle.length>100){
        errors.calle= "La calle no puede tener más de 100 caracteres" 
    }

    // Validacion numero
      if(form.numero.length>5){
        errors.numero= "El número de dirección no puede tener más de 5 caracteres"
    }else if(form.numero.trim() && !form.calle.trim()){
        errors.numero="El número de dirección requiere de una calle previa"
    }

    
    // Validacion piso
    if(form.piso.length>5){
        errors.piso= "El piso no puede tener más de 5 caracteres"
    }else if(form.piso.trim() && !form.numero.trim()){
        errors.piso="El piso requiere de un número de dirección previo"
    }

     // Validacion ciudad
     if(form.ciudad.length>100){
        errors.ciudad= "La ciudad no puede tener más de 100 caracteres"
    }

    // Validacion provincia
    if(form.provincia.length>100){
    errors.provincia= "La provincia no puede tener más de 100 caracteres"
    }
    
    // Validacion tipoLugar
    if( form.tipoLugar!=="Mi gimnasio" && form.tipoLugar!=="Mi domicilio" && form.tipoLugar!=="Otro" 
    && form.tipoLugar!=="Aire libre" && form.tipoLugar!=="Telemático"){
    errors.tipoLugar= "El tipo de lugar debe ser alguno de los siguientes: 'Mi gimnasio'," +
    " 'Mi domicilio', 'Aire libre', 'Telemático' u 'Otro'"
    }
    
     // Validación Código Postal
    if(form.codigoPostal.trim() && !(/^\d{5}$/.test(form.codigoPostal))){
        errors.codigoPostal= "El código postal debe ser un número de exactamente 5 cifras"
    }

    return errors
}