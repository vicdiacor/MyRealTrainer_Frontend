export default function validateEntrenamientoForm(form){

    let errors = {}
    
  
    // Titulo validation
    if(!form.titulo.trim()){
        errors.titulo= "El título es un campo obligatorio" 
    }else if(form.titulo.length>100){
        errors.titulo= "El título no puede tener más de 100 caracteres" 
    }

    // Bloques validation

    if(form.bloques.length<1){
        errors.bloques = "Debes agregar al menos un bloque de series"
    }

    return errors
}