export default function validateSeriesForm(form){

    let errors = {}

     // NumSeries Validation
    if(!form.numSeries.trim()){
      errors.numSeries= "El número de series es un campo obligatorio" 
  } else if(isNaN(+form.numSeries)){
      errors.numSeries= "El número de series debe ser un número"
  } else if (+form.numSeries > 20){
      errors.numSeries= "No puedes añadir más de 20 series"
  } else if (+form.numSeries < 1){
      errors.numSeries= "El número de series debe ser mayor o igual que 1"
  } else {
      if(Number.isInteger(form.numSeries)){
          errors.numSeries= "El número de series debe ser un número entero"
      }
  }

    // Descanso entre series Validation
    let descansoEntreSeries= form.minutosDescanso + ":" + form.segundosDescanso
    if(!/^\d\d:\d\d$/.test(descansoEntreSeries)){
      errors.descansoEntreSeries= "El descanso entre series debe tener el formato mm:ss" 
    } else if(+form.minutosDescanso > 29){
      errors.descansoEntreSeries= "No puedes insertar más de 29:59 min de descanso" 
    } else if(+form.segundosDescanso > 59){
      errors.descansoEntreSeries= "La sección de 'segundos' no puede ser mayor a 59" 
    }

    // Serie validations
    form.series.forEach((serie,index) => {
      let errorsSerie= {}

       // Tiempo-Series validation
      if (form.tipoSeries == "tiempo"){
         
        let duracion= serie.horas + ":" + serie.minutos + ":" + serie.segundos
        if(!/^\d\d:\d\d:\d\d$/.test(duracion)){
          errorsSerie.duracion= "La duración de la serie debe tener el formato HH:mm:ss" 
        } else if(+serie.horas > 4){
          errorsSerie.duracion= "No puedes insertar más de 04:59:59 horas de descanso" 
        } else if(+serie.minutos > 59){
          errorsSerie.duracion = "La sección de 'minutos' no puede ser mayor a 59" 
        }else if(+serie.segundos > 59){
          errorsSerie.duracion = "La sección de 'segundos' no puede ser mayor a 59" 
        }else if(/^00:00:00$/.test(duracion)){
          errorsSerie.duracion = "La duración de una serie debe ser mayor a 00:00:00"
      }
      }else { // Repeticiones-Series validation
        if(!serie.numRepeticiones.trim()){
          errorsSerie.numRepeticiones= "El número de repeticiones es un campo obligatorio" 
        } else if( !/^\d\d?\d?$/.test(serie.numRepeticiones)){
          
          errorsSerie.numRepeticiones = "El número de repeticiones debe ser un número entero de máximo 3 cifras"
        }else if(+serie.numRepeticiones<1){
          errorsSerie.numRepeticiones = "El número de repeticiones debe ser mayor o igual que 1"
        }
  
          // Peso validation
        if(!/^\d?\d?\d?.?\d?\d?/.test(serie.peso)){
          errorsSerie.peso = "El peso debe ser un número que tenga como máximo 3 cifras enteras y 2 decimales"
        }else if(+serie.peso > 999){
          errorsSerie.peso = "El peso no puede ser mayor a 999 kg"
        }else if(+serie.peso < 0 ){
          errorsSerie.peso = "El peso no puede ser un número negativo"
        }
      }
      
      if(Object.keys(errorsSerie).length >0){
      
        errors[""+index]=errorsSerie
      }

    })

     // Ejercicio validation

     if(!(""+form.ejercicio.id).trim() || !Number.isInteger(form.ejercicio.id)){
      errors.ejercicio = "El ejercicio asociado no existe en el sistema"
     }
    
   
    
    return errors
}