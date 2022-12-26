export default function validateAfterRegister(trainerForm){

    let errors = {}
  
 
    // Validacion formacion
    if(!trainerForm.formacion.trim()){
        errors.formacion= "La formación es un campo obligatorio" 
    }else if(trainerForm.formacion.length>400){
        errors.formacion= "La formación no puede tener más de 400 caracteres" 
    }

    
    // Validacion experiencia
    if(trainerForm.experiencia.length>500){
        errors.experiencia= "El experiencia no puede tener más de 500 caracteres" 
    }

    // Validacion descripcion
    if(trainerForm.descripcion.length>500){
    errors.descripcion= "El experiencia no puede tener más de 500 caracteres" 
    }

    


    return errors
}