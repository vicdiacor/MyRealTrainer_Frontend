import {Alert} from "react-native";

const backendFormatLugar=(tipoLugar)=>{
    var res=""
    switch(tipoLugar){
        case "Telemático":
            res="TELEMATICO"
            break
        case "Aire libre":
            res="AIRE_LIBRE"
            break
        case "Mi gimnasio":
            res="MI_GIMNASIO"
            break
        case "Tu domicilio":
            res="TU_DOMICILIO"
            break
        case "Otro":OTRO
            res="OTRO"
            break
    }
    return res
}

const frontendFormatLugar=(tipoLugar)=>{
    var res=""
    switch(tipoLugar){
        case "TELEMATICO":
            res="Telemático"
            break
        case "AIRE_LIBRE":
            res="Aire libre"
            break
        case "MI_GIMNASIO":
            res="Mi gimnasio"
            break
        case "TU_DOMICILIO":
            res="Tu domicilio"
            break
        case "OTRO":
            res="Otro"
            break
    }
    return res
}

const showBackendErrors= (response) =>{ // Display the backend errors in case of a failure http response
    response.json().then(res => {

        if(res.hasOwnProperty("errores")){ // show controlled Errors
            var errores= res.errores
            for (var i=0; i<errores.length; i++){
                
                Alert.alert(
                    "Error",
                    errores[i],
                    [
                      
                      { text: "OK"}
                    ]
                  );

                
                
            }
            
        } else{ // No controlled errors
            
           

        }
    })
}

export {frontendFormatLugar,backendFormatLugar,showBackendErrors}

