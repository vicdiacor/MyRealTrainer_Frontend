export default function validateEjercicioForm(form){

    let errors = {}
    
  
    // Validacion titulo
    if(!form.titulo.trim()){
        errors.titulo= "El título es un campo obligatorio" 
    }else if(form.titulo.length>100){
        errors.titulo= "El título no puede tener más de 100 caracteres" 
    }

    // Preparación Validation 
    if(form.preparacion.length>500){
        errors.preparacion= "La preparación no puede tener más de 500 caracteres" 
    }

    
    // Ejecucion Validation
    if(form.ejecucion.length>500){
        errors.ejecucion= "La ejecución no puede tener más de 500 caracteres" 
    }
    
     // Consejos Validation
     if(form.consejos.length>500){
        errors.consejos= "Los consejos no pueden tener más de 500 caracteres" 
    }
    
    
    
    return errors
}