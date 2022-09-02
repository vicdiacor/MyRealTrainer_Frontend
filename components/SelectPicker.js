import React, { useState } from 'react';
import { Block, Text } from "galio-framework";
import { StyleSheet,Dimensions, TouchableWithoutFeedback, Image, View} from 'react-native';
import {  argonTheme } from "../constants";
import RNPickerSelect from "react-native-picker-select";


export default function SelectPicker ({title,onValueChange,value,items,width,height}){
    
    

    return (
         
        <Block height={height!=undefined? height:null} width={width} style={styles.pickerContainer}>
        {title==undefined ? null :
        <Text style={{marginLeft:15,marginTop:"3%",color:'#5e72e4', fontWeight:"bold"}}>{title}</Text>
        }
        <RNPickerSelect
                value={value}
                onValueChange={onValueChange}
                items={items}
            />
    </Block>

    
        
       
    )
}


const styles = StyleSheet.create({
  
    pickerContainer:{
        
        backgroundColor:"#FFFF",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
        borderWidth:0.8,
        borderRadius: 4,
        borderColor: argonTheme.COLORS.BORDER,
        
    }
  
  });