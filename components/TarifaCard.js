import React, { useState, useCallback, useEffect } from 'react';
import { Block,Text, Checkbox} from "galio-framework";
import { StyleSheet, TouchableWithoutFeedback, Image, View} from 'react-native';
import {  argonTheme } from "../constants";
import { Icon, Button } from '.';
import CheckBoxLugarEntrenamiento from './CheckBoxLugarEntrenamiento';
import { yesOrNotAlertMessage } from '../util/UtilFunctions';

export default function TarifaCard ({tarifa,style,onPressContainer,deleteFunction}){
   
  // Returns only the duration type if it´s duration is "1" and returns the duration and it´s type in plural otherwise  
  function formatDuration(duracion,tipoDuracion){
    let message = ""
    let plurals = {"AÑO":"AÑOS","MES":"MESES","SEMANA":"SEMANAS","DIA":"DÍAS","HORA":"HORAS"}
    Number(duracion)> 1 ? message+= duracion + " " + plurals[tipoDuracion] : message += tipoDuracion
    return message
  }
    return (
      <TouchableWithoutFeedback style={{zIndex:10}} onPress={onPressContainer}>

          <Block  style={[styles.containerStyle,style]}  flex  >
            <Block marginTop={20} middle flex row> 
              <Text   
                      h5
                      bold
                      
                      color={argonTheme.COLORS.BLACK}
                  >{tarifa["titulo"]}</Text>
            </Block>
            <Block marginTop={20} center flex row> 
            
              <Text h5 bold color={argonTheme.COLORS.PRIMARY}>{tarifa["precio"]}€ | {formatDuration(tarifa["duracion"],tarifa["tipoDuracion"])}</Text>

            </Block>
            <Block marginTop={20} center flex row> 
            
              <Text h6 bold color={argonTheme.COLORS.BLACK}>Limitaciones</Text>

            </Block>
            <Block width={"75%"} marginTop={20} center flex row> 
            
            <Text center style={{textAlign:'justify'}} size={18}>{tarifa["limitaciones"]}</Text>

            </Block>
          
          <Block marginTop={20} center flex row> 
            
            <Text h6 style={{textAlign:'center'}} bold color={argonTheme.COLORS.BLACK}>Lugares</Text>

          </Block>
            {Object.entries(tarifa["lugares"]).map(([key, value]) => 
                (
                <Block flex row center style={{width:"90%",marginTop:"5%"}}>
                <CheckBoxLugarEntrenamiento
                enableCheckbox={false}
                onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"lugar":value})} 
                lugar={value}
                
                >
              
                
                </CheckBoxLugarEntrenamiento>
            </Block>))
           
            
            }
            {deleteFunction?
            <Block  marginTop={40} width="100%" center>

              
            <Button  onPress={yesOrNotAlertMessage("Eliminar tarifa","¿Estás seguro de eliminar la tarifa '"
             + tarifa["titulo"] + "' ?",deleteFunction)} color="DELETE_BUTTON">
              <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                Eliminar
              </Text>
            </Button>
          </Block> 
            : null}
            <Block marginTop={50}></Block>
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
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
  }
  
  });