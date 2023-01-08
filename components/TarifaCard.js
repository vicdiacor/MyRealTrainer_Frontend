import React, { useState, useCallback, useEffect } from 'react';
import { Block,Text} from "galio-framework";
import { StyleSheet, Dimensions, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import {  argonTheme } from "../constants";
import { Button } from '.';
import CheckBoxLugarEntrenamiento from './CheckBoxLugarEntrenamiento';
import { yesOrNotAlertMessage } from '../util/UtilFunctions';


export default function TarifaCard ({tarifa,style,onPressContainer,deleteFunction}){
  console.log("TARIFA");
  console.log(tarifa)
  // Returns only the duration type if it´s duration is "1" and returns the duration and it´s type in plural otherwise  
  function formatDuration(duracion,tipoDuracion){
    let message = ""
    let plurals = {"AÑO":"AÑOS","MES":"MESES","SEMANA":"SEMANAS","DIA":"DÍAS","HORA":"HORAS"}
    Number(duracion)> 1 ? message+= duracion + " " + plurals[tipoDuracion] : message += tipoDuracion
    return message
  }

  const { width, height } = Dimensions.get("screen");
  const [isLoading, setIsLoading]=useState(true)

  const [lugares,setLugares]=useState({})

  useEffect(()=>{
    setIsLoading(true)
    setLugaresInPairs()
    setIsLoading(false)
    console.log("LUGARES RESULTANTES")
    console.log(lugares)
  },[tarifa])

  function setLugaresInPairs(){
    let lugaresEntrenamiento = tarifa["lugares"]
    let isArray = Array.isArray(lugaresEntrenamiento) // This component can be rendered using a JSON or an ARRAY
    console.log("IS ARRAY")
    console.log(isArray)
    var lugaresRow= {}
    var numLugares= isArray ? lugaresEntrenamiento.length : Object.keys(lugaresEntrenamiento).length
    var i = isArray ? 0 : 1;
    var numRow= isArray ? 0 : 1;
    var lastIndex = isArray ? numLugares - 1 : numLugares
    while(i<=lastIndex){
        if(numLugares % 2==0 ){ // even places
          lugaresRow[numRow]=[lugaresEntrenamiento[i],lugaresEntrenamiento[i+1]]
          i+=2
          numRow+=1
        }else{ // odd places
          if(i<numLugares-1){
            lugaresRow[numRow]=[lugaresEntrenamiento[i],lugaresEntrenamiento[i+1]]
            i+=2
            numRow+=1
          }else{
            lugaresRow[numRow]=[lugaresEntrenamiento[i],null]
            i+=1
            numRow+=1
          }
        }

    }
    
    
    setLugares(lugaresRow)
  }
    return (
      <TouchableWithoutFeedback style={{zIndex:10}} onPress={onPressContainer}>

          <Block  style={[styles.containerStyle,style]} flex>
            <Block marginTop={20} middle flex row> 
              <Text   
                      h6
                      bold
                      
                      color={argonTheme.COLORS.BLACK}
                  >{tarifa["titulo"]}</Text>
            </Block>
            <Block marginTop={20} center flex row> 
            
              <Text h6 bold color={argonTheme.COLORS.PRIMARY}>{tarifa["precio"]}€ | {formatDuration(tarifa["duracion"],tarifa["tipoDuracion"])}</Text>

            </Block>
          
            {tarifa["limitaciones"]!==undefined && !/^\s*$/.test(tarifa["limitaciones"]) ?  
            <>
                  <Block marginTop={20} center flex row> 
            
                    <Text h6 bold color={argonTheme.COLORS.BLACK}>Limitaciones</Text>

                </Block>
                <Block width={"75%"} marginTop={20} center flex row> 
            
                    <Text center style={{textAlign:'justify'}} size={17}>{tarifa["limitaciones"]}</Text>
    
                </Block>

            </>
              
            : null}
          
          <Block marginTop={20} center flex row> 
            
            <Text h6 style={{textAlign:'center'}} bold color={argonTheme.COLORS.BLACK}>Lugares</Text>

          </Block>
          {isLoading ? 
                 
                 <Block center marginTop={100}>
                 <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                 </Block>
                 :
          <>
          {Object.entries(lugares).map(([key, value]) => 
                (
              <Block marginTop={20} center  row>
                <Block  row style={{width:value[1]!==null ? "45%":"90%",marginTop:10,marginLeft:value[1]!==null ?"1.5%":null}}>
                 
                <CheckBoxLugarEntrenamiento
                reducedMode={value[1]!==null}
                enableCheckbox={false}
                onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"lugar":value[0]})} 
                lugar={value[0]}
                
                >    
                </CheckBoxLugarEntrenamiento>
                </Block>
                
                {value[1]===null? 
                 null
                :
                <Block  row style={{width:"45%",marginTop:10,marginLeft:"1.5%",marginRight:"1.5%"}}>
                 <CheckBoxLugarEntrenamiento
                reducedMode
                enableCheckbox={false}
                onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"lugar":value[1]})} 
                lugar={value[1]}
                
                >    
                </CheckBoxLugarEntrenamiento> 
                </Block> 
                } 
              </Block>
            ))
            }
          </>
            }
        
            {deleteFunction?
            <Block  flex marginTop={40} width="100%" center>

              
            <Button  onPress={yesOrNotAlertMessage("Eliminar tarifa","¿Estás seguro de eliminar la tarifa '"
             + tarifa["titulo"] + "' ?",deleteFunction)} color="DELETE_BUTTON">
              <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                Eliminar
              </Text>
            </Button>
          </Block> 
            : null}
            <Block flex marginTop={50}></Block>
          </Block>
          </TouchableWithoutFeedback>
    
        
       
    )
}


const styles = StyleSheet.create({
   containerStyle: {
    backgroundColor:"#FFFF",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
    borderWidth:1,
    borderRadius: 10,
    borderColor: argonTheme.COLORS.BORDER,
  }
  
  });