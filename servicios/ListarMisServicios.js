import React, {useEffect,useState} from 'react';
import { View, Dimensions,ActivityIndicator,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
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
import { useIsFocused } from "@react-navigation/native";
import CircleButton from '../components/CircleButton';

const { width, height } = Dimensions.get("screen");

export default function ListarMisServicios({navigation,route}) {

const [servicios,setServicios]= useState([])
const [isLoading,setIsLoading]=useState(true)
const isFocused = useIsFocused();
function editServicio(servicio){

  var tarifas= servicio["tarifas"]
  var formattedTarifas= {}
  var indexTarifa= 0
  tarifas.forEach(tarifa => {

    var lugaresChecked={}
    
    if (!Array.isArray(tarifa["lugares"])){
        Object.values(tarifa["lugares"]).forEach(lugar=> lugaresChecked[lugar["id"]]=true)
    }else{
      tarifa["lugares"].forEach(lugar => lugaresChecked[lugar["id"]]=true)
    }
   
    tarifa["lugares"]=lugaresChecked
    formattedTarifas[indexTarifa]=tarifa
    indexTarifa++
  

  } )
  var servicioForm={
    titulo: servicio["titulo"],
    descripcion: servicio["descripcion"],
    id:servicio["id"],
    }
  
    navigation.navigate('CrearServicio',{"servicioForm":servicioForm,"tarifas":formattedTarifas, "mode":"edit"})
 
}

useEffect(()=>{
  setServicios([])
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
},[isFocused])

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
            {isLoading?
            <Block center marginTop={100}>
            <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
            </Block>
            : 
              servicios.map(servicio => (

                <Block style={{ paddingHorizontal: theme.SIZES.BASE}}>
                
                <ServicioCard deleteFunction={()=> console.log("DELETE")} onPressContainer={()=>editServicio(servicio)} servicio={servicio} />
  
                </Block>

              ))
              
            }
       
            </Block> 
         
        </ScrollView>
        <Block style={{position:"absolute",bottom: 100,alignSelf:"center",right:"5%"}}>
        <CircleButton onPress={()=> navigation.navigate("CrearServicio",{"mode":"create"})} color="primary" />
        </Block>
    </SafeAreaView>



 )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F4F5F7",
      justifyContent: 'center',
    },
})