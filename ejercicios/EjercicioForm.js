import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView,Image, Alert,StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button, Select } from '../components';
import { showBackendErrors} from "../util/UtilFunctions"
import * as ImagePicker from 'expo-image-picker';
import VideoComponent from '../components/VideoComponent';
import validateEjercicioForm from './ValidateEjercicioForm';

import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
const { width, height } = Dimensions.get("screen");
export default function EjercicioForm({navigation,route}) {

    const [isLoading,setIsLoading]= useState(false)
    const [isLoadingGaleria,setIsLoadingGaleria]= useState(false)
    const [isLoadingCamara,setIsLoadingCamara]= useState(false)
    const [isLoadingGaleriaVideos,setIsLoadingGaleriaVideos]= useState(false)
    const [isLoadingCamaraVideos,setIsLoadingCamaraVideos]= useState(false)
    const[isLoadingEliminar,setIsLoadingEliminar]=useState(false)
    const[errors, setErrors]= useState({})
    const[form,setForm]=useState({
        id:"",
        titulo:"",
        preparacion:"",
        ejecucion:"",
        consejos:"",
    })
    const [image, setImage] = useState(null);
    const [videos,setVideos]= useState({});
    
    useEffect(()=>{
      if (route["params"]["mode"]=="edit"){
        setForm(route["params"]["form"])
      }
      
    },[route["params"]])

    function deleteEjercicio(id){
      setIsLoadingEliminar(true)
      call('/ejercicios/'+id,"DELETE", navigation)
              .then(response => {
                if (response.ok){
                      navigation.navigate("ListarEjercicios",{ejercicio:null})
                      setIsLoadingEliminar(false)
                }else{
                  showBackendErrors(response)
                  setIsLoadingEliminar(false)
                }
              }) 
    }

    const handleSubmit= evt => {
      setIsLoading(true)
      var nuevosErrores= validateEjercicioForm(form)
      setErrors(nuevosErrores)
      var numeroErrores = Object.keys(nuevosErrores).length;
      if(numeroErrores===0){
          var data={
              titulo:form.titulo,
              preparacion: form.preparacion,
              ejecucion: form.ejecucion,
              consejos: form.consejos,
              
          }
          if(route["params"]["mode"]==="edit"){ // Edit an existing ejercicio
            data["id"]= form.id
            call('/ejercicios/'+form.id,"PUT", navigation,data)
            .then(response => {
              if (response.ok){
                navigation.navigate("ListarEjercicios",{ejercicio:form})
                setIsLoading(false)
              }else{
                setIsLoading(false)
                showBackendErrors(response)
              }
            }) 
          }else{      // Create a new ejercicio
            getCookie("emailLogged").then(email => {
              call('/ejercicios/'+email,"POST", navigation,data)
              .then(response => {
                if (response.ok){
                  navigation.navigate("ListarEjercicios",{ejercicio:form})
                  setIsLoading(false)
                }else{
                  setIsLoading(false)
                  showBackendErrors(response)
                }
              }) 
          })
          }
          
          
      }else{
          setIsLoading(false)
      }
      
    }
    function deleteVideo(key){
      delete videos[key]
      setVideos({...videos}) // To render after state has finished
    }
    const pickImage = async (videoType) => {
        videoType? setIsLoadingGaleriaVideos(true):  setIsLoadingGaleria(true)
       
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: videoType? ImagePicker.MediaTypeOptions.Videos :   ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: videoType? [9,6] :[4, 4],
          quality: 1,
        });
    
        if (!result.cancelled) {
            if(videoType){
                var index= Object.keys(videos).length
                setVideos({...videos,[index]:{uri:result.uri,titulo:"Cómo realizar correctamente este ejercicio"}})
                setIsLoadingGaleriaVideos(false)
            }else{
                setImage(result.uri);
                setIsLoadingGaleria(false)
            }
      
    
        }else{
            videoType? setIsLoadingGaleriaVideos(false) : setIsLoadingGaleria(false)
    
        }
      };

      const takeAPicture = async (videoType) => {
        videoType? setIsLoadingCamaraVideos(true) : setIsLoadingCamara(true)
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: videoType? ImagePicker.MediaTypeOptions.Videos :  ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: videoType? [9,6] :[4, 4],
          quality: 1,
        });
    
        if (!result.cancelled) {

            if(videoType){ 
                var index= Object.keys(videos).length
                setVideos({...videos,[index]:{uri:result.uri,titulo:"Cómo realizar correctamente este ejercicio"}})
                setIsLoadingCamaraVideos(false)
            }else{
                setImage(result.uri);
                setIsLoadingCamara(false)
            }
          
        }else{
            videoType? setIsLoadingCamaraVideos(false) :setIsLoadingCamara(false)
        }
      };
 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Block flex safe  > 
                <KeyboardAvoidingView
                    


                    enabled
                >

                <Block style={{marginTop:60,marginBottom:20}} flex row  center>
                
                    <Text
                        h5
                        bold
                        
                        color={argonTheme.COLORS.ICON}
                    >
                        Crear ejercicio
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
                            maxLength={500}
                            errorMessage={formErrorMessage(errors,"preparacion")}
                            label="Preparación"
                            value={form.preparacion}
                            textCounter={form.preparacion}
                            onChangeText={text => setForm({...form,["preparacion"]:text})}
                        />
                </Block>
                <Block flex row center width={width * 0.85} >
                        <FloatingLabelInput
                            multiline={true}
                            initialNumberOfLines={5}
                            maxLength={500}
                            errorMessage={formErrorMessage(errors,"ejecucion")}
                            label="Ejecución del ejercicio"
                            value={form.ejecucion}
                            textCounter={form.ejecucion}
                            onChangeText={text => setForm({...form,["ejecucion"]:text})}
                        />
                </Block>
                <Block flex row center width={width * 0.85} >
                        <FloatingLabelInput
                            multiline={true}
                            initialNumberOfLines={5}
                            maxLength={500}
                            errorMessage={formErrorMessage(errors,"consejos")}
                            label="Consejos"
                            value={form.consejos}
                            textCounter={form.consejos}
                            onChangeText={text => setForm({...form,["consejos"]:text})}
                        />
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
            <Block middle> 
            
            <Image source={image? { uri: image}: require("../assets/imgs/avatar_default.png" )} style={{ width: 0.65*width, height:0.65*width, borderRadius:1000, marginTop:20, marginBottom:10, resizeMode:"contain" }} />

            </Block>
            <Block flex row center style={{marginTop:10}}>
             
                    <Button disabled={isLoadingGaleriaVideos} loading={isLoadingGaleriaVideos} onPress={()=>pickImage(true)} color="primary" style={{width: width * 0.5}}>
                      <Block flex row >
                      <Icon 
                        size={20}
                        color={argonTheme.COLORS.WHITE}
                        name="photo-library"
                        family="MaterialIcons"
                        style={{top:11,left:-3}}
                        
                      />
                      <Text style={{top:9, marginLeft:7}} bold size={17}  color={argonTheme.COLORS.WHITE}>Adjuntar videos</Text>
                      
                      </Block>
                     
                    </Button>
            
                    <Button disabled={isLoadingCamaraVideos} loading={isLoadingCamaraVideos} onPress={()=>takeAPicture(true)} color="primary" style={{width: width*0.3}}>
                    <Icon
                      
                      size={20}
                      color={argonTheme.COLORS.WHITE}
                      name="camera"
                      family="FontAwesome"
                      style={{marginRight: 8,marginLeft: 8}}
                    />
                    </Button>
               
            </Block>
            <Block  marginBottom={20}> 
            {Object.entries(videos).map( ([key,value])=> (
                <>

                <VideoComponent uri={value["uri"]} titulo={value["titulo"]} 
                deleteFunction={()=> deleteVideo(key) } />
                
                </>
            ) )}

            </Block>

                <Block marginTop={20} marginBottom={10} middle>
                      <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Guardar
                        </Text>
                      </Button>
                </Block>

                {form.id?
                    <Block  disabled={isLoadingEliminar} loading={isLoadingEliminar} marginTop={5}  center >
                    <Button style={styles.button} onPress={()=> Alert.alert(
                    "Eliminar servicio","¿Estás seguro de que quieres eliminar el ejercicio: '" + form.titulo + "' ?",
                    [
                        {text:"SÍ",onPress:()=> deleteEjercicio(form.id)},
                        {text:"NO"}
                    ]
                    )} 
                    color="error">
                    <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                        Eliminar ejercicio
                    </Text>
                    </Button>
                </Block> 
                
                :null}
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