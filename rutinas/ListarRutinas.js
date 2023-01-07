import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,ActivityIndicator,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text ,theme} from "galio-framework";
import { Icon, Button } from '../components';
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
import { Images, argonTheme, articles } from "../constants";
import SimpleImageCard from '../components/SimpleImageCard';
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import CircleButton from '../components/CircleButton';
import { pairRowsElements } from '../util/UtilFunctions';


export default function ListarRutinas({navigation,route}) {

const [rutinas,setRutinas]= useState()
const [isLoading,setIsLoading]=useState(true)
const isFocused = useIsFocused();


useEffect(()=>{
  setRutinas([])
  getCookie("emailLogged").then(email => {
    call('/rutinas/'+email,"GET", navigation)
    .then(response => {
      if (response.ok){
        response.json().then(data => {
            setRutinas(data)
            setIsLoading(false)
        })
      }else{
        showBackendErrors(response)
        
      }
    }) 
})
},[isFocused])

// COMPLETAR
function editRutina(rutina){
      var rutinaForm = {
        id:rutina["id"],
        titulo:rutina["titulo"],
        descripcion:rutina["descripcion"],
        
      }

    navigation.navigate('RutinaForm',{"rutinaForm":rutinaForm,"entrenamientos":rutina["entrenamientos"]})
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
                  Mis rutinas
               </Text>
            </Block>
            <Block flex safe  > 
            <Block center>
            {isLoading? 
            
              <Block center marginTop={100}>
              <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
              </Block>
              
            : 
              Object.entries(pairRowsElements(rutinas)).map(([key, value]) => (
                <Block row>
                  <Block marginBottom={16} width={0.45*width}>
                  
                  <SimpleImageCard onPress={()=>editRutina(value[0])} element={value[0]} title={value[0]["titulo"]}/>
    
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
                    
                    <SimpleImageCard onPress={()=>editRutina(value[1])} element={value[1]} title={value[1]["titulo"]} />
      
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
        <CircleButton onPress={()=> navigation.navigate("RutinaForm")}/>
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