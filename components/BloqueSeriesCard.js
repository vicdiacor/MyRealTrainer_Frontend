import React, {useEffect,useRef,useState} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import EjercicioCard from './EjercicioCard';
import { argonTheme } from '../constants';
const { width, height } = Dimensions.get("screen");
import { Button } from '.';
import { yesOrNotAlertMessage } from '../util/UtilFunctions';


export default function BloqueSeriesCard ({onPress,bloque,deleteFunction}) {
  
  var formattedTiempoDescanso = ""
  var tiempoEntreSeriesSplit = bloque["tiempoEntreSeries"].split(":")
  var minutosDescanso = ""+tiempoEntreSeriesSplit[0]
  var segundosDescanso = ""+tiempoEntreSeriesSplit[1]
  
  if(minutosDescanso !== "00"){
    formattedTiempoDescanso += minutosDescanso.replace(/^0*/,"") + " min"
    
  }
  
  if(segundosDescanso !== "00"){
    if(formattedTiempoDescanso !== ""){
      formattedTiempoDescanso += " y "
    }
    formattedTiempoDescanso += segundosDescanso.replace(/^0*/,"") + " s"

  }

  function renderSerie(numRepeticiones,peso,horas,minutos,segundos){
   
    if(bloque["tipoBloque"] == "TIEMPO"){
      var formattedHoras= horas.replace(/^0*/,"")
      var formattedMinutos= minutos.replace(/^0*/,"")
      var formattedSegundos= segundos.replace(/^0*/,"")
    }
    return (
     <Block flex center  style={styles.repeticionesPesoCard}>
      {bloque["tipoBloque"] == "TIEMPO" ? 
      
      <>
        {horas !== "00" ?
            <>
            {minutos!== "00" ? 
              <>
                <Text  size={15}>{formattedHoras} h</Text>
                <Text  size={15}>y {formattedMinutos} min</Text>
              </>
              :
              <>
              <Block flex row center>
                <Text  size={15}>{formattedHoras} h</Text>
              </Block>
              </>
                }
                       
            </> 
            : 
            <>
            {minutos!== "00" ? 
              <>
              {segundos!=="00" ? 
              <>
                <Text  size={15}>{formattedMinutos} min</Text>
                <Text  size={15}>y {formattedSegundos} s</Text>
              </>  
              :
              <Block flex row center>
                <Text  size={15}>{formattedMinutos} min</Text>
              </Block>
            } 
            </>
            :
            <>
              <Block flex row center>
                <Text  size={15}>{segundos} s</Text>
              </Block>
            </>
                }
            </>
      }
      </>
      :
      <>
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
      </>}

      
             
      </Block>
      )
  }

  function render4SeriesPerRow(){ // Render 4 "series" per row
    let seriesPerRow= []
    let seriesLength = bloque["series"].length
    for (let i=0;i<seriesLength;i+=4){
      let seriesActualRow= []
  
      if(i+3>seriesLength.length){
        seriesActualRow= bloque["series"].slice(i,seriesLength).map(serie => {
          let tiempoSplit = serie["tiempo"].split(":")

          return renderSerie(serie["numRepeticiones"],serie["peso"],tiempoSplit[0],tiempoSplit[1],tiempoSplit[2])
        })

      }else{
        seriesActualRow= bloque["series"].slice(i,i+4).map(serie => {
          let tiempoSplit = serie["tiempo"].split(":")
          return renderSerie(serie["numRepeticiones"],serie["peso"],tiempoSplit[0],tiempoSplit[1],tiempoSplit[2])
        })

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
                {formattedTiempoDescanso !== "" ? 
                  <Block>
                      <Text color='#7B6F72' size={15}>Descansos de {formattedTiempoDescanso}</Text>
                  </Block>
                : null}
               
              </Block>
            </Block>
          </Block>
         
          {render4SeriesPerRow()}
          {deleteFunction?
          <Block flex row width={width*0.88} center marginTop={10} marginBottom={10}>
            <Button  style={{flex:1}} onPress={yesOrNotAlertMessage("Eliminar bloque de series","¿Estás seguro de eliminar las series del ejercicio '"
             + bloque["ejercicio"]["titulo"] + "' ?",deleteFunction)} color="DELETE_BUTTON">
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

