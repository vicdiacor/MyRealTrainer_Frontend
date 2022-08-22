import {calculateAge } from '../Util/Dates';
export default function validateRegistroForm(form){

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


    
    // Validacion nombre
    if(!form.nombre.trim()){
        errors.nombre= "El nombre es un campo obligatorio" 
    }else if(form.nombre.length>25){
        errors.nombre= "El nombre no puede tener más de 25 caracteres" 
    }

    
    // Validacion apellido
    if(!form.apellidos.trim()){
        errors.apellidos= "Los apellidos son un campo obligatorio" 
    }else if(form.apellidos.length>50){
        errors.apellidos= "Los apellidos no pueden tener más de 50 caracteres" 
    }
  
    // Validación localidad
       // Validacion apellido
       if(!form.localidad.trim()){
        errors.localidad= "La localidad es un campo obligatorio" 
    }else if(form.localidad.length>100){
        errors.localidad= "La localidad no puede tener más de 100 caracteres" 
    }
  

    // Validación fecha de nacimiento
      var fechaActual = new Date();
      if (form.fechaNacimiento>fechaActual){
          errors.fechaNacimiento= "La fecha de nacimiento no puede ser en el futuro" 
      }else if(calculateAge(form.fechaNacimiento)<18){
        errors.fechaNacimiento= "Para acceder a esta aplicación debes tener al menos 18 años" 
      }

    return errors
}