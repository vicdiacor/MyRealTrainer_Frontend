export default function validateCrearServicio(form){

    let errors = {}
  
    // Validacion titulo
    if(!form.titulo.trim()){
        errors.titulo= "El título es un campo obligatorio" 
    }else if(form.titulo.length>80){
        errors.titulo= "El título no puede tener más de 80 caracteres" 
    }


    // Validacion descripcion
    if(!form.descripcion.trim()){
        errors.descripcion= "La descripción es un campo obligatorio" 
    }else if(form.descripcion.length>500){
        errors.descripcion= "La descripción no puede tener más de 500 caracteres" 
    }
    
    return errors
}