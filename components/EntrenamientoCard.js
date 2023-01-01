import React from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';
const { width } = Dimensions.get("screen");
import { Button } from '.';
import { shortDayOfWeek, yesOrNotAlertMessage } from '../util/UtilFunctions';


export default function EntrenamientoCard ({onPress,entrenamiento,deleteFunction}) {
  
 
  return (
  
      <TouchableWithoutFeedback  onPress={onPress ? onPress : null}>
        <Block style={styles.card}>
          <Block   row width={width*0.9} marginBottom={5}>
            <Block   middle marginLeft={10} marginTop={10} style={styles.dayOfWeekCard}>
              <Text bold size={15} color={"#FFFF"}>{shortDayOfWeek(entrenamiento["diaSemana"])}</Text>
            </Block>
            <Block flex row center>
              <Block   marginLeft={12} marginRight={12} marginTop={12}>
                <Block marginBottom={5}>
                  <Text  size={17}>{entrenamiento["titulo"]}</Text>
                </Block>
              </Block>
            </Block>
          </Block>
         
          
          {deleteFunction?
          <Block flex row width={width*0.88} center marginTop={10} marginBottom={10}>
            <Button  style={{flex:1}} onPress={yesOrNotAlertMessage("Eliminar entrenamiento","¿Estás seguro de eliminar el entrenamiento '"
             + entrenamiento["titulo"] + "' ?",deleteFunction)} color="DELETE_BUTTON">
              <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                Eliminar
              </Text>
            </Button>
          </Block> 
            : null}
          
        </Block>
      </TouchableWithoutFeedback >
    
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth:1,
    borderColor: argonTheme.COLORS.BORDER,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,

  },
  dayOfWeekCard: {
    backgroundColor:argonTheme.COLORS.ICON,
    borderRadius: 100,
    elevation: 1,
    overflow: 'hidden',
    minHeight:width*0.15,
    minWidth:width*0.15,
  }
 
});

