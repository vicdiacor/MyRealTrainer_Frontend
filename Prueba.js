import React, { useState, useEffect } from 'react';
import { SafeAreaView,ScrollView,Text, Dimensions, TextInput, View} from "react-native";
import {Block} from 'galio-framework';
import FloatingLabelInput from './components/FloatingLabelInput';
import { Icon } from './components';
import { argonTheme } from './constants';
import FormErrorMessage from './components/FormErrorMessage';


export default function Prueba({navigation}) {
     const [estado,setEstado]= useState("")
     const [form, setForm]= useState({
      email:"",
      password:"",
      nombre:"",
      apellidos:"",
      fechaNacimiento: new Date(),
      localidad: ""
    })
    return (
      <SafeAreaView >
      <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
      
      <Block> 
      
    
                     <FloatingLabelInput
                      label="Emaila"
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
      </ScrollView>
      </SafeAreaView>
    )
  }

