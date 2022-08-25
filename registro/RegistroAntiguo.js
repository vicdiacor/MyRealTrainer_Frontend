import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TextInput,SafeAreaView, StatusBar,ScrollView, TouchableOpacity, Button } from 'react-native';
import FormErrorMessage from '../components/FormErrorMessage';
import validateRegistroForm from './ValidateRegistroForm';
import call from '../Caller';
import { datePicker,dateTimeFormat} from '../components/Dates';

export default function Registro({navigation}) {
  
  const [form, setForm]= useState({
    email:"",
    password:"",
    nombre:"",
    apellidos:"",
    fechaNacimiento: new Date(),
    localidad: ""
  })

  
  const[errors, setErrors]= useState({})

  const [show,setShow] = useState(false);

  const onChangeFechaNacimiento= (event,selectedDate) => {
    setShow(false);
    setForm({...form,["fechaNacimiento"]:selectedDate})
  };


  const handleSubmit= evt => {
   
    
    var nuevosErrores= validateRegistroForm(form)
    setErrors(nuevosErrores)

    var numeroErrores = Object.keys(nuevosErrores).length;
    if(numeroErrores===0){
      
      
      const data= {
        "email": form.email,
        "password":form.password,
        "nombre":form.nombre,
        "apellidos": form.apellidos,
        "fechaNacimiento": form.fechaNacimiento,
        "localidad":form.localidad
        }
         
        
      call('/api/auth/signup',"POST", navigation, data)
        .then(response => {
          
          if (response.ok){
           navigation.navigate('Login')
            console.log(response)
          }
        })
      }
  }
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}>
        
        <Text style={styles.logo}>Registro</Text>
        <Text style={styles.TextoBlancoMedioGrande}>Email:</Text>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="antonio@gmail.com" 
            placeholderTextColor="#003f5c"
            onChangeText={text => setForm({...form,["email"]:text.replace(/\s/g, "")}) }/>
        </View>
        <FormErrorMessage jsonErrors={errors} errorName="email"/>

        <Text style={styles.TextoBlancoMedioGrande}>Contraseña:</Text>

        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            onChangeText={text => setForm({...form,["password"]:text})
            }/>
        </View>
        <FormErrorMessage jsonErrors={errors} errorName="password"/>

      



        <Text style={styles.TextoBlancoMedioGrande}>Nombre:</Text>
        <View style={styles.inputView} >
          <TextInput  
            
            style={styles.inputText}
            placeholder="Antonio" 
            placeholderTextColor="#003f5c"
            onChangeText={text => setForm({...form,["nombre"]:text})
            }/>
        </View>
        <FormErrorMessage jsonErrors={errors} errorName="nombre"/>

        <Text style={styles.TextoBlancoMedioGrande}>Apellidos:</Text>

        <View style={styles.inputView} >
          <TextInput
            
            
            style={styles.inputText}
            placeholder="Salcedo Segura" 
            placeholderTextColor="#003f5c"
            onChangeText={text => setForm({...form,["apellidos"]:text})
            }/>
        </View>
        <FormErrorMessage jsonErrors={errors} errorName="apellidos"/>
          
        <Text style={styles.TextoBlancoMedioGrande}>Localidad:</Text>
        <View style={styles.inputView} >
          <TextInput  
            
            style={styles.inputText}
            placeholderTextColor="#003f5c"
            onChangeText={text => setForm({...form,["localidad"]:text})
            }/>
        </View>
        <FormErrorMessage jsonErrors={errors} errorName="localidad"/>

        <Text style={styles.TextoBlancoMedioGrande}>Fecha de nacimiento:</Text>

        <View style={styles.buttonDatesViews}>
          <Button color={"#fb5b5a"} title='Seleccionar fecha de nacimiento' onPress={() => setShow(true)}/>
        </View> 
        
        <Text style={styles.TextoBlancoMedioGrande}>Fecha de nacimiento seleccionada:</Text>
        <Text style={styles.TextoBlancoMedioGrande}> {dateTimeFormat(form.fechaNacimiento,false)}</Text>


        <FormErrorMessage jsonErrors={errors} errorName="fechaNacimiento"/>

          {show ? (datePicker("date",form.fechaNacimiento,onChangeFechaNacimiento)):(null)}

        
        <TouchableOpacity style={styles.loginBtn}>
          <Text onPress={handleSubmit} style={styles.loginText}>Registrarme</Text>
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
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40,
    alignSelf:"center"
  },
  inputView:{
    width:"100%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    alignSelf:"center"
  },
  inputText:{
    height:50,
    color:"white",
    alignSelf:"center",
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
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
  TextoBlancoMedioGrande:{
    alignItems:"center",
    alignSelf:"center",
    justifyContent:"center",
    fontSize:20,
    color:"white",
    marginBottom:10,

  },
});