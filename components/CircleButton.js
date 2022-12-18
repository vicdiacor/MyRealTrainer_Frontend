import React from 'react';
import { Block } from "galio-framework";
import {  argonTheme } from "../constants";
import {Icon, Button} from "./";
const { width, height } = Dimensions.get("screen");
import { Dimensions} from 'react-native';

export default function CircleButton({onPress,style,nameIcon,colorCircle, colorIcon,familyIcon,sizeIcon,widthButton}){
    
    const standardStyle={ 
        zIndex:10,
        borderRadius: 100,
        width: widthButton? widthButton:width*0.13,
        height: widthButton? widthButton:width*0.13,
        color: colorCircle? colorCircle:argonTheme.COLORS.PRIMARY,
        backgroundColor: colorCircle? colorCircle: argonTheme.COLORS.PRIMARY,
        
    }


    

    return (
        
            <Button  onPress={onPress?onPress:null} style={style?style:standardStyle}>
                        <Icon
                        
                        size={sizeIcon?sizeIcon:20}
                        color={colorIcon? colorIcon:argonTheme.COLORS.WHITE}
                        name={nameIcon? nameIcon:"plus"}
                        family={familyIcon? familyIcon:"Entypo"}
                        style={{alignSelf: "center"}}
                        
                        />
            </Button>
       
        )
}
