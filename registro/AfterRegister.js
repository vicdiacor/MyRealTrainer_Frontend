import React, { useState } from 'react';
import {saveCookie,deleteCookie} from "../temporal_database/SecureStore"
import { StyleSheet,Alert,Dimensions, ScrollView, 
   View, SafeAreaView,StatusBar,
  KeyboardAvoidingView, TouchableOpacity, Image, TouchableWithoutFeedback,Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import call from '../Caller';
import formErrorMessage from '../components/FormErrorMessage';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Button, Icon, Input} from "../components";
import {  argonTheme } from "../constants";
import { Block, Text } from "galio-framework";
import { delay } from '../components/Delay';
import ImageButton from '../components/ImageButton';

// import { createDatabaseIfNotExists } from '../gestionSQLite/RepositorySQLite';
const { width, height } = Dimensions.get("screen");

export default function AfterRegister({navigation}) {
  
 
  const[errors, setErrors]= useState({})
  const[trainerForm, setTrainerForm]= useState({
    "formacion": "",
    "experiencia":"",
    "descripcion":"",
    "publico":true

  })

  const [isLoadingGuardar,setIsLoadingGuardar]= useState(false)
  const [isLoadingGaleria,setIsLoadingGaleria]= useState(false)
  const [isLoadingCamara,setIsLoadingCamara]= useState(false)
  const [clientSelected,setClientSelected]= useState(true)
  const [trainerSelected,setTrainerSelected]= useState(false)
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    setIsLoadingGaleria(true)
    // No permissions request is necessary for launching the image library
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
  const takeAPicture = async () => {
    setIsLoadingCamara(true)
    // No permissions request is necessary for launching the image library
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


  const handleSubmit= evt => {
    setIsLoadingGuardar(true)

        const data= {
            "trainer": trainerSelected ? true:false,
            "image": image,
        }
       
    // Loading guardar false
      
  }  

    return (


      <SafeAreaView style={styles.container}>
        
        <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
          <Block flex safe  middle> 
          <KeyboardAvoidingView
                
                enabled
              >
            
            <Block style={{marginTop:"10%",marginBottom:"5%"}} flex middle>
               
                  <Text
                    h5
                    bold
                   
                    color={argonTheme.COLORS.DEFAULT}
                  >¿Qué tipo de perfil eres?</Text>
            </Block>
            
           
            <Block flex row>
            <TouchableWithoutFeedback onPress={()=> {
              setClientSelected(true)
              setTrainerSelected(false)
            }}>
              <Block  style={{backgroundColor:"#FFFF", width:width*0.4}}  >
                <ImageButton selected={clientSelected} title="Cliente" sourceParameter={require("../assets/imgs/sportman.png")}></ImageButton>

              </Block>
            </TouchableWithoutFeedback>
          
            <Block  style={styles.invisibleContainer}></Block>
            <TouchableWithoutFeedback onPress={()=> {
              setTrainerSelected(true)
              setClientSelected(false)
            }}>
              <Block style={{backgroundColor:"#FFFF", width:width*0.4}}   >
                <ImageButton selected={trainerSelected} title="Entrenador" sourceParameter={require("../assets/imgs/trainer.png")}></ImageButton>

              </Block> 
            </TouchableWithoutFeedback>

            </Block>
            {trainerSelected?  
              (
                <> 
                <Block flex row center width={width * 0.8} style={styles.blockInput}>
                     <FloatingLabelInput
                      multiline={true}
                      maxLength={400}
                      value={trainerForm.formacion}
                      textCounter={trainerForm.formacion}
                      initialNumberOfLines={4}
                      errorMessage={formErrorMessage(errors,"formacion")}
                      label="Formación académica"
                      onChangeText={text => setTrainerForm({...trainerForm,["formacion"]:text})}
                    />
            </Block>

            <Block flex row center width={width * 0.8} style={styles.blockInput}>
                     <FloatingLabelInput
                      multiline={true}
                      maxLength={500}
                      value={trainerForm.experiencia}
                      textCounter={trainerForm.experiencia}
                      initialNumberOfLines={4}
                      errorMessage={formErrorMessage(errors,"experiencia")}
                      label="Experiencia"
                      onChangeText={text => setTrainerForm({...trainerForm,["experiencia"]:text})}
                    />
            </Block>
            <Block flex row center width={width * 0.8} style={styles.blockInput}>
                     <FloatingLabelInput
                      multiline={true}
                      maxLength={500}
                      value={trainerForm.descripcion}
                      textCounter={trainerForm.descripcion}
                      initialNumberOfLines={4}
                      errorMessage={formErrorMessage(errors,"descripcion")}
                      label="Descripción sobre mí"
                      onChangeText={text => setTrainerForm({...trainerForm,["descripcion"]:text})}
                    />
            </Block>
                
                </>
                )
            
            : null}
            

            <Block style={{marginTop:"7%"}} flex middle>
               
                  <Text
                    h5
                    bold
                   
                    color={argonTheme.COLORS.DEFAULT}
                  >Foto de perfil</Text>
            </Block>

            <Block middle> 
            
            <Image source={image? { uri: image}: require("../assets/imgs/avatar_default.png" )} style={{ width: 0.65*width, height:0.65*width, borderRadius:1000, marginTop:"7%", resizeMode:"contain" }} />

            </Block>
            <Block  flex row middle style={{marginTop:"6%"}}>
             
                    <Button loading={isLoadingGaleria} onPress={pickImage} color="primary" style={styles.createButton}>
                      <Block flex row >
                      <Icon 
                        size={20}
                        color={argonTheme.COLORS.WHITE}
                        name="photo-library"
                        family="MaterialIcons"
                        style={{top:11,left:-3}}
                        
                      />
                      <Text style={{top:9, marginLeft:7}} bold size={17}  color={argonTheme.COLORS.WHITE}>Abrir galería</Text>
                      
                      </Block>
                     
                    </Button>
                
                    <Button loading={isLoadingCamara} onPress={takeAPicture} color="primary" style={styles.photoButton}>
                    <Icon
                      
                      size={20}
                      color={argonTheme.COLORS.WHITE}
                      name="camera"
                      family="FontAwesome"
                      style={{marginRight: 8,marginLeft: 8}}
                    />
                    </Button>
               
            </Block>
            
            
            <Block style={{marginTop:"6%"}} middle>
                  <Button loading={isLoadingGuardar} onPress={handleSubmit} color="icon" style={styles.createButton}>
                    <Text bold size={17} color={argonTheme.COLORS.WHITE}>Guardar</Text>
                  </Button>
            </Block>
            
          </KeyboardAvoidingView>
          </Block>
        </ScrollView>
      </SafeAreaView>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F4F5F7",
      alignItems: 'center',
      justifyContent: 'center',
      padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      
    },
    blockInput:{
      marginTop:"6%",
    }
    ,
    loginText:{
      color:"white"
    }, createButton: {
      width: width * 0.4,
      
    },containerImage:{
      borderRadius: 4,
      shadowColor: argonTheme.COLORS.BLACK,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      shadowOpacity: 0.1,
      elevation:0.1}
      ,image:{
      resizeMode: "contain",
      marginTop:"5%",
      marginBottom:"1%"
    }, invisibleContainer:{
        marginRight:"8%"
    }, textInImage:{
      marginBottom: "5%"
    },photoButton:{
      width: width * 0.1,
    }
   
  
  });