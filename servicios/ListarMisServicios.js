import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text ,theme} from "galio-framework";
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button } from '../components';
import TarifaCard from '../components/TarifaCard';
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
import { delay } from '../components/Delay';
import validateCrearServicio from './ValidateCrearServicio';
import { Card } from "../components/";
import { Images, argonTheme, articles } from "../constants/";
import ServicioCard from '../components/ServicioCard';

const { width, height } = Dimensions.get("screen");

export default function ListarMisServicios({navigation,route}) {

const [servicios,setServicios]= useState()
const [isLoading,setIsLoading]=useState(true)

useEffect(()=>{
  getCookie("emailLogged").then(email => {
    call('/servicios/'+email,"GET", navigation)
    .then(response => {
      if (response.ok){
        response.json().then(data => {
            setServicios(data)
            setIsLoading(false)
        })
      }else{
        showBackendErrors(response)
        navigation.navigate("Login")
      }
    }) 
})
},[])

 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
        <Block style={{marginTop:60,marginBottom:20}} flex row  center>
               
               <Text
                   h4
                   bold
                   
                   color={argonTheme.COLORS.ICON}
               >
                   Mis Servicios
               </Text>
            </Block>
            <Block flex safe  > 
            {isLoading? null: 
              servicios.map(servicio => (

                <Block style={{ paddingHorizontal: theme.SIZES.BASE}}>
                
                <ServicioCard servicio={servicio} full />
  
                </Block>

              ))
              
            }
            <Block  marginTop={120} center>
                      <Button  onPress={()=> navigation.navigate("CrearServicio")} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Crear Servicio
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