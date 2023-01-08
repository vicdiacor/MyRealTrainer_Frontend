import React, {useEffect,useState} from 'react';
import { ActivityIndicator,SafeAreaView,ScrollView,StyleSheet} from 'react-native';
import { Block, Text ,theme} from "galio-framework";
import call from '../Caller';
import { argonTheme } from "../constants";
import ServicioCard from '../components/ServicioCard';
import { useIsFocused } from "@react-navigation/native";

export default function ListPublicServicios({navigation,route}) {

const [servicios,setServicios]= useState([])
const [isLoading,setIsLoading]=useState(true)
const isFocused = useIsFocused();

useEffect(()=>{
  setServicios([])
  call('/servicios/public',"GET", navigation)
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

},[isFocused])

function watchServicio(servicio){
   console.log(servicio)
  navigation.navigate("SolicitarServicioForm",{"servicio":servicio , "tarifas":servicio.tarifas});

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
                   Buscar servicios
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
                
                <ServicioCard  onPressContainer={()=>watchServicio(servicio)} servicio={servicio} />
  
                </Block>

              ))
              
            }
       
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
    },
})