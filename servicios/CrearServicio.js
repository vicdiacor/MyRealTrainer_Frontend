import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text } from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button } from '../components';
import TarifaCard from '../components/TarifaCard';

const { width, height } = Dimensions.get("screen");
export default function CrearServicio({navigation,route}) {

  
    const[errors, setErrors]= useState({})
    const[isLoading,setIsLoading]=useState({})
    const[form,setForm]=useState({
        titulo:"",
        descripcion:"",
    })
    const[tarifas,setTarifas]=useState([])
   
    useEffect(()=>{
        console.log("EFFECT")
        if (route["params"]!=undefined){
            setForm(route["params"]["servicioForm"])
            setTarifas(route["params"]["tarifas"])
            console.log(route["params"]["tarifas"])
        }else{

            var tarifas= [{"duracion": "2", "limitaciones": "Estas son muchísimas limitaciones y como todavía necesitas dinero ni de coña me vas a contratar jeje", "lugaresChecked": {"74": {
                titulo:"Mi gimnasio",
                descripcion:"Mi gimnasio",
                calle:"Calle Tarfia",
                numero:"2",
                piso:"2",
                ciudad:"Badajoz",
                provincia:"Badajoz",
                codigoPostal:"06129",
                tipoLugar:"Mi gimnasio"
            }, "75": {
                titulo:"Mi gimnasio",
                descripcion:"Mi gimnasio",
                calle:"Calle Tarfia",
                numero:"2",
                piso:"2",
                ciudad:"Badajoz",
                provincia:"Badajoz",
                codigoPostal:"06129",
                tipoLugar:"Mi gimnasio"
            }, "77": {
                titulo:"Mi gimnasio",
                descripcion:"Mi gimnasio",
                calle:"Calle Tarfia",
                numero:"2",
                piso:"2",
                ciudad:"Badajoz",
                provincia:"Badajoz",
                codigoPostal:"06129",
                tipoLugar:"Mi gimnasio"
            }}, "precio": "2", "tipoDuracion": "Mes", "titulo": "Tarifa Oro"}]
            setTarifas(tarifas)
            
        } // BORRAR ESTE ELSE
        
        
        
    },[route["params"]])
    
    const handleSubmit=  evt => {
       setIsLoading(true)
       
      }
    
    

 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Block flex safe  > 
                <KeyboardAvoidingView
                    


                    enabled
                >

            <Block style={{marginTop:60,marginBottom:"5%"}} flex row  center>
               
                <Text
                    h4
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Publicar Servicio
                </Text>
             </Block>
                <Block flex row center width={width * 0.8} style={{marginTop:20}}>
                        <FloatingLabelInput
                            errorMessage={formErrorMessage(errors,"titulo")}
                            label="Título"
                            value={form.titulo}
                            onChangeText={text => setForm({...form,["titulo"]:text})}
                        />
                </Block>

                <Block flex row center width={width * 0.8} style={{marginTop:20}}>
                        <FloatingLabelInput
                            multiline={true}
                            initialNumberOfLines={5}
                            errorMessage={formErrorMessage(errors,"descripcion")}
                            label="Descripción"
                            value={form.descripcion}
                            onChangeText={text => setForm({...form,["descripcion"]:text})}
                        />
                </Block>

                <Block style={{marginTop:30,marginBottom:32}} flex row  center>

                <Text
                    h4
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Tarifas
                </Text>
                
                   
                </Block>
              
                    {tarifas.map(item => 
                        (
                        <TarifaCard style={{width:width*0.85,marginBottom:30, alignSelf:"center"}} tarifa={item}/>)

                    )}
               
                <Block marginTop={0}></Block>
                <Button  onPress={ ()=> navigation.navigate('CrearTarifa',{"servicioForm":form,tarifas:tarifas})} style={styles.circleButton}>
                            <Icon
                            
                            size={20}
                            color={argonTheme.COLORS.WHITE}
                            name="plus"
                            family="Entypo"
                            style={{alignSelf: "center"}}
                            
                            />
                </Button>
                <Block  marginTop={120} center>
                      <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Asignar
                        </Text>
                      </Button>
                </Block>
            

            </KeyboardAvoidingView>
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
    }, circleButton:{
        
        
        
        zIndex:10,
        borderRadius: 100,
        width: width*0.13,
        height: width*0.13,
        color: argonTheme.COLORS.PRIMARY,
        backgroundColor: argonTheme.COLORS.PRIMARY,
        position:"absolute",
        bottom: 90,
        right:"5%",
        
    },
    circleButtonContainer:{
        
       

        
    },createButton: {
        width: width * 0.6,
        marginTop:"4%",
        marginBottom: "4%",
      }
})