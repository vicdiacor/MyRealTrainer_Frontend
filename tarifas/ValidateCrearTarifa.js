export default function validateCrearTarifa(form,lugaresChecked){

    let errors = {}
  
    // Validacion titulo
    if(!form.titulo.trim()){
        errors.titulo= "El título es un campo obligatorio" 
    }else if(form.titulo.length>80){
        errors.titulo= "El título no puede tener más de 80 caracteres" 
    }

      // Validacion precio
      if(!form.precio.trim()){
        errors.precio= "El precio es un campo obligatorio" 
    } else if(isNaN(+form.precio)){
        errors.precio= "El precio debe ser un número"
    } else if (+form.precio > 10000){
        errors.precio= "El precio no puede ser mayor a 10000€"
    } else if (+form.precio < 0){
        errors.precio= "El precio no puede ser un número negativo"
    } else {
        var m = Number((Math.abs(+form.precio) * 100).toPrecision(15));
        var value= Math.round(m) / 100 * Math.sign(+form.precio);
        if(value!=+form.precio){
            errors.precio= "El precio no puede contener más de 2 decimales"
        }
    }

    // Validacion duración
    if(!form.duracion.trim()){
        errors.duracion= "La duración es un campo obligatorio" 
    } else if(isNaN(+form.duracion)){
        errors.duracion= "La duración debe ser un número"
    } else if (+form.duracion > 100){
        errors.duracion= "La duración no puede ser mayor a 100"
    } else if (+form.duracion < 0){
        errors.duracion= "La duración no puede ser un número negativo"
    } else {
        if(Number.isInteger(form.duracion)){
            errors.duracion= "La duración debe ser un número entero"
        }
    }



    // Validacion limitaciones
    if(form.limitaciones.length>500){
        errors.limitaciones= "Las limitaciones no pueden tener más de 500 caracteres" 
    }

    // Validation tipo de duración
    
    if(form.tipoDuracion== null || (form.tipoDuracion!=="MES" && form.tipoDuracion!=="SEMANA" && form.tipoDuracion!=="HORA" && form.tipoDuracion!=="AÑO" && form.tipoDuracion!=="DIA")){
        errors.tipoDuracion="El tipo de duración solo puede ser 'años','meses', 'semanas','dias' u 'horas'"
    }

    // Validation training places
    if(Object.keys(lugaresChecked).length<1){
        errors.lugaresChecked= "Debes seleccionar al menos un lugar de entrenamiento" 

    }

    return errors
}