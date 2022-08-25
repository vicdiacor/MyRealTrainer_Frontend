
import React, { useState, useEffect } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput'
import FormErrorMessage from '../components/FormErrorMessage';
import validateRegistroForm from './ValidateRegistroForm';
import call from '../Caller';
import { datePicker,dateTimeFormat} from '../components/Dates';
import { View,SafeAreaView,ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView, TextInput,TouchableWithoutFeedback
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { ALWAYS } from 'expo-secure-store';

const { width, height } = Dimensions.get("screen");


export default function RegisterPlantilla({navigation}) {
  
  const [form, setForm]= useState({
    email:"",
    password:"",
    nombre:"",
    apellidos:"",
    fechaNacimiento: "",
    localidad: "",
    privacidad:false,
  })

  const[fixedLabelDate,setFixedLabelDate]= useState(false)
  
  const[errors, setErrors]= useState({})
  const [show,setShow] = useState(false);
  const [secureTextMode,setSecureTextMode]= useState(true);

  const onChangeFechaNacimiento= (event,selectedDate) => {
   
    setShow(false);
    setFixedLabelDate(true)
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
      <SafeAreaView>
      <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
      <Block  flex  middle>
        
     
          <Block flex safe  middle>
            <Block  flex style={styles.registerContainer}>
              
              <Block flex >
                <Block style={{marginTop:"10%",marginBottom:"5%"}} flex middle>
               
                  <Text
                    h3
                    bold
                   
                    color={argonTheme.COLORS.DEFAULT}
                  >
                   Registro
                  </Text>
                </Block>
                
                
                <Block  center>
                  <KeyboardAvoidingView
                
                    enabled
                  >
                     <Block width={width * 0.8} style={styles.blockInput}>
                     <FloatingLabelInput
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
                    
                    <FormErrorMessage jsonErrors={errors} errorName="email"/>
                    </Block>
                    

                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      label="Contraseña"
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
                    
                    
                    
                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      label="Nombre"
                      
                      onChangeText={text => setForm({...form,["nombre"]:text})}
                      
                    />
                      
                    </Block>
                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      label="Apellidos"
                      onChangeText={text => setForm({...form,["apellidos"]:text})}
                      
                    />
                    </Block>
                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      label="Localidad"
                      onChangeText={text => setForm({...form,["localidad"]:text})}
                     
                     
                    />
                      
                    </Block>
                    <TouchableWithoutFeedback style={{zIndex:50}} onPress={() => setShow(true)}>

                    
                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      fixedLabel={fixedLabelDate}
                      label="Fecha de nacimiento"
                      editable={false}
                      value={form.fechaNacimiento===""? "" : dateTimeFormat(form.fechaNacimiento,false)}
                      iconContent={
                        <Icon
                       
                        
                          size={22}
                          color={argonTheme.COLORS.ICON}
                          name="calendar-edit"
                          family="MaterialCommunityIcons"
                          style={{marginRight:"3%"}}

                          
                        />
                      }
                     
                    />
                    <FormErrorMessage jsonErrors={errors} errorName="fechaNacimiento"/>

                    </Block>
                    
                    </TouchableWithoutFeedback>
                  
                    {show ? (datePicker("date",form.fechaNacimiento===""?new Date():form.fechaNacimiento,onChangeFechaNacimiento)):(null)}
                    <Block row width={width * 0.75} style={styles.blockInput}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="Estoy de acuerdo con la"
                      />
                      <Button
                        
                        style={{ width: 128 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Política de privacidad
                      </Button>
                      
                    </Block>
                    <Block  middle>
                      <Button  color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Crear cuenta
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        
      </Block>
      </ScrollView>
      </SafeAreaView>
    )
  }


const styles = StyleSheet.create({
  
  registerContainer: {
    width: width,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginBottom: "10%",
  },
  blockInput:{
    
    marginRight: 0.06*width, 
    marginLeft:0.06*width
  }
});
