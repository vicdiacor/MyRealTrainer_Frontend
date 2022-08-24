import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';
import { Button, Icon, Input } from "./";
import { argonTheme } from "../constants";
import { datePicker,dateTimeFormat} from './Dates';
class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => {
    this.setState({ isFocused: true });

  }
  handleBlur = (valor) => this.setState({ isFocused: false });
  handleEdit= (inputInfo) => 
  {
  
  if(!inputInfo["nativeEvent"]["text"].trim()){
  
    this.setState({ isFocused: false });
  }else{
    this.setState({ isFocused: true });
  }
}

  

  render() {
 
    const { label,date,...props } = this.props;
    const { isFocused, presentValue} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 20,
      top: !isFocused ? 28 : 15,
      fontSize: !isFocused ? 17 : 14,
      color: !isFocused ? '#aaa' : '#5e72e4',
      zIndex: 4
      
    };
    const textInputStyle = { 
      position: 'absolute',
      left: 20,
      top: 40,
      zIndex: 5, 
      height: 21, 
      fontSize: 17, 
      color: '#000',
      
      
    };
    return (
      
      <View>
        <Text onPress={() => {this.input.focus()}}
        style={labelStyle} >
          {label}
        </Text>
        <TextInput
        
        ref={input => { this.input = input}}
          {...props}
          style={textInputStyle}
          onFocus={this.handleFocus}
          onEndEditing={this.handleEdit}
          
        />
         <Input
          editable={false}
           right
            iconContent={
              props.iconContent
            }
            
          />
         
        </View>
      
    );
  }
}
export default FloatingLabelInput;