import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
} from 'react-native';
import {  Input } from "./";
import { argonTheme } from "../constants";
class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
    haveValue:false,
  };

  handleFocus = () => {
    this.setState({...this.state, isFocused: true });

  }
  
  handleBlur = (valor) => this.setState({isFocused: false });
  handleEdit= (inputInfo) => 
    {
    
    if(!inputInfo["nativeEvent"]["text"].trim()){
    
      this.setState({ isFocused:false, haveValue: false });
    }else{
      this.setState({ isFocused:false, haveValue: true });
    }
  }
 
  

  

  render() {
    
    const { label,date,error,fixedLabel,errorMessage,...props } = this.props;
    
    
    const isFocused = this.state.isFocused;
    const haveValue= this.state.haveValue;
   
    const labelStyle = {
      position: 'absolute',
      left: 20,
      top: isFocused || haveValue ? 15 : 28,
      fontSize: isFocused || haveValue ? 14 : 17,
      color: isFocused || haveValue ?  '#5e72e4': '#aaa',
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
    const errorMessageStyle={
      color: argonTheme.COLORS.MESSAGE_ERROR,
      left:5
    }
    

    return (
      
      <View style={{flex:1}}>
        
        <Text onPress={() => {this.input.focus()}}
        style={fixedLabel? fixedLabelStyle: labelStyle} >
          {label}
        </Text>
        <TextInput
        
        ref={input => { this.input = input}}
          
          style={textInputStyle}
          onFocus={this.handleFocus}
          onEndEditing={this.handleEdit}
          {...props}
          
        />
          <View style={{zIndex:1}}>
              <Input
                focus={isFocused && errorMessage == undefined}
                error={errorMessage == undefined ? false : true}
                editable={false}
                right
                  iconContent={
                    props.iconContent
                  }
                  
                />
            </View>
            {errorMessage==undefined? null : 
            <Text style={errorMessageStyle}>{errorMessage}</Text> 
            }
            
        </View>
      
    );
  }
}
export default FloatingLabelInput;