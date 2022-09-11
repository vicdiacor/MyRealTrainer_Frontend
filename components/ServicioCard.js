import React, { useEffect, useState } from 'react';

import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import CheckBoxLugarEntrenamiento from './CheckBoxLugarEntrenamiento';
import { argonTheme } from '../constants';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get("screen");


export default function ServicioCard({navigation, servicio,horizontal, full, style,onPressContainer,
  onPressDescription, ctaColor, imageStyle}){
 
    const [minimumPrices,setMinimumPrices]=useState({})
    const [lugaresEntrenamiento,setLugaresEntrenamiento]=useState({})
    const [isLoading, setIsLoading]=useState(true)
    const [descripcion,setDescripcion]=useState("")
    const [reducedDescription,setReducedDescription]= useState(false)

    var minimumPricesTemporal={}
    var lugaresEntrenamientoTemporal= []
   useEffect(()=>{
    
    servicio["tarifas"].forEach(tarifa => {

      // Calculates the minimum prices of the service for each duration type : MES, AÑO, SEMANA, HORA
      var tipoDuracion = tarifa["tipoDuracion"]
      
      if(tipoDuracion in minimumPricesTemporal && tarifa["precio"]/tarifa["duracion"]<minimumPricesTemporal[tipoDuracion][0]){
        minimumPricesTemporal[tipoDuracion]=[tarifa["precio"],tarifa["duracion"]]

      }else{
        minimumPricesTemporal[tipoDuracion]=[tarifa["precio"],tarifa["duracion"]]
      }

      // Select the different training places in the service

      tarifa["lugares"].forEach(lugar=>{
        if(!lugaresEntrenamientoTemporal.some(lugarTemp => lugarTemp["id"]===lugar["id"])){
          lugaresEntrenamientoTemporal.push(lugar)
        }
      
      })

  })
   // Group the training places in pairs to render them in the same row
   var lugaresRow= {}
   var numLugares= lugaresEntrenamientoTemporal.length
   var i =0;
   var numRow=0;
   while(i<numLugares){
       if(numLugares % 2==0 ){ // even places
         lugaresRow[numRow]=[lugaresEntrenamientoTemporal[i],lugaresEntrenamientoTemporal[i+1]]
         i+=2
         numRow+=1
       }else{ // odd places
         if(i<numLugares-1){
           lugaresRow[numRow]=[lugaresEntrenamientoTemporal[i],lugaresEntrenamientoTemporal[i+1]]
           i+=2
           numRow+=1
         }else{
           lugaresRow[numRow]=[lugaresEntrenamientoTemporal[i],null]
           i+=1
           numRow+=1
         }
       }

   }
   
  setMinimumPrices(minimumPricesTemporal)
  setLugaresEntrenamiento(lugaresRow)
  
  if(servicio["descripcion"].length > 300){
    setDescripcion(servicio["descripcion"].substring(0, 300))
    setReducedDescription(true)
  }else{
    setDescripcion(servicio["descripcion"])
  }
  setIsLoading(false)
 
  },[])
     
    function changeReducedDescriptionMode(){
      if(reducedDescription){
        setDescripcion(servicio["descripcion"])
        setReducedDescription(false)
      }else{
        setDescripcion(servicio["descripcion"].substring(0, 300))
        setReducedDescription(true)
      }
    }

    function renderMinimumPrices(){
      var visibleText= ""
      if("AÑO" in minimumPrices){

        visibleText+=(visibleText===""? "":"   ") + minimumPrices["AÑO"][0]+"€ / " + (minimumPrices["AÑO"][1]>1? minimumPrices["AÑO"][1] +" años":"año")
      }

      if("SEMANA" in minimumPrices){
        visibleText+= (visibleText===""? "":"   ") + minimumPrices["SEMANA"][0]+"€ / " + (minimumPrices["SEMANA"][1]>1? minimumPrices["SEMANA"][1]+" semanas":"semana")
      }
      if("MES" in minimumPrices){
        visibleText+=(visibleText===""? "":"   ")+ minimumPrices["MES"][0]+"€ / " + (minimumPrices["MES"][1]>1? minimumPrices["MES"][1] + " meses":"mes")
      }
      if("HORA" in minimumPrices){
        visibleText+=(visibleText===""? "":"   ") + minimumPrices["HORA"][0]+"€ / "  + (minimumPrices["HORA"][1]>1? minimumPrices["HORA"][1] +  " horas":"hora")
      }

      return visibleText
      
    }
   
   
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <TouchableWithoutFeedback style={{zIndex:10}} onPress={onPressContainer}>

      <Block row={horizontal} card flex style={cardContainer}>
       {isLoading? null: <> 
       
          <Block flex style={imgContainer}>
            <Image source={{uri: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=840&q=80"}} style={imageStyles} />
          </Block>
        
          <Block flex space="between" style={styles.cardDescription}>
            <Text bold size={17} style={styles.cardTitle}>{servicio["titulo"]}</Text>
            <Text bold size={17} style={styles.minimumPricesStyle}>{renderMinimumPrices()}</Text>
            
            <Text  size={14} style={{textAlign: 'justify',marginRight:5,marginLeft:5}}>{descripcion}   {reducedDescription?<Text  onPress={()=> {changeReducedDescriptionMode}} size={14} style={{marginRight:5,zIndex:2,marginLeft:5,marginTop:5,marginBottom:50}} color={argonTheme.COLORS.PRIMARY} bold>{reducedDescription? "...Leer más": "Mostrar menos"}</Text>: null}
            </Text>
            <Block  marginBottom={10} >
            {Object.entries(lugaresEntrenamiento).map(([key, value]) => 
                (
              <Block row>
                <Block row style={{width:"47.8%",marginTop:10,marginLeft:"1.5%"}}>
                 
                <CheckBoxLugarEntrenamiento
                reducedMode
                enableCheckbox={false}
                onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"lugar":value[0]})} 
                lugar={value[0]}
                
                >    
                </CheckBoxLugarEntrenamiento>
                </Block>
                
                {value[1]===null? 
                 null
                :
                <Block row style={{width:"47.8%",marginTop:10,marginLeft:"1.5%"}}>
                 <CheckBoxLugarEntrenamiento
                reducedMode
                enableCheckbox={false}
                onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"lugar":value[1]})} 
                lugar={value[1]}
                
                >    
                </CheckBoxLugarEntrenamiento> 
                </Block> 
                } 
              </Block>
            ))
            }
           </Block>

            
          </Block>
    
       
       </>}
        
      </Block>
      </TouchableWithoutFeedback>
    
    )
  
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
    borderRadius:10,
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    marginRight:5,
    marginLeft:5,
    
  },minimumPricesStyle:{
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    marginRight:5,
    marginLeft:5,
    color: argonTheme.COLORS.PRIMARY
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 10,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215,
    borderRadius:5,
    
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});