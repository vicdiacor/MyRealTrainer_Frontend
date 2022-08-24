import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import PropTypes from 'prop-types';
import FloatingLabelInput from "./FloatingLabelInput";
import { Block, Input,Text } from "galio-framework";

import Icon from './Icon';
import { argonTheme } from "../constants";

class ArInput extends React.Component {
  render() {
    const { shadowless, success, error} = this.props;
    const inputStyles = [
      styles.input,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,

      
     
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
  floatingLabel: false
  
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  placeholderTitle: PropTypes.string,
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    height: 64 ,
    backgroundColor: '#FFFFFF'
  },
  success: {
    borderColor: argonTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: argonTheme.COLORS.INPUT_ERROR,
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
