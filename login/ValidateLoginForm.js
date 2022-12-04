export default function validateLoginForm(form){

    let errors = {}
   

    // Validacion email
    if(!form.email.trim()){
        errors.email= "El email es un campo obligatorio" 
    }else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email))){
        errors.email= "El email no tiene el formato correcto" 

    }else if(form.email.length>320){
        errors.email= "El email no puede tener más de 320 caracteres" 
    }

    // Validacion password
    if(!form.password.trim()){
        errors.password= "La contraseña es un campo obligatorio" 
    }else if(form.password.length>25){
        errors.password= "La contraseña no puede tener más de 25 caracteres" 
    }
    
    return errors
}