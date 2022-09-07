import React, { useState } from 'react';
import { Block, Text } from "galio-framework";
import { StyleSheet,Dimensions, TouchableWithoutFeedback, Image, View} from 'react-native';
import {  argonTheme } from "../constants";
import RNPickerSelect from "react-native-picker-select";


export default function SelectPicker ({title,onValueChange,value,errorMessage,items,width,height}){
    
    const pickerContainerStyle={
        
        backgroundColor:"#FFFF",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
        borderWidth:1,
        borderColor: errorMessage==undefined? argonTheme.COLORS.BORDER :"#FC7370",
        borderRadius: 4,
        
    }

    return (
        <>
        <Block height={height!=undefined? height:null} width={width} style={pickerContainerStyle}>
        {title==undefined ? null :
        <Text style={{marginLeft:15,marginTop:"3%",color:'#5e72e4', fontWeight:"bold"}}>{title}</Text>
        }
        <RNPickerSelect
                value={value}
                onValueChange={onValueChange}
                items={items}
            />
    </Block>
    {errorMessage== undefined? null : 
        <Text style={{ 
            marginTop:7,
            color: argonTheme.COLORS.MESSAGE_ERROR,
            left:5,
            }}>{errorMessage}</Text> 
       
         
    }
    </>

    
        
       
    )
}