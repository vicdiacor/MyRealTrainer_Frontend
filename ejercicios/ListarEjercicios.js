import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text ,theme} from "galio-framework";
import { Icon, Button } from '../components';
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
import { Images, argonTheme, articles } from "../constants";
import EjercicioCard from '../components/EjercicioCard';

const { width, height } = Dimensions.get("screen");

export default function ListarEjercicios({navigation,route}) {

const [ejercicios,setEjercicios]= useState()
const [isLoading,setIsLoading]=useState(true)

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
},[route["params"]])

 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
        <Block style={{marginTop:60,marginBottom:20}} flex row  center>
               
               <Text
                   h4
                   bold
                   
                   color={argonTheme.COLORS.ICON}
               >
                   Mis Ejercicios
               </Text>
            </Block>
            <Block flex safe  > 
            <Block center>
            {isLoading? null: 
              Object.entries(ejerciciosInPairs()).map(([key, value]) => (
                <Block row>
                  <Block>
                  
                  <EjercicioCard  ejercicio={value[0]} />
    
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
                    <Block  >
                    
                    <EjercicioCard  ejercicio={value[1]} />
      
                    </Block>
                  </>
                  }

                  
                </Block>
                

              ))
              
            }
             </Block>
            <Block  marginTop={120} center>

                      <Button  onPress={()=> navigation.navigate("EjercicioForm",{"mode":"create"})} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Crear Ejercicio
                        </Text>
                      </Button>
                </Block>
            </Block> 
            
        </ScrollView> 
    </SafeAreaView>



 )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F4F5F7",
      justifyContent: 'center',
    },createButton: {
      width: width * 0.6,
      marginTop:"4%",
      marginBottom: "4%",
    }
})