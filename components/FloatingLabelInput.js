import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';
import { Button, Icon, Input } from "./";
import { argonTheme } from "../constants";
import {Block} from 'galio-framework';
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
  handleChangeText= (texto) => {
    console.log("ahwdawwa")
    console.log(texto)
  }
  

  

  render() {
    
    const { label,date,fixedLabel,...props } = this.props;
    
    
    const { isFocused, presentValue} = this.state;
    
    const labelStyle = {
      position: 'absolute',
      left: 20,
      top: !isFocused ? 28 : 15,
      fontSize: !isFocused ? 17 : 14,
      color: !isFocused ? '#aaa' : '#5e72e4',
      zIndex: 4,
      flex: this.props.iconContent==undefined? 0.87: 0.72,
      flexDirection: 'row',      
      width:this.props.iconContent==undefined? '87%':'72%',
      
    };
    const fixedLabelStyle = {
      position: 'absolute',
      left: 20,
      top:  15,
      fontSize:  14,
      color: '#5e72e4',
      zIndex: 4,
      flex: this.props.iconContent==undefined? 0.87: 0.72,
      flexDirection: 'row',      
      width:this.props.iconContent==undefined? '87%':'72%',
      
    };
    const textInputStyle = { 
      position: 'absolute',
      left: 20,
      top: 40,
      zIndex: 5, 
      height: 21, 
      fontSize: 17, 
      color: '#000',
      flex: this.props.iconContent==undefined? 0.87: 0.72,
      flexDirection: 'row',      
      width:this.props.iconContent==undefined? '87%':'72%',
    };
    return (
      
      <View style={{flex:1}}>
        
        <Text onPress={() => {this.input.focus()}}
        style={fixedLabel? fixedLabelStyle: labelStyle} >
          {label}
        </Text>
        <TextInput
        
        ref={input => { this.input = input}}
          {...props}
          style={textInputStyle}
          onFocus={this.handleFocus}
          onEndEditing={this.handleEdit}
          onChangeText={this.handleChangeText}
          
          
        />
          <View style={{zIndex:1}}>
              <Input
               
                editable={false}
                right
                  iconContent={
                    props.iconContent
                  }
                  
                />
            </View> 
        </View>
      
    );
  }
}
export default FloatingLabelInput;