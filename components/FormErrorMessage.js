import React from 'react';
import ErrorMessage from './ErrorMessage';


export default function formErrorMessage(jsonErrors,errorName){
    // Muestra el mensaje del error sólo si existe dentro de la colección de errores
    var error= jsonErrors[errorName]
    if (typeof error === 'string' || error instanceof String){
        return error
        
    } else {
        return null
    }
    


}