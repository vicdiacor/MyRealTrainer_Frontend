import React, { Component,useState,useRef, useEffect } from 'react';
import {
  View,
  TextInput,Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {  Input } from "./";
import { argonTheme } from "../constants";
import formErrorMessage from './FormErrorMessage';
import { Block } from 'galio-framework';
function FloatingLabelInput ({label,date,error,fontSize,centerText,fixedLabel, onPress,iconContent,errorMessage,afterEditing,multiline,initialNumberOfLines,textCounter,maxLength,placeholderFontSize,value,...props}) {
  
  const [widthTextInput, setWidthTextInput]= useState(null)
 
  const [isFocused,setIsFocused]=useState(false)
  const [haveValue,setHaveValue]=useState(value)
  const [defaultMarginText,setDefaultMarginText]=useState(20);

  const [dynamicHeight, setDynamicHeight]=useState(21)
  const textInputRef = useRef(null);

  function calculateWidthText(widthTextInput){   // Tener en cuenta si hay emoji o no
    if(widthTextInput<101.82){ // Calcular la relación también teniendo en cuenta el left = 10 aqui también
      return 80
    }else{
        // From 3 different configurations, we calculate the parabola or the approximate relationship between the different widths
    var a = -98150 / 227175389;
    var b = 65534750 / 227175389;
    var c = 17725692617 / 454350778;
    return a * Math.pow(widthTextInput, 2) + b * widthTextInput + c;
    }
  }
  const handleFocus = () => {
    setIsFocused(true)

  }
  
  
  const handleEdit= (inputInfo) => // After editing a field
    {
     
      setIsFocused(false)
      afterEditing?afterEditing(inputInfo.nativeEvent.text):null
      
  }
   
    const labelStyle = {
      position: 'absolute',
      top: isFocused || value  ? 15 : 28,
      fontSize: isFocused || value  ? 14 : (placeholderFontSize==undefined? 17: placeholderFontSize),
      color: isFocused || value ?  '#5e72e4': '#aaa',
      zIndex: 4,
      fontWeight: isFocused  || value?   "bold": null
      
    };
    const fixedLabelStyle = {
      position: 'absolute',
      top:  15,
      fontSize:  14,
      color: '#5e72e4',
      zIndex: 4,   
      fontWeight: "bold"
      
    };
    const textInputStyle = { 
      position: 'absolute',
      top: label? 36:26,
      zIndex: 5,
      minHeight:21,
      fontSize: fontSize? fontSize:17,
      color: '#000',
      textAlign: centerText? 'center' :  'left'
      
    };
    const errorMessageStyle={
      color: argonTheme.COLORS.MESSAGE_ERROR,
      left:5,
      
    }
    const textCounterStyle={
      color:isFocused? argonTheme.COLORS.PRIMARY : argonTheme.COLORS.ICON,
      textAlign: 'right',
      fontWeight:isFocused? "600":"400"
      
    }

    return (
      
      <View style={{flex:1}} onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        setWidthTextInput(width);
        width < 101.82 ? setDefaultMarginText(10) : setDefaultMarginText(20)
      }} >
       
        <TouchableWithoutFeedback onPress={() => {
           onPress? onPress(): null
          textInputRef.current.focus()
         
        
        }} >
        <View >
          <Block  marginLeft={defaultMarginText} marginRight={iconContent==undefined? defaultMarginText : 65}>
            <Text
            style={fixedLabel? fixedLabelStyle: labelStyle} >
              {label}
            </Text>
            <Block center={centerText}>

          
              <TextInput
          
                  ref={textInputRef}
                    value={value}
                    maxLength={maxLength}
                    style={textInputStyle}
                    multiline={multiline}
                    onFocus={handleFocus}
                    onEndEditing={handleEdit}
                    onContentSizeChange={(event) => {
                      setDynamicHeight(event.nativeEvent.contentSize.height)
                    }}
                   
                    {...props}
                    
                  />
              </Block>
          </Block>
          <View  style={{zIndex:1}}>
              <Input
                haveLabel={label? true:false}
                dynamicHeight={dynamicHeight}
                multiline={multiline==undefined? false:true}
                initialNumberOfLines={initialNumberOfLines}
                focus={isFocused && errorMessage == undefined}
                error={errorMessage == undefined ? false : true}
                editable={false}
                right
                  iconContent={
                    iconContent
                  }
                  
                />
            </View>
          </View>
          </TouchableWithoutFeedback>
          
            {textCounter!=undefined?
            <Text  style={textCounterStyle}>{textCounter.length}{maxLength!=undefined?"/"+maxLength:null}</Text> : null}
            {errorMessage==undefined  || errorMessage=="" ? null : 
            <Text style={errorMessageStyle}>{errorMessage}</Text> 
            }


        </View>
      
    );
  
}
export default FloatingLabelInput;