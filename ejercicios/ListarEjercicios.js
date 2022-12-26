import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,ActivityIndicator,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text ,theme} from "galio-framework";
import { Icon, Button } from '../components';
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
import { Images, argonTheme, articles } from "../constants";
import EjercicioCard from '../components/EjercicioCard';
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import CircleButton from '../components/CircleButton';


export default function ListarEjercicios({navigation,route}) {

const [ejercicios,setEjercicios]= useState()
const [isLoading,setIsLoading]=useState(true)
const isFocused = useIsFocused();

function ejerciciosInPairs(){
  var ejerciciosRow= {}
   var numEjercicios= ejercicios.length
   var i =0
   var numRow=0
   while(i<numEjercicios){
       if(numEjercicios % 2==0 ){ // even ejercicios list
        ejerciciosRow[numRow]=[ejercicios[i],ejercicios[i+1]]
         i+=2
         numRow+=1
       }else{ // odd ejercicios list
         if(i<numEjercicios-1){
          ejerciciosRow[numRow]=[ejercicios[i],ejercicios[i+1]]
           i+=2
           numRow+=1
         }else{
          ejerciciosRow[numRow]=[ejercicios[i],null]
           i+=1
           numRow+=1
         }
       }

   }
   return ejerciciosRow
}

useEffect(()=>{
  setEjercicios([])
  getCookie("emailLogged").then(email => {
    call('/ejercicios/'+email,"GET", navigation)
    .then(response => {
      if (response.ok){
        response.json().then(data => {
            setEjercicios(data)
            setIsLoading(false)
        })
      }else{
        showBackendErrors(response)
        
      }
    }) 
})
},[isFocused])

function editEjercicio(ejercicio){
      var form={
        titulo:ejercicio["titulo"],
        preparacion:ejercicio["preparacion"],
        ejecucion:ejercicio["ejecucion"],
        consejos:ejercicio["consejos"],
        id: ejercicio["id"]
    }
    navigation.navigate('EjercicioForm',{"form":form,"mode":"edit"})
}


 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
        <Block style={{marginTop:60,marginBottom:20}} flex row  center>
               
               <Text
                   h4
                   bold
                   
                   color={argonTheme.COLORS.ICON}
               >
                   {route["params"] && route["params"]["entrenamiento"]? "Asignar ejercicio" : "Mis Ejercicios"}
               </Text>
            </Block>
            <Block flex safe  > 
            <Block center>
            {isLoading? 
            
              <Block center marginTop={100}>
              <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
              </Block>
              
            : 
              Object.entries(ejerciciosInPairs()).map(([key, value]) => (
                <Block row>
                  <Block marginBottom={16} width={0.45*width}>
                  
                  <EjercicioCard onPress={route["params"] && route["params"]["entrenamiento"] ? ()=> navigation.navigate("SeriesForm",{...route["params"],"ejercicio":value[0]}) : ()=>editEjercicio(value[0])} ejercicio={value[0]} />
    
                  </Block>
                  {value[1]===null? 
                  <>
                  <Block marginRight={width*0.0333}/>
                  <Block style={{
                    width: width*0.45,
                    minHeight: 100,
                    marginBottom: 16,
                  }}/>
                  </>
                  : 
                  <> 
                    <Block marginRight={width*0.0333}/>
                    <Block marginBottom={16} width={0.45*width} >
                    
                    <EjercicioCard onPress={route["params"] && route["params"]["entrenamiento"] ? ()=> navigation.navigate("SeriesForm",{...route["params"],"ejercicio":value[1]}) : ()=>editEjercicio(value[1])} ejercicio={value[1]} />
      
                    </Block>
                  </>
                  }

                  
                </Block>
                

              ))
              
            }
             </Block>
           
            </Block> 
            
        </ScrollView>
        <Block style={{position:"absolute",bottom: 100,alignSelf:"center",right:"5%"}}>
        <CircleButton onPress={()=> navigation.navigate("EjercicioForm",route["params"]? {...route["params"],["mode"]:"create"}:{"mode":"create"})}/>
        </Block>
    </SafeAreaView>



 )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F4F5F7",
      justifyContent: 'center',
    }
})