import { useState } from "react";
import { Keyboard } from "react-native";
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
// Inserts a text inside another, at a specific index
function insertIntoString(initialText,index,textToInsert){
    return initialText.slice(0,index) + textToInsert + initialText.slice(index)
}

// Generates a list of "label:value" pairs,  from "initialNumber" to "lastNumber" to use in the "SegmentedPicker" component
function generateNumberSelectors(initialNumber,lastNumber,formatUnder10Numbers){
    let itemsArray= []
    for(let i=initialNumber;i<=lastNumber;i++){
      let selection={}
      if (formatUnder10Numbers && i<10){
        selection = {label: "0" + i, value: "0" + i}
      }else{
        selection = {label: "" + i, value: "" + i}
      }
      itemsArray.push(selection)

    }
    return itemsArray
  }

  // Dimiss the keyboard and then executes a function. Warning: This only works when Keyboard is opened previously
  function keyboardDimissAndExecuteFunction(funcion){
   
     
     const onDismissFunction = (event) => {
                Keyboard.removeListener('keyboardDidHide', onDismissFunction);
                funcion()
    }
    Keyboard.addListener('keyboardDidHide', onDismissFunction);
    Keyboard.dismiss();
    
  }
  



export {frontendFormatLugar,backendFormatLugar,showBackendErrors,insertIntoString,generateNumberSelectors,keyboardDimissAndExecuteFunction}

