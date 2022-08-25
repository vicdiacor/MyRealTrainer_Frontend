import React, { useState } from 'react';
import {saveCookie,deleteCookie} from "../temporal_database/SecureStore"
import { StyleSheet,Alert,Dimensions, ScrollView, 
   View, SafeAreaView,StatusBar,
  KeyboardAvoidingView } from 'react-native';
import validateLoginForm from './ValidateLoginForm';
import call from '../Caller';
import formErrorMessage from '../components/FormErrorMessage';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Button, Icon, Input} from "../components";
import {  argonTheme } from "../constants";
import { Block, Text } from "galio-framework";
import { delay } from '../components/Delay';

// import { createDatabaseIfNotExists } from '../gestionSQLite/RepositorySQLite';
const { width, height } = Dimensions.get("screen");

export default function Login({navigation}) {
  
  const [form, setForm]= useState({
    email:"",
    password:"",
  })
  const[errors, setErrors]= useState({})
  const [secureTextMode,setSecureTextMode]= useState(true);
  const [isLoading,setIsLoading]= useState(false)

  
  const handleSubmit= evt => {
    setIsLoading(true)
    
    var nuevosErrores= validateLoginForm(form)
    setErrors(nuevosErrores)

    var numeroErrores = Object.keys(nuevosErrores).length;
    if(numeroErrores===0){

        const data= {
            "nameOrEmail": form.email,
            "password": form.password,
        }
        call(`/api/auth/signin`,"POST",navigation,data)
            .then(async response  =>  {

                if(response !== undefined && response.ok){
                let respuestaTexto= await response.text()
                let auth_token = await respuestaTexto.split(" ")[1]
                let emailLogeado =  await respuestaTexto.split(" ")[0]
                

                saveCookie("AuthToken",auth_token)

                call('/usuarios/email/'+emailLogeado, 'GET',navigation).then(async response => {
                   
                    if(response !== undefined && response.ok){
                        const usuario = await response.json()
                        console.log("GUARDANDO EN SECURE STORE")
                        console.log(usuario.apellidos)
                        saveCookie("idLogged",""+usuario.id);
                        saveCookie("nameLogged",""+usuario.name);
                        saveCookie("apellidosLogged",""+usuario.apellidos);
                        saveCookie("emailLogged",""+usuario.email);
                        // createDatabaseIfNotExists() Base de datos local 

                        navigation.navigate('CrearServicio')
                        await delay(1000)
                        setIsLoading(false)
                        

                    }else{
                        
                        deleteCookie("AuthToken");
                        setIsLoading(false)
                        
                    }
                });
                    

             }else{
                setIsLoading(false)
                if(data.nameOrEmail &&  data.password){
                  setIsLoading(false)
                  Alert.alert(
                    "Error",
                    "Usuario o contraseña incorrectos",
                    [
                      
                      { text: "OK" }
                    ]
                  );
    
                }
             }
        })

    
      }else{
        setIsLoading(false)
      }
     
      
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
                    h2
                    bold
                   
                    color={argonTheme.COLORS.DEFAULT}
                  >
                   MyRealTrainer
                  </Text>
                </Block>
           
            <Block width={width * 0.8} style={styles.blockInput}>
                      <FloatingLabelInput
                        
                        errorMessage={formErrorMessage(errors,"email")}
                        label="Email"
                        onChangeText={text => setForm({...form,["email"]:text.replace(/\s/g, "")})}
                        iconContent={<Icon
                  
                          size={20}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={{marginRight: 8}}
                        />}
                        
                      
                      />
              </Block>
              <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      label="Contraseña"
                      errorMessage={formErrorMessage(errors,"password")}
                      secureTextEntry={secureTextMode}
                      onChangeText={text => setForm({...form,["password"]:text})}
                      iconContent={
                        <Icon
                          onPress={()=>setSecureTextMode(!secureTextMode)}
                          size={20}
                          color={argonTheme.COLORS.ICON}
                          name={secureTextMode?"eye-off":"eye" }
                          family="Ionicons"
                          style={{marginRight:"3%"}}
                        />
                      }
                    />
                </Block>
           
                <Block style={{marginTop:"6%"}} middle>
                      <Button loading={isLoading} onPress={handleSubmit} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Iniciar Sesión
                        </Text>
                      </Button>
                </Block>

                <Block  middle>
                    <Button 
                      onPress={() => navigation.navigate('Registro')} 
                        style={styles.invisibleButton}
                        shadowless
                       
                      >
                       <Text bold size={18} 
                         color={argonTheme.COLORS.ICON}>Crear cuenta</Text>
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
    logo:{
      fontWeight:"bold",
      fontSize:45,
      color:"#fb5b5a",
      marginBottom:40,
      alignSelf:"center",
    },
    blockInput:{
      
      marginRight: "6%", 
      marginLeft:"6%"
    },
    inputView:{
      width:"100%",
      backgroundColor:"#465881",
      alignItems:"center",
      justifyContent:"center",
      alignSelf:"center",
      borderRadius:25,
      height:50,
      marginBottom:20,
      
      padding:20
    },
    inputViewAlto:{
      width:"100%",
      backgroundColor:"#465881",
      alignItems:"center",
      justifyContent:"center",
      alignSelf:"center",
      borderRadius:25,
      height:100,
      marginBottom:20,
      
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"100%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      alignSelf:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }, createButton: {
      width: width * 0.5,
      marginBottom: "10%",
    },invisibleButton:{
      width: 128, 
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 0,
        backgroundColor: "#F4F5F7",borderRadius:0, borderColor: "#F4F5F7"
    }
   
  
  });