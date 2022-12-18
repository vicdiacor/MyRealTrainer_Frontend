export default function validateEntrenamientoForm(form){

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

    return errors
}