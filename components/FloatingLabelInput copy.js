import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';
import { Button, Icon, Input } from "./";
import { argonTheme } from "../constants";
class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
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
    const { label,...props } = this.props;
    const { isFocused, presentValue} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: !isFocused ? 18 : 5,
      fontSize: !isFocused ? 17 : 14,
      color: !isFocused ? '#aaa' : '#5e72e4',
      
      
    };
    return (
      
      <View>
        <Text onPress={() => {this.input.focus()}}
        style={[labelStyle, { zIndex: 4, transform: [{translateY: 30 },{translateX:22}]}]} >
          {label}
        </Text>
        <TextInput
        ref={input => { this.input = input}}
          {...props}
          style={{ zIndex: 5, height: 21, fontSize: 17, color: '#000',transform: [{translateY: 60},{translateX:22}] }}
          onFocus={this.handleFocus}
          onEndEditing={this.handleEdit}
         
        />
         <Input
          editable={false}
           right
            iconContent={
              <Icon
                
                size={20}
                color={argonTheme.COLORS.ICON}
                name="ic_mail_24px"
                family="ArgonExtra"
                style={{marginRight: 8}}
              />
            }
          />
        </View>
      
    );
  }
}
export default FloatingLabelInput;