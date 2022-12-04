import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import PropTypes from 'prop-types';
import FloatingLabelInput from "./FloatingLabelInput";
import { Block, Input,Text } from "galio-framework";

import Icon from './Icon';
import { argonTheme } from "../constants";

class ArInput extends React.Component {
  render() {
    const { shadowless, success, error,focus,multiline,initialNumberOfLines,dynamicHeight} = this.props;
  
    const inputStyle = {
      borderWidth:1,
      borderRadius: 4,
      borderColor: argonTheme.COLORS.BORDER,
      height: multiline ? (initialNumberOfLines? Math.max(64+(19*(initialNumberOfLines-1)),dynamicHeight+46):Math.max(148,dynamicHeight+60)):65 ,
      minHeight: 64,
      backgroundColor: '#FFFFFF'
    }
    const inputStyles = [
      inputStyle,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,
      focus && styles.focus,

      
     
      {...this.props.style}
    ]
    
    return (
      
       
        <Input
          placeholder=""
          placeholderTextColor={argonTheme.COLORS.MUTED}
          style={inputStyles}
          color={argonTheme.COLORS.HEADER}
          iconContent={
            <Icon
              size={15}
              color={argonTheme.COLORS.ICON}
              name="link"
              family="AntDesign"
            />
          }
          {...this.props}
        />
        
        
    );
  }
}

ArInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false,
  focus:false,
  floatingLabel: false,
  multiline:false,
  initialNumberOfLines:1,
  dynamicHeight:21,
  
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  focus:PropTypes.bool,
  placeholderTitle: PropTypes.string,
  initialNumberOfLines:PropTypes.number,
  dynamicHeight:PropTypes.number
}

const styles = StyleSheet.create({
  
  success: {
    borderColor: argonTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: "#FC7370",
    
  },
  focus:{
    borderWidth:2,
    borderColor: argonTheme.COLORS.PRIMARY,

  },
  shadow: {
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
  }
});

export default ArInput;
