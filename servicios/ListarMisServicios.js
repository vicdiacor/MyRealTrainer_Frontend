import React, {useEffect,useState} from 'react';
import {  Dimensions,ActivityIndicator,SafeAreaView,ScrollView,StyleSheet} from 'react-native';
import { Block, Text ,theme} from "galio-framework";
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
import { argonTheme } from "../constants/";
import ServicioCard from '../components/ServicioCard';
import { useIsFocused } from "@react-navigation/native";
import CircleButton from '../components/CircleButton';


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
  

  } )
  var servicioForm={
    titulo: servicio["titulo"],
    descripcion: servicio["descripcion"],
    id:servicio["id"],
    esPublico:servicio["esPublico"]
    }
  
    navigation.navigate('CrearServicio',{"servicioForm":servicioForm,"tarifas":tarifas, "mode":"edit"})
 
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
                
                <ServicioCard  onPressContainer={()=>editServicio(servicio)} servicio={servicio} />
  
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