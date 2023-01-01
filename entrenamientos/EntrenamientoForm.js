import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,ActivityIndicator,KeyboardAvoidingView, TextInput,StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Button} from '../components';
import SelectPicker from '../components/SelectPicker';
import call from '../Caller';
import {getCookie} from "../temporal_database/SecureStore"
import { showBackendErrors } from '../util/UtilFunctions';
import validateEntrenamientoForm from './ValidateEntrenamientoForm';
import { useIsFocused } from "@react-navigation/native";
import CircleButton from '../components/CircleButton';
import BloqueSeriesCard from '../components/BloqueSeriesCard';

const { width, height } = Dimensions.get("screen");
export default function EntrenamientoForm({navigation,route}) {
    
    const [isLoading,setIsLoading]= useState(false)
    const[errors, setErrors]= useState({})
    const [isLoadingContent,setIsLoadingContent] = useState(true)
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
            console.log("FORMULARIO PRE_SUBMIT:")
            console.log(form)
            if(form.numOrden!=="" && form.numOrden!==undefined){ // Editing an existent entrenamiento in the array
                entrenamientos[form.numOrden]=form
            }else{ // Add a new entrenamiento to the array
                setForm({...form, ["numOrden"]:entrenamientos.length})
                entrenamientos.push(form)
            }
            delete route["params"]["entrenamiento"]
            console.log("ENTRENAMIENTOS")
            console.log(entrenamientos)
            console.log("ESTE ENTRENAMIENTO")
            console.log(form)
            navigation.navigate('RutinaForm',{...route["params"],["entrenamientos"]:entrenamientos})
            setIsLoading(false)
        }else{
            setIsLoading(false)
        }
       
      }
    
    useEffect(()=>{
        setIsLoadingContent(true)
        if(route["params"] && route["params"]["entrenamiento"]){ // Editing an existing entrenamiento from rutina
            setForm(route["params"]["entrenamiento"])
        }

        setIsLoadingContent(false)
     

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
             {isLoadingContent ? 
                 
              <Block center marginTop={100}>
              <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
              </Block>
              :
                <>
                 <Block flex row center width={width * 0.9}>
                        <FloatingLabelInput
                            errorMessage={formErrorMessage(errors,"titulo")}
                            maxLength={80}
                            label="Título"
                            value={form.titulo}
                            onChangeText={text => setForm({...form,["titulo"]:text})}
                        />
                </Block>
                <Block marginTop={10} flex row center width="90%">
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
              
               
                {form.bloques.map( (bloqueSeries,index) => (
                    <Block marginBottom={16} center row width={width*0.9}>
                        <BloqueSeriesCard  bloque={bloqueSeries} 
                        deleteFunction={() => {
                            let bloques = form.bloques
                            bloques.splice(index,1)
                            setForm({...form,["bloques"]:bloques})
                            console.log(form)
                        }}
                        onPress={()=> {
                            setErrors({})
                            navigation.navigate("SeriesForm",{...route["params"],["entrenamiento"]:form,["bloque"]:{...bloqueSeries,["numOrden"]:""+index}})}}/>
                    </Block>
                ))}
                {formErrorMessage(errors,"bloques")==undefined? null : 
                    <Block flex row center style={{width:"80%",marginTop:8,left:5}}> 
                    <Text style={{
                        color: argonTheme.COLORS.MESSAGE_ERROR,
                        
                        }}>{formErrorMessage(errors,"bloques")}</Text>
                    </Block>
                }
                </>
            }
               

                <Block  marginBottom={30} marginTop={form.bloques.length>0? 100 : 200} center>
                      <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Asignar
                        </Text>
                      </Button>
                </Block>
                <Block style={{position:"absolute",bottom: 120,alignSelf:"center",right:"5%"}}>

                <CircleButton onPress={()=> {
                    setErrors({})
                    navigation.navigate("ListarEjercicios",{...route["params"],["entrenamiento"]:form})}}/>
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