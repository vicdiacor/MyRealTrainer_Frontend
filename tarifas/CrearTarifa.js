import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button, Select } from '../components';
import RNPickerSelect from "react-native-picker-select";
import CheckBoxLugarEntrenamiento from '../components/CheckBoxLugarEntrenamiento';
import SelectPicker from '../components/SelectPicker';
import { delay } from '../components/Delay';
import call from '../Caller';
import {getCookie} from "../temporal_database/SecureStore"


const { width, height } = Dimensions.get("screen");
export default function CrearTarifa({navigation,route}) {
    
    const [isLoading,setIsLoading]= useState(false)
    const[errors, setErrors]= useState({})
    const[form,setForm]=useState({
        titulo:"",
        precio:"",
        duracion:"",
        tipoDuracion:"Mes",
        limitaciones:"",
        

    })
    
    const[lugares,setLugares]=useState([])
    const[lugaresChecked,setLugaresChecked]=useState({})

    const handleSubmit=  evt => {
        setIsLoading(true)
        var tarifaActual = {...form,["lugaresChecked"]:lugaresChecked}
        var tarifas= route["params"]["tarifas"]
        tarifas.push(tarifaActual)
        navigation.navigate('CrearServicio',{"servicioForm":route["params"]["servicioForm"],"tarifas":tarifas})
        setIsLoading(false)
      }
    useEffect(()=>{
        if(route["params"]["tarifaForm"]){
            setForm(route["params"]["tarifaForm"])
        }
        getCookie("emailLogged").then(email => {
            call('/lugares/'+email,"GET", navigation)
            .then(response => {
              if (response.ok){
                response.json().then(data => {
                    setLugares(data)
                 
                })
              }else{
                navigation.navigate("CrearServicio",{"servicioForm":route["params"]["servicioForm"]})
              }
            }) 
        })
     

    },[route["params"]])

 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Block flex safe > 
                <KeyboardAvoidingView
                    


                    enabled
                >
             
            <Block style={{marginTop:"20%",marginBottom:"5%"}} flex row  center>
               
                <Text
                    h5
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Asignar Tarifa
                </Text>
             </Block>
             
                <Block flex row center width={width * 0.85} style={{marginTop:"6%"}}>
                        <FloatingLabelInput
                            errorMessage={formErrorMessage(errors,"titulo")}
                            
                            label="Título"
                            value={form.titulo}
                            onChangeText={text => setForm({...form,["titulo"]:text})}
                        />
                </Block>
                <Block center flex row style={{marginTop:"6%", left:"0%"}}>
                    <Block  flex={0.25} row width="25%">
                            <FloatingLabelInput
                                placeholderFontSize={15}
                                keyboardType="numeric"
                                errorMessage={formErrorMessage(errors,"precio")}
                                label="Precio(€)"
                                value={form.precio}
                                onChangeText={text => setForm({...form,["precio"]:text})}
                            />
                            
                    </Block>
                    <Block  style={{marginLeft:"1%"}} flex={0.25} row width="25%">
                            <FloatingLabelInput
                                placeholderFontSize={15}
                                keyboardType="numeric"
                                errorMessage={formErrorMessage(errors,"duracion")}
                                label="Duración"
                                value={form.duracion}
                                onChangeText={text => setForm({...form,["duracion"]:text})}
                            />
                            
                    </Block>
                    <Block style={{marginLeft:"1%"}} flex={0.4} width="40%" row>
                        <SelectPicker 
                            width="100%"
                            height={65}
                            value={form.tipoDuracion}
                            onValueChange={(value) => setForm({...form,["tipoDuracion"]:value})}
                            items={[
                                { color:argonTheme.COLORS.BLACK ,label: "  Mes/es", value: "Mes" },
                                { color:argonTheme.COLORS.BLACK,label: "  Año/s", value: "Año" },
                                { color:argonTheme.COLORS.BLACK, label: "  Hora/s", value: "Hora" },
                             
                            ]}
                        />
                    </Block>
                     
                </Block>
                <Block flex row center width={width * 0.85} style={{marginTop:"6%"}}>
                        <FloatingLabelInput
                            maxLength={500}
                            textCounter={form.limitaciones}
                            errorMessage={formErrorMessage(errors,"limitaciones")}
                            multiline
                            initialNumberOfLines={4}
                            label="Limitaciones del servicio"
                            value={form.limitaciones}
                            onChangeText={text => setForm({...form,["limitaciones"]:text})}
                        />
                </Block>
               
                <Block style={{marginTop:"10%",marginBottom:"5%"}} flex row  center>
               
                        <Text
                            h5
                            bold
                            
                            color={argonTheme.COLORS.DEFAULT}
                        >
                            Lugares de las sesiones
                        </Text>
                </Block>
                {lugares.map(lugar => (

                <Block flex row center style={{width:"80%",marginTop:"5%"}}>
                    <CheckBoxLugarEntrenamiento 
                    enableCheckbox={true}
                    onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"lugar":lugar,"tarifaForm":form, "servicioForm":route["params"]["servicioForm"],"tarifas":route["params"]["tarifas"]})} 
                    lugar={lugar}
                    onChangeCheckbox={async isChecked => {
                       setLugaresChecked({...lugaresChecked,[lugar["id"]]: (isChecked? lugar:null) })
                    }
                   }
                    >
                   
                    
                    </CheckBoxLugarEntrenamiento>
                </Block>

                ))}
                
                <Button onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"tarifaForm":form, "servicioForm":route["params"]["servicioForm"],"tarifas":route["params"]["tarifas"]})} style={styles.circleButton}>
                            <Icon
                            
                            size={20}
                            color={argonTheme.COLORS.WHITE}
                            name="plus"
                            family="Entypo"
                            style={{alignSelf: "center"}}
                            
                            />
                </Button>
                 
                <Block  marginTop="30%" center>
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
        bottom: "7%",
        right:"5%",
    },
    pickerContainer:{
        marginLeft:"1%",
        backgroundColor:"#FFFF",
        height:65,
        marginTop:8,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
        borderWidth:0.8,
        borderRadius: 4,
        borderColor: argonTheme.COLORS.BORDER,
        
    }, createButton: {
        width: width * 0.6,
        marginTop:"4%",
        marginBottom: "4%",
      }
})