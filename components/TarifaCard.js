import React, { useState, useCallback, useEffect } from 'react';
import { Block,Text, Checkbox} from "galio-framework";
import { StyleSheet, TouchableWithoutFeedback, Image, View} from 'react-native';
import {  argonTheme } from "../constants";
import { Icon, Button } from '.';
import CheckBoxLugarEntrenamiento from './CheckBoxLugarEntrenamiento';

export default function TarifaCard ({tarifa,style}){
    console.log("TARIFA CARD")
    console.log(tarifa["lugaresChecked"])
    return (
         
          <Block  style={[styles.containerStyle,style]}  flex  >
            <Block marginTop={20} middle flex row> 
              <Text   
                      h5
                      bold
                      
                      color={argonTheme.COLORS.BLACK}
                  >{tarifa["titulo"]}</Text>
            </Block>
            <Block marginTop={20} center flex row> 
            
              <Text h5 bold color={argonTheme.COLORS.PRIMARY}>{tarifa["precio"]}€ | {tarifa["tipoDuracion"]}</Text>

            </Block>
            <Block marginTop={20} center flex row> 
            
              <Text h6 bold color={argonTheme.COLORS.BLACK}>Limitaciones</Text>

            </Block>
            <Block width={"75%"} marginTop={20} center flex row> 
            
            <Text center style={{textAlign:'justify'}} size={18}>Muchisimas limitaciones jeje pero es que mira qué pedazo de limitacioines que se sale to y no se que hacer</Text>

            </Block>
          
          <Block marginTop={20} center flex row> 
            
            <Text h6 style={{textAlign:'center'}} bold color={argonTheme.COLORS.BLACK}>Lugares</Text>

          </Block>
            {Object.entries(tarifa["lugaresChecked"]).map(([key, value]) => 
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
            <Block marginTop={50}></Block>
          </Block>

    
        
       
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