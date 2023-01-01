import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView,ActivityIndicator,Image, Alert,StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button, Select } from '../components';
import { showBackendErrors} from "../util/UtilFunctions"
import * as ImagePicker from 'expo-image-picker';
import validateRutinaForm from './ValidateRutinaForm';
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
import CircleButton from '../components/CircleButton';
import EntrenamientoCard from '../components/EntrenamientoCard';
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

export default function RutinaForm({navigation,route}) {

    const [isLoading,setIsLoading]= useState(false)
    const [isLoadingGaleria,setIsLoadingGaleria]= useState(false)
    const [isLoadingCamara,setIsLoadingCamara]= useState(false)
    const[isLoadingEliminar,setIsLoadingEliminar]=useState(false)
    const [isLoadingContent,setIsLoadingContent] = useState(true)
    const isFocused = useIsFocused();
    const[errors, setErrors]= useState({})
    const[form,setForm]=useState({
        id:"",
        titulo:"",
        descripcion:"",
        
    })
    const [entrenamientos,setEntrenamientos] = useState([])

    const [image, setImage] = useState(null);
    
    
    useEffect(()=>{

      setIsLoadingContent(true)
      
      route["params"] && route["params"]["rutinaForm"] ? setForm(route["params"]["rutinaForm"]):null
      route["params"] && route["params"]["entrenamientos"] ? setEntrenamientos(route["params"]["entrenamientos"]):null

      setIsLoadingContent(false)

    },[isFocused])

    function deleteRutina(id){
      setIsLoadingEliminar(true)
      call('/rutinas/'+id,"DELETE", navigation)
              .then(response => {
                if (response.ok){
                      navigation.navigate("ListarRutinas")
                      setIsLoadingEliminar(false)
                }else{
                  showBackendErrors(response)
                  setIsLoadingEliminar(false)
                }
              }) 
    }

    const handleSubmit= evt => {
      setIsLoading(true)
      var nuevosErrores= validateRutinaForm(form,entrenamientos)
      setErrors(nuevosErrores)
      var numeroErrores = Object.keys(nuevosErrores).length;
      if(numeroErrores===0){
          var data={
              titulo:form.titulo,
              descripcion: form.descripcion,
              entrenamientos: entrenamientos
          }
          if(form.id!=undefined && form.id!==""){ // Edit an existing rutina
            data["id"]= form.id
            console.log("RUTINA: ")
            console.log(data)
            /*
            call('/rutinas/'+form.id,"PUT", navigation,data)
            .then(response => {
              if (response.ok){
                navigation.navigate("ListarRutinas")
                setIsLoading(false)
              }else{
                setIsLoading(false)
                showBackendErrors(response)
              }
            }) */
          }else{
            console.log("RUTINA: ")
            console.log(data)
            /*      // Create a new rutina
            getCookie("emailLogged").then(email => {
              call('/rutinas/'+email,"POST", navigation,data)
              .then(response => {
                if (response.ok){
                  navigation.navigate("ListarRutinas")
                  setIsLoading(false)
                }else{
                  setIsLoading(false)
                  showBackendErrors(response)
                }
              }) 
          })*/
          }
          
          
      }else{
          setIsLoading(false)
      }
      
    }
   
    const pickImage = async (videoType) => {
        setIsLoadingGaleria(true)
       
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        if (!result.cancelled) {
            
                setImage(result.uri);
                setIsLoadingGaleria(false)
          
      
    
        }else{
            setIsLoadingGaleria(false)
    
        }
      };

      const takeAPicture = async (videoType) => {
         setIsLoadingCamara(true)
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        if (!result.cancelled) {

          
                setImage(result.uri);
                setIsLoadingCamara(false)
    
          
        }else{
           setIsLoadingCamara(false)
        }
      };
 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Block flex safe  > 
                <KeyboardAvoidingView
                    


                    enabled
                >
                {isLoadingContent ? 
                 
                 <Block center marginTop={100}>
                  <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                 </Block>
                 :
                <>

                <Block style={{marginTop:60,marginBottom:20}} flex row  center>
                
                    <Text
                        h5
                        bold
                        
                        color={argonTheme.COLORS.ICON}
                    >
                        Crear Rutina
                    </Text>
                </Block>

                <Block flex row center width={width * 0.85} style={{marginTop:10}}>
                        <FloatingLabelInput
                            errorMessage={formErrorMessage(errors,"titulo")}
                            maxLength={100}
                            label="Título"
                            value={form.titulo}
                            onChangeText={text => setForm({...form,["titulo"]:text})}
                        />
                </Block>
                <Block flex row center width={width * 0.85} >
                        <FloatingLabelInput
                            multiline={true}
                            initialNumberOfLines={5}
                            maxLength={300}
                            errorMessage={formErrorMessage(errors,"descripcion")}
                            label="Descripción"
                            value={form.descripcion}
                            textCounter={form.descripcion}
                            onChangeText={text => setForm({...form,["descripcion"]:text})}
                        />
                </Block>
                
            <Block middle> 
            
              <Image source={image? { uri: image}: require("../assets/imgs/rutina.jpg" )} style={{ width: 0.85*width, height:0.65*width, borderRadius:10, marginTop:20, marginBottom:10, resizeMode:"contain" }} />

            </Block>
           
            <Block flex row center style={{marginTop:10}}>
             
                    <Button disabled={isLoadingGaleria} loading={isLoadingGaleria} onPress={()=>pickImage(false)} color="primary" style={{width: width * 0.5}}>
                      <Block flex row >
                      <Icon 
                        size={20}
                        color={argonTheme.COLORS.WHITE}
                        name="photo-library"
                        family="MaterialIcons"
                        style={{top:11,left:-3}}
                        
                      />
                      <Text style={{top:9, marginLeft:7}} bold size={17}  color={argonTheme.COLORS.WHITE}>Adjuntar foto</Text>
                      
                      </Block>
                     
                    </Button>
            
                    <Button disabled={isLoadingCamara} loading={isLoadingCamara} onPress={()=>takeAPicture(false)} color="primary" style={{width: width*0.3}}>
                    <Icon
                      
                      size={20}
                      color={argonTheme.COLORS.WHITE}
                      name="camera"
                      family="FontAwesome"
                      style={{marginRight: 8,marginLeft: 8}}
                    />
                    </Button>
               
            </Block>
            
            <Block style={{marginTop:30,marginBottom:30}} flex row  center>

                <Text
                    h4
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Entrenamientos
                </Text>
                
            </Block>

            {entrenamientos.map((entrenamiento,index) => (
                    <Block marginBottom={16} center row width={width*0.9}>
                        <EntrenamientoCard  entrenamiento={entrenamiento} 
                        deleteFunction={() => {
                            setIsLoadingContent(true)
                            let entrenamientosAux = entrenamientos
                            entrenamientosAux.splice(index,1)
                            setEntrenamientos(entrenamientosAux)
                            setIsLoadingContent(false)
                        }}
                        onPress={()=> {
                          setErrors({})
                          navigation.navigate("EntrenamientoForm",{...route["params"],["rutinaForm"]:form,["entrenamientos"]:entrenamientos,["entrenamiento"]:{...entrenamiento,["numOrden"]:""+index}})}}/>
                    </Block>
                ))}
             {formErrorMessage(errors,"entrenamientos")==undefined? null : 
                    <Block flex row center style={{width:"80%",marginTop:8,left:5}}> 
                    <Text style={{
                        color: argonTheme.COLORS.MESSAGE_ERROR,
                        
                        }}>{formErrorMessage(errors,"entrenamientos")}</Text>
                    </Block>
                }

            <Block marginBottom={10} marginTop={entrenamientos.length> 0 ? 100 : 200} middle>
                  <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit} color="primary" style={styles.createButton}>
                    <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                      Guardar
                    </Text>
                  </Button>
            </Block>
            
            <Block style={{position:"absolute",bottom: 100,alignSelf:"center",right:"5%"}}>
              <CircleButton onPress={ ()=> {
                setErrors({})
                navigation.navigate('EntrenamientoForm',{"rutinaForm":form,"entrenamientos":entrenamientos})}} />
            </Block>
            {form.id?
                <Block  disabled={isLoadingEliminar} loading={isLoadingEliminar} marginTop={5}  center >
                <Button style={styles.button} onPress={()=> Alert.alert(
                "Eliminar rutina","¿Estás seguro de que quieres eliminar la rutina: '" + form.titulo + "' ?",
                [
                    {text:"SÍ",onPress:()=> deleteRutina(form.id)},
                    {text:"NO"}
                ]
                )} 
                color="error">
                <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                    Eliminar rutina
                </Text>
                </Button>
            </Block> 
            
            :null}
            </>}
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
      marginTop:"5%",
      justifyContent: 'center',
     
    }, createButton: {
       
        width: width * 0.6,
        marginBottom: 20,
      },button: {
        width: width * 0.6,
        marginTop:"4%",
        marginBottom: "4%",
      }
})