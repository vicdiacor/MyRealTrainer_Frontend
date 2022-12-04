import React, { Component,useState,useRef, useEffect } from 'react';
import {
  View,
  TextInput,Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {  Input } from "./";
import { argonTheme } from "../constants";
import formErrorMessage from './FormErrorMessage';
function FloatingLabelInput ({label,date,error,fixedLabel,errorMessage,multiline,initialNumberOfLines,textCounter,maxLength,placeholderFontSize,value,...props}) {
  

  
  const [isFocused,setIsFocused]=useState(false)
  const [haveValue,setHaveValue]=useState(value)

  const [dynamicHeight, setDynamicHeight]=useState(21)
  const textInputRef = useRef(null);


  const handleFocus = () => {
    setIsFocused(true)

  }
  
  
  const handleEdit= (inputInfo) => 
    {
    
      setIsFocused(false)
  }
   
    const labelStyle = {
      position: 'absolute',
      left: 20,
      top: isFocused || value  ? 15 : 28,
      fontSize: isFocused || value  ? 14 : (placeholderFontSize==undefined? 17: placeholderFontSize),
      color: isFocused || value ?  '#5e72e4': '#aaa',
      zIndex: 4,
      flex: props.iconContent==undefined? 0.87: 0.72,
      flexDirection: 'row',      
      width: props.iconContent==undefined? '87%':'72%',
      fontWeight: isFocused  || value?   "bold": null
      
    };
    const fixedLabelStyle = {
      position: 'absolute',
      left: 20,
      top:  15,
      fontSize:  14,
      color: '#5e72e4',
      zIndex: 4,
      flex: props.iconContent==undefined? 0.87: 0.72,
      flexDirection: 'row',      
      width:props.iconContent==undefined? '87%':'72%',
      fontWeight: "bold"
      
    };
    const textInputStyle = { 
      position: 'absolute',
      left: 20,
      top: 36,
      zIndex: 5,
      minHeight:21,
      fontSize: 17,
      color: '#000',
      flex: props.iconContent==undefined? 0.87: 0.72,
      flexDirection: 'row',      
      width:props.iconContent==undefined? '87%':'72%',
      
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
      
      <View style={{flex:1, alignSelf:"baseline"}}>
       
        <TouchableWithoutFeedback onPress={() => {textInputRef.current.focus()}} >
        <View>
        <Text
        style={fixedLabel? fixedLabelStyle: labelStyle} >
          {label}
        </Text>
        
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
          <View  style={{zIndex:1}}>
              <Input
              
                dynamicHeight={dynamicHeight}
                multiline={multiline==undefined? false:true}
                initialNumberOfLines={initialNumberOfLines}
                focus={isFocused && errorMessage == undefined}
                error={errorMessage == undefined ? false : true}
                editable={false}
                right
                  iconContent={
                    props.iconContent
                  }
                  
                />
            </View>
          </View>
          </TouchableWithoutFeedback>
          
            {textCounter!=undefined?
            <Text  style={textCounterStyle}>{textCounter.length}{maxLength!=undefined?"/"+maxLength:null}</Text> : null}
            {errorMessage==undefined? null : 
            <Text style={errorMessageStyle}>{errorMessage}</Text> 
            }


        </View>
      
    );
  
}
export default FloatingLabelInput;