import React, { useState, useEffect } from 'react';
import validateRegistroForm from './ValidateRegistroForm';
import call from '../Caller';
import { datePicker,dateTimeFormat} from '../components/Dates';
import { SafeAreaView,ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,TouchableWithoutFeedback
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import formErrorMessage from '../components/FormErrorMessage';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Button, Icon} from "../components";
import { argonTheme } from "../constants";
import { delay } from '../components/Delay';
const { width, height } = Dimensions.get("screen");


export default function Registro({navigation}) {
  
  const [form, setForm]= useState({
    email:"",
    password:"",
    nombre:"",
    apellidos:"",
    fechaNacimiento: "",
    localidad: "",
    politicaPrivacidad:false,
  })

  const[fixedLabelDate,setFixedLabelDate]= useState(false)
  
  var[errors, setErrors]= useState({})
  const [show,setShow] = useState(false);
  const [secureTextMode,setSecureTextMode]= useState(true);
  const [isLoading,setIsLoading]= useState(false)

  const onChangeFechaNacimiento= (event,selectedDate) => {
   
    setShow(false);
    setFixedLabelDate(true)
    setForm({...form,["fechaNacimiento"]:selectedDate})

  };


  const handleSubmit= evt => {
    setIsLoading(true)
    console.log("FORM ANTES DE VALIDAR")
    console.log(form)
    var nuevosErrores= validateRegistroForm(form)
    setErrors(nuevosErrores)
    console.log("NUEVOS ERRORS")
    console.log(nuevosErrores)
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
        .then(async response => {
          
          if (response.ok){
            
           navigation.navigate('AfterRegister')
           await delay(1000)
           setIsLoading(false)
            
          }else{
            setIsLoading(false)
          }
        })
      }else{
        setIsLoading(false)
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
                      
                      errorMessage={formErrorMessage(errors,"email")}
                      label="Email"
                      value={form.email}
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
                      value={form.password}
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
                    
                    
                    
                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      label="Nombre"
                      value={form.nombre}
                      errorMessage={formErrorMessage(errors,"nombre")}
                      onChangeText={text => setForm({...form,["nombre"]:text})}
                      
                    />
                      
                    </Block>
                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                       errorMessage={formErrorMessage(errors,"apellidos")}
                      label="Apellidos"
                      value={form.apellidos}
                      onChangeText={text => setForm({...form,["apellidos"]:text})}
                      
                    />
                    </Block>
                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      label="Localidad"
                      value={form.localidad}
                      onChangeText={text => setForm({...form,["localidad"]:text})}
                      errorMessage={formErrorMessage(errors,"localidad")}
                     
                    />
                      
                    </Block>
                    <TouchableWithoutFeedback style={{zIndex:50}} onPress={() => setShow(true)}>

                    
                    <Block width={width * 0.8} style={styles.blockInput}>
                    <FloatingLabelInput
                      errorMessage={formErrorMessage(errors,"fechaNacimiento")}
                      fixedLabel={fixedLabelDate}
                    
                      label="Fecha de nacimiento"
                      editable={false}
                      value={form.fechaNacimiento===""? "" : dateTimeFormat(form.fechaNacimiento,false)}
                      iconContent={
                        <Icon
                       
                          onPress={() => setShow(true)}
                          size={22}
                          color={argonTheme.COLORS.ICON}
                          name="calendar-edit"
                          family="MaterialCommunityIcons"
                          style={{marginRight:"3%"}}

                          
                        />
                      }
                     
                    />

                    </Block>
                    
                    </TouchableWithoutFeedback>
                  
                    {show ? (datePicker("date",form.fechaNacimiento===""?new Date():form.fechaNacimiento,onChangeFechaNacimiento)):(null)}
                    <Block row width={width * 0.75} style={styles.blockInput}>
                      <Checkbox
                      onChange={() => {
                        errors["politicaPrivacidad"]=undefined
                        setForm({...form,["politicaPrivacidad"]:!form.politicaPrivacidad})

                      }}
                        checkboxStyle={{
                          borderWidth: 2
                        }}
                        color={formErrorMessage(errors,"politicaPrivacidad")==undefined? argonTheme.COLORS.PRIMARY: argonTheme.COLORS.MESSAGE_ERROR}
                        label="Estoy de acuerdo con la"
                      />
                     
                      <Button
                        
                        style={styles.invisibleButton}
                        shadowless
                        
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Política de privacidad
                      </Button>
                     
                      
                    </Block>
                    <Block  middle>
                      <Button loading={isLoading} onPress={handleSubmit} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
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
    marginLeft:0.06*width,
    
  },invisibleButton:{
    width: 128, 
      shadowRadius: 0,
      shadowOpacity: 0,
      elevation: 0,
      backgroundColor: "#F4F5F7",borderRadius:0, borderColor: "#F4F5F7"
  }
});
