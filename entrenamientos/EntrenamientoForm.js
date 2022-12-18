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
import validateEntrenamientoForm from './ValidateEntrenamientoForm';
import { useIsFocused } from "@react-navigation/native";
import CircleButton from '../components/CircleButton';
import { colors } from 'react-native-elements';





const { width, height } = Dimensions.get("screen");
export default function EntrenamientoForm({navigation,route}) {
    
    const [isLoading,setIsLoading]= useState(false)
    const[errors, setErrors]= useState({})
    const isFocused = useIsFocused();
    const[form,setForm]=useState({
        id:"",
        numOrden:"",
        titulo:"",
        diaSemana:"LUNES",
        bloques:[],
    })

    const handleSubmit=  evt => {
        setIsLoading(true)
        var nuevosErrores= validateEntrenamientoForm(form)
        setErrors(nuevosErrores)
        var numeroErrores = Object.keys(nuevosErrores).length;
        if(numeroErrores===0){
           
            var entrenamientos= route["params"]["entrenamientos"]
            if(form.numOrden!=="" && form.numOrden!==undefined){ // Editing an existent entrenamiento in the array
                entrenamientos[numOrden]=form
            }else{ // Add a new entrenamiento to the array
                setForm({...form, ["numOrden"]:entrenamientos.length})
                entrenamientos.push(form)
            }
            route["params"]["entrenamientos"]=entrenamientos
            navigation.navigate('RutinaForm',route["params"])
            setIsLoading(false)
        }else{
            setIsLoading(false)
        }
       
      }
    
    useEffect(()=>{
        if(route["params"] && route["params"]["entrenamiento"]){ // Editing an existing entrenamiento from rutina
            setForm(route["params"]["entrenamiento"])
        }
        if(form.bloques.length>0){ // Load ejercicios info from backend
            getCookie("emailLogged").then(email => {
                call('/ejercicios/'+email+"/listId","GET", navigation,form.bloques.map(bloque => bloque["ejercicio"]["id"]))
                .then(response => {
                if (response.ok){
                    response.json().then(data => {

                        console.log('======EJERCICIOS INFO============');
                        console.log(data);
                        console.log('====================================');
                        
                    })
                }else{
                    showBackendErrors(response)
                    
                }
                }) 
            })
        }
     

    },[isFocused])

 return (
    <SafeAreaView style={styles.container}>
    

             
        <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
        <KeyboardAvoidingView enabled>
            <Block flex safe > 
              
            <Block style={{marginTop:80,marginBottom:"5%"}} flex row  center>
               
                <Text
                    h5
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Asignar Entrenamiento
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
                <Block flex row center width="85%">
                        <SelectPicker
                            title="Día de la semana"
                            errorMessage={formErrorMessage(errors,"diaSemana")}
                            width="100%"
                        
                            value={form.diaSemana}
                            onValueChange={(value) => setForm({...form,["diaSemana"]:value})}
                            items={[
                                { color:argonTheme.COLORS.BLACK ,label: "  LUNES", value: "LUNES" },
                                { color:argonTheme.COLORS.BLACK,label: "  MARTES", value: "MARTES" },
                                { color:argonTheme.COLORS.BLACK, label: "  MIÉRCOLES", value: "MIERCOLES" },
                                { color:argonTheme.COLORS.BLACK, label: "  JUEVES", value: "JUEVES" },
                                { color:argonTheme.COLORS.BLACK, label: "  VIERNES", value: "VIERNES" },
                                { color:argonTheme.COLORS.BLACK, label: "  SÁBADO", value: "SABADO" },
                                { color:argonTheme.COLORS.BLACK, label: "  DOMINGO", value: "DOMINGO" },
                             
                            ]}
                        />
                    </Block>
                
                
               
                <Block style={{marginTop:"10%",marginBottom:"5%"}} flex row  center>
                        <Text
                            h5
                            bold
                            
                            color={argonTheme.COLORS.DEFAULT}
                        >
                            Series de ejercicios
                        </Text>
                </Block>
               
                {form.bloques.map( bloqueSeries => (
              
              <Block flex row center style={{width:"80%",marginTop:12}}>
                    <p> Número orden: {bloqueSeries["numOrden"]}</p> 
                    <p> Número ejercicio: {bloqueSeries["ejercicio"]["id"]}</p>
            </Block>

                ))}
                {formErrorMessage(errors,"bloquesSeries")==undefined? null : 
                    <Block flex row center style={{width:"80%",marginTop:8,left:5}}> 
                    <Text style={{
                        color: argonTheme.COLORS.MESSAGE_ERROR,
                        
                        }}>{formErrorMessage(errors,"bloquesSeries")}</Text>
                    </Block>
                }

                <Block  marginBottom={30} marginTop={form.bloques.length>0? 100 : 200} center>
                      <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Asignar
                        </Text>
                      </Button>
                </Block>
                <Block style={{position:"absolute",bottom: 150,alignSelf:"center",right:"5%"}}>

                <CircleButton onPress={()=> navigation.navigate("ListarEjercicios",{...route["params"],["entrenamiento"]:form})}/>
                </Block>
            
            </Block> 
            </KeyboardAvoidingView>
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