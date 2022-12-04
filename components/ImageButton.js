import React, { useState } from 'react';
import { Block, Text } from "galio-framework";
import { StyleSheet, TouchableWithoutFeedback, Image, View} from 'react-native';
   import {  argonTheme } from "../constants";


export default function ImageButton ({title,sourceParameter,selected}){
    
    

    const containerImageStyle= {
      borderRadius: 6 ,
      borderColor:selected ? argonTheme.COLORS.PRIMARY: argonTheme.COLORS.BORDER,
      borderWidth: selected ? 3:2,
    }

    return (
         
            <Block  middle flex style={containerImageStyle} >
                
                <Block   middle> 
                  <Image style={styles.image} source={sourceParameter}/>
                  <Text bold size={20} color={argonTheme.COLORS.ICON} style={styles.textInImage} flex={0.1}>{title}</Text> 
                </Block>
                    
            </Block>

    
        
       
    )
}


const styles = StyleSheet.create({
  
   
  image:{
      resizeMode: "contain",
      marginTop:"5%",
      marginBottom:"1%",
      
    }, textInImage:{
      marginBottom: "5%"
    }
  
  });