
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

export {frontendFormatLugar,backendFormatLugar}

