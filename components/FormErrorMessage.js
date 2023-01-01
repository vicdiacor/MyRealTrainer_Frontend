import React from 'react';
import ErrorMessage from './ErrorMessage';


export default function formErrorMessage(jsonErrors,errorName){
    // Muestra el mensaje del error sólo si existe dentro de la colección de errores
    
    if(jsonErrors==undefined){
        return null
    }else{
        var error=jsonErrors[errorName]
        if (typeof error === 'string' || error instanceof String){
            return error
            
        } else {
            return null
        }
    }
}