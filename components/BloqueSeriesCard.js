import React, {useEffect,useRef,useState} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import EjercicioCard from './EjercicioCard';
import { argonTheme } from '../constants';
const { width, height } = Dimensions.get("screen");

export default function BloqueSeriesCard ({navigation,onPress,bloque}) {
    

  function renderSerie(numRepeticiones,peso){
    return (
     <Block flex center  style={styles.repeticionesPesoCard}>
       {peso!==""? 
       <>
        <Text  size={15}>{numRepeticiones} x</Text>
        <Text  size={15}>{peso} kg</Text>
       </>
       : 
       <Block flex row center>
       <Text  size={15}>{numRepeticiones}</Text>
       </Block>
       }    
             
      </Block>
      )
  }

  function render4SeriesPerRow(){ // Render 4 "series" per row
    let seriesPerRow= []
    let seriesLength = bloque["series"].length
    for (let i=0;i<seriesLength;i+=4){
      let seriesActualRow= []
  
      if(i+3>seriesLength.length){
        seriesActualRow= bloque["series"].slice(i,seriesLength).map(serie => renderSerie(serie["numRepeticiones"],serie["peso"]))

      }else{
        seriesActualRow= bloque["series"].slice(i,i+4).map(serie => renderSerie(serie["numRepeticiones"],serie["peso"]))

      }

      seriesPerRow.push(
        <Block flex row marginTop={12} marginBottom={12} marginRight={12}>
          {seriesActualRow}
        </Block>
        
      )
    }
    return seriesPerRow
  }

  return (
  
      <TouchableWithoutFeedback  onPress={onPress ? onPress : null}>
        <Block style={styles.card}>
          <Block   row width={width*0.9} marginBottom={5}>
            <Block marginLeft={10} marginTop={10}>
                <Image source={{uri: "https://blogscdn.thehut.net/app/uploads/sites/450/2021/05/shutterstock_541669732opt_hero_1621859509_1622118621.jpg"}} style={styles.image} />
            </Block>
            <Block flex row center>
              <Block   marginLeft={12} marginRight={12} marginTop={12}>
                <Block marginBottom={5}>
                  <Text  size={17}>{bloque["ejercicio"]["titulo"]}</Text>
                </Block>
                <Block>
                  <Text color='#7B6F72' size={15}>Series - 4 min y 50 s</Text>
                </Block>
              </Block>
            </Block>
          </Block>
         
          {render4SeriesPerRow()}
          
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
  image: {
    borderRadius: 10,
    elevation: 1,
    overflow: 'hidden',
    minHeight:width*0.21,
    minWidth:width*0.21,
  },repeticionesPesoCard:{
    backgroundColor:"#D8E6FF",
    borderRadius:8,
    width:width*0.12,
    height:width*0.13,
    marginLeft:12,
  }
 
});

