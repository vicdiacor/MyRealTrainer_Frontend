import React, { useState, useEffect } from 'react';
import { SafeAreaView,ScrollView,Text, Dimensions, TextInput, View} from "react-native";
import {Block} from 'galio-framework';
import FloatingLabelInput from './components/FloatingLabelInput';
import { Icon } from './components';
import { argonTheme } from './constants';



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
      
     
      </ScrollView>
      </SafeAreaView>
    )
  }

