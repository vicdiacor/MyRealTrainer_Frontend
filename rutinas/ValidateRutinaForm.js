export default function validateRutinaForm(form,entrenamientos){

    let errors = {}
    
  
    // Validacion titulo
    if(!form.titulo.trim()){
        errors.titulo= "El título es un campo obligatorio" 
    }else if(form.titulo.length>100){
        errors.titulo= "El título no puede tener más de 100 caracteres" 
    }

    // Descripcion Validation 
    if(form.descripcion.length>300){
        errors.descripcion= "La descripción no puede tener más de 300 caracteres" 
    }

    // Entrenamientos Validation
    if(entrenamientos.length<1){
        errors.entrenamientos = "Debes agregar al menos un entrenamiento"
    }
   


    return errors
}