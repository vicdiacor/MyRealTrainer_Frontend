import React, { useState, useEffect } from 'react';
import {saveCookie,getCookie,deleteCookie} from "../temporal_database/SecureStore"

import { StyleSheet,Button,Alert, ScrollView, Text, View, SafeAreaView,StatusBar, TextInput, TouchableOpacity } from 'react-native';
import FormErrorMessage from '../Util/FormErrorMessage';
import validateLoginForm from './ValidateLoginForm';
import call from '../Caller';
import Logout from './Logout';
// import { createDatabaseIfNotExists } from '../gestionSQLite/RepositorySQLite';


export default function Login({navigation}) {
  
  const [form, setForm]= useState({
    email:"",
    password:"",
  })
  const[errors, setErrors]= useState({})

  
  const handleSubmit= evt => {
   
    
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

                    }else{
                        
                        deleteCookie("AuthToken");
                        
                    }
                });
                    

             }else{

                if(data.nameOrEmail &&  data.password){
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

    
      }
     
      
  }  

    return (


      <SafeAreaView style={styles.container}>
        
        <ScrollView  showsVerticalScrollIndicator={false}>
        
       

        <Text style={styles.logo}>MyRealTrainer</Text>
        <Text style={styles.TextoBlancoMedioGrande}>Email:</Text>
        <View style={styles.inputView} >
        
          <TextInput
            
            style={styles.inputText}
            
            placeholder="antonio12345@gmail.com" 
            placeholderTextColor="#003f5c"

        
            onChangeText={text => setForm({...form,["email"]:text}) }/>
        </View>
        <FormErrorMessage jsonErrors={errors} errorName="email"/>

        <Text style={styles.TextoBlancoMedioGrande}>Contraseña:</Text>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="" 
            placeholderTextColor="#003f5c"
            onChangeText={text => setForm({...form,["password"]:text})
            }/>
        </View>
        <FormErrorMessage jsonErrors={errors} errorName="password"/>

     
        <TouchableOpacity style={styles.loginBtn}>
          <Text  onPress={handleSubmit} style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
          <Text  onPress={() =>
            navigation.navigate('Registro')} style={styles.loginText}>Registrarme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
          <Text  onPress={() => { createDatabaseIfNotExists()
          navigation.navigate("Prueba")}} style={styles.loginText}>Ver BD local</Text>
        </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#003f5c',
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
    },
    buttonDatesViews:{
      marginBottom:10,
      
      
    },
    TextoBlancoMedioGrande:{
      alignItems:"center",
      alignSelf:"center",
      justifyContent:"center",
      fontSize:20,
      color:"white",
      marginBottom:10,
  
    },
   
  
  });