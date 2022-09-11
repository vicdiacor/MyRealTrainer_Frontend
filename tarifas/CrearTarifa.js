import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button, Select, Switch} from '../components';
import RNPickerSelect from "react-native-picker-select";
import CheckBoxLugarEntrenamiento from '../components/CheckBoxLugarEntrenamiento';
import SelectPicker from '../components/SelectPicker';
import { delay } from '../components/Delay';
import call from '../Caller';
import {getCookie} from "../temporal_database/SecureStore"
import { showBackendErrors } from '../util/UtilFunctions';
import validateCrearTarifa from './ValidateCrearTarifa';



const { width, height } = Dimensions.get("screen");
export default function CrearTarifa({navigation,route}) {
    
    const [isLoading,setIsLoading]= useState(false)
    const[errors, setErrors]= useState({})
    const[form,setForm]=useState({
        titulo:"",
        precio:"",
        duracion:"",
        tipoDuracion:"MES",
        limitaciones:"",
        id:"",
    })
    
    const[lugares,setLugares]=useState([])
    const[lugaresChecked,setLugaresChecked]=useState({})

    const handleSubmit=  evt => {
        setIsLoading(true)
        var nuevosErrores= validateCrearTarifa(form,lugaresChecked)
        setErrors(nuevosErrores)
        var numeroErrores = Object.keys(nuevosErrores).length;
        if(numeroErrores===0){
            var tarifaActual = {...form,["lugares"]:lugaresChecked}
           
            var tarifas= route["params"]["tarifas"]
            if(route["params"]["index"]){
                tarifas[route["params"]["index"]]=tarifaActual
            }else{
                tarifas[Object.keys(tarifas).length]=tarifaActual
            }
            
            navigation.navigate('CrearServicio',{"servicioForm":route["params"]["servicioForm"],"tarifas":tarifas,"mode":route["params"]["mode"]})
            setIsLoading(false)
        }else{
            setIsLoading(false)
        }
       
      }
    
    useEffect(()=>{
        if(route["params"]["tarifaForm"]){
           
            setForm(route["params"]["tarifaForm"])
        }
        if(route["params"]["lugaresChecked"]){
           
            setLugaresChecked(route["params"]["lugaresChecked"])
        }
        getCookie("emailLogged").then(email => {
            call('/lugares/'+email,"GET", navigation)
            .then(response => {
              if (response.ok){
                response.json().then(data => {
                    setLugares(data)
                 
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
            <Block flex safe > 
                <KeyboardAvoidingView
                    


                    enabled
                >
             
            <Block style={{marginTop:70,marginBottom:"5%"}} flex row  center>
               
                <Text
                    h5
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Asignar Tarifa
                </Text>
             </Block>
             
                <Block flex row center width={width * 0.85}>
                        <FloatingLabelInput
                            errorMessage={formErrorMessage(errors,"titulo")}
                            maxLength={80}
                            label="Título"
                            value={form.titulo}
                            onChangeText={text => setForm({...form,["titulo"]:text})}
                        />
                </Block>
                <Block center flex row style={{left:"1.5%",alignSelf:"baseline", marginTop:10}}>
                    <Block style={{alignSelf:"baseline"}} flex={0.25} row width="25%">
                            <FloatingLabelInput
                                placeholderFontSize={15}
                                keyboardType="numeric"
                                errorMessage={formErrorMessage(errors,"precio")}
                                label="Precio(€)"
                                value={form.precio}
                                onChangeText={text => setForm({...form,["precio"]:text})}
                            />
                            
                    </Block>
                    <Block  style={{marginLeft:"1%",alignSelf:"baseline"}} flex={0.25} row width="25%">
                            <FloatingLabelInput
                                placeholderFontSize={15}
                                keyboardType="numeric"
                                errorMessage={formErrorMessage(errors,"duracion")}
                                label="Duración"
                                value={form.duracion}
                                onChangeText={text => setForm({...form,["duracion"]:text})}
                            />
                            
                    </Block>
                    <Block style={{marginLeft:"1%",alignSelf:"baseline",top:7.7}} flex={0.4} width="40%" row>
                        <SelectPicker 
                            errorMessage={formErrorMessage(errors,"tipoDuracion")}
                            width="100%"
                            height={65}
                            value={form.tipoDuracion}
                            onValueChange={(value) => setForm({...form,["tipoDuracion"]:value})}
                            items={[
                                { color:argonTheme.COLORS.BLACK ,label: "  Mes/es", value: "MES" },
                                { color:argonTheme.COLORS.BLACK,label: "  Año/s", value: "SEMANA" },
                                { color:argonTheme.COLORS.BLACK, label: "  Hora/s", value: "HORA" },
                                { color:argonTheme.COLORS.BLACK, label: "  Año/s", value: "AÑO" },
                             
                            ]}
                        />
                    </Block>
                     
                </Block>
                <Block flex row center width={width * 0.85} style={{marginTop:10}}>
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
               
                {Object.values(lugares).map( lugar => (
              
              <Block flex row center style={{width:"80%",marginTop:12}}>
                    <CheckBoxLugarEntrenamiento 
                    errorMessage={formErrorMessage(errors,"lugaresChecked")}
                    enableCheckbox={true}
                    onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"lugar":lugar,"tarifaForm":form, "mode":route["params"]["mode"],"servicioForm":route["params"]["servicioForm"],"tarifas":route["params"]["tarifas"],"lugaresChecked":lugaresChecked,"index":route["params"]["index"]})} 
                    lugar={lugar}
                    
                    initialValueCheckbox={lugar["id"] in route["params"]["lugaresChecked"]}
                    onChangeCheckbox={async isChecked => {
                        if (isChecked){
                            setLugaresChecked({...lugaresChecked,[lugar["id"]]: (isChecked? true:null) })
                        }else{
                            delete lugaresChecked[lugar["id"]]
                        }
                    }

                    }
                    >
             
              
              </CheckBoxLugarEntrenamiento>
          </Block>

                ))}
                {formErrorMessage(errors,"lugaresChecked")==undefined? null : 
                    <Block flex row center style={{width:"80%",marginTop:8,left:5}}> 
                    <Text style={{
                        color: argonTheme.COLORS.MESSAGE_ERROR,
                        
                        }}>{formErrorMessage(errors,"lugaresChecked")}</Text>
                    </Block>
                }
                                                                                    
                <Button onPress={()=> navigation.navigate("CrearLugarEntrenamiento",{"tarifaForm":form, "mode":route["params"]["mode"],"servicioForm":route["params"]["servicioForm"],"tarifas":route["params"]["tarifas"],"lugaresChecked":lugaresChecked,"index":route["params"]["index"]})} style={styles.circleButton}>
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