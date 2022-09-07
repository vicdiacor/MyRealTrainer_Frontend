import React, { useState, useCallback, useEffect } from 'react';
import { Block,Text, Checkbox} from "galio-framework";
import { StyleSheet, TouchableWithoutFeedback, Image, View} from 'react-native';
import {  argonTheme } from "../constants";
import { Icon, Button } from '.';


export default function CheckBoxLugarEntrenamiento ({lugar,onPress,onChangeCheckbox,enableCheckbox}){
    
    const [numberLines,setNumberLines]= useState(64)
    const containerStyle= {
      width:"100%",
      height: 64 + ((numberLines-1)*22),
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
    const  circleButtonStyle= {
      marginTop:11 + 3.8*(numberLines-1),
      marginLeft: "5%",
      marginRight: "6%",
      zIndex:10,
      borderRadius: 100,
      width: 40,
      height: 40,
      color: argonTheme.COLORS.PRIMARY,
      backgroundColor: argonTheme.COLORS.PRIMARY,
  }

    const  textStyle={
      color: argonTheme.COLORS.BLACK,
      top:16,
      textAlign: "left",
      marginLeft: "20%"
      }

    const handleOnTextLayout = (ev) => {
      
      setNumberLines(ev.nativeEvent.lines.length)
    }


    return (
         
          <Block style={containerStyle}  flex row  >
              <Block style={{ width:enableCheckbox? "60%":"70%"}}> 
                <Text style={textStyle} onTextLayout={handleOnTextLayout}  color={argonTheme.COLORS.BLACK} bold size={20}>{lugar["titulo"]}</Text>
              </Block>
               <Button onPress={onPress} style={circleButtonStyle}>
                            <Icon
                            size={17}
                            color={argonTheme.COLORS.WHITE}
                            name="navigate-next"
                            family="MaterialIcons"
                            style={{alignSelf: "center"}}
                            />
                </Button>
                {enableCheckbox ? <Checkbox 
                        onChange={onChangeCheckbox}
                        checkboxStyle={styles.checkbox}
                        color={argonTheme.COLORS.ICON}
                        
                        
                      /> : null
               }
                
            </Block>

    
        
       
    )
}


const styles = StyleSheet.create({
  
   

 checkbox:{
    borderWidth: 2,
    width:35,
    height:35,
}
  });