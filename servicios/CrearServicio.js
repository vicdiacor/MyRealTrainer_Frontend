import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text } from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button } from '../components';
import TarifaCard from '../components/TarifaCard';
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
import { delay } from '../components/Delay';
import validateCrearServicio from './ValidateCrearServicio';
import { showBackendErrors } from '../util/UtilFunctions';
import {Alert} from "react-native";
const { width, height } = Dimensions.get("screen");
export default function CrearServicio({navigation,route}) {

  
    const[errors, setErrors]= useState({})
    const[isLoading,setIsLoading]=useState(false)
    const[isLoadingEliminar,setIsLoadingEliminar]=useState(false)
    const[isLoadingContent,setIsLoadingContent]=useState(true)
    const[form,setForm]=useState({
        titulo:"",
        descripcion:"",
        id:"",
    })

    const[tarifas,setTarifas]= useState({})
    var circleButtonStyle={
        
        
        
        zIndex:10,
        borderRadius: 100,
        width: width*0.13,
        height: width*0.13,
        color: argonTheme.COLORS.PRIMARY,
        backgroundColor: argonTheme.COLORS.PRIMARY,
        position:"absolute",
        bottom:form.id? 180:110,
        right:"5%",
        
    }
    function editTarifa (index,tarifa){
       
        var tarifaForm= {
            titulo:tarifa["titulo"],
            precio:""+tarifa["precio"],
            duracion:""+tarifa["duracion"],
            tipoDuracion:tarifa["tipoDuracion"],
            limitaciones:tarifa["limitaciones"],
            id:tarifa["id"]
        }
        var lugaresChecked=tarifa["lugares"]
        
        console.log(tarifaForm);
        navigation.navigate('CrearTarifa',{"servicioForm":form,tarifas:tarifas,"mode":route["params"]["mode"],"tarifaForm":tarifaForm,"lugaresChecked":lugaresChecked,"index":index})
    }
    function deleteServicio(id){
        setIsLoadingEliminar(true)
        call('/servicios/'+id,"DELETE", navigation)
                .then(response => {
                  if (response.ok){
                    
                        navigation.navigate("ListarMisServicios")
                        setIsLoadingEliminar(false)
                    
                  }else{
                    showBackendErrors(response)
                    setIsLoadingEliminar(false)
                  }
                }) 
    }
    useEffect(()=>{
        if (route["params"]["servicioForm"]!==undefined && route["params"]["tarifas"]!==undefined ){
            setForm(route["params"]["servicioForm"])
            getCookie("emailLogged").then(email => {
                call('/lugares/'+email,"GET", navigation)
                .then(response => {
                  if (response.ok){
                    response.json().then(data => {
                
                        Object.values(route["params"]["tarifas"]).forEach(tarifa=>{
                            console.log("TARIFA DENTRO DEL BUCLE:");
                            console.log(tarifa);
                            Object.keys(tarifa["lugares"]).forEach(lugarId=>{
                                tarifa["lugares"][lugarId]=data[lugarId]
                            })
                        
                        })
                    
                    setTarifas(route["params"]["tarifas"])
                    setIsLoadingContent(true)
                    setIsLoadingContent(false) // We need to render 2 times
                   
                    })
                  }else{
                    showBackendErrors(response)
                    
                  }
                }) 
            })

        }

    },[route["params"]])
    
    const handleSubmit=  evt => {
       setIsLoading(true)
        // Errors validation
        var nuevosErrores= validateCrearServicio(form,tarifas)
        setErrors(nuevosErrores)
        var numeroErrores = Object.keys(nuevosErrores).length;
        if(numeroErrores===0){
            var tarifasSubmit= []
            
            Object.values(tarifas).forEach( tarifa =>{ // We need an array of lugares, instead of a json
            
                var lugaresJSON= tarifa["lugares"]
                var lugaresArray= []
            
                Object.values(lugaresJSON).forEach( lugar =>{
                    lugaresArray.push(lugar)
                })
                tarifa["lugares"]=lugaresArray
                tarifasSubmit.push(tarifa)
            })
            
                var data={
                    titulo:form.titulo,
                    descripcion:form.descripcion,
                    tarifas: tarifasSubmit,
                }
                
                if(route["params"]["mode"]==="edit"){ // Edit an existing servicio
                    data["id"]= form.id
                    call('/servicios/'+form.id,"PUT", navigation,data)
                    .then(response => {
                    if (response.ok){
                        navigation.navigate("ListarMisServicios",{"servicioForm":form,"tarifas":tarifas})
                        setIsLoading(false)
                    }else{
                        setIsLoading(false)
                        showBackendErrors(response)
                    }
                    }) 
                }else{ // Create Servicio
                    getCookie("emailLogged").then(email => {
                        call('/servicios/'+email,"POST", navigation,data)
                        .then(response => {
                        if (response.ok){
                            navigation.navigate("ListarMisServicios",{"servicioForm":form,"tarifas":tarifas})
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
    function deleteTarifa(index){
        delete tarifas[index]
        setTarifas({...tarifas}) // To render after state has finished
      

    }

 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Block flex safe  > 
                <KeyboardAvoidingView
                    


                    enabled
                >

            <Block style={{marginTop:60,marginBottom:10}} flex row  center>
               
                <Text
                    h4
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Publicar Servicio
                </Text>
             </Block>
                <Block flex row center width={width * 0.8} style={{marginTop:20}}>
                        <FloatingLabelInput
                         maxLength={80}
                            errorMessage={formErrorMessage(errors,"titulo")}
                            label="Título"
                            value={form.titulo}
                            onChangeText={text => setForm({...form,["titulo"]:text})}
                        />
                </Block>

                <Block flex row center width={width * 0.8} style={{marginTop:20}}>
                        <FloatingLabelInput
                            multiline={true}
                            initialNumberOfLines={5}
                            maxLength={500}
                            errorMessage={formErrorMessage(errors,"descripcion")}
                            label="Descripción"
                            value={form.descripcion}
                            textCounter={form.descripcion}
                            onChangeText={text => setForm({...form,["descripcion"]:text})}
                        />
                </Block>

                <Block style={{marginTop:30,marginBottom:32}} flex row  center>

                <Text
                    h4
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Tarifas
                </Text>
                
                </Block>
                {formErrorMessage(errors,"tarifas")==undefined? null : 
                <Block flex row center width={width * 0.8} style={{marginTop:20}}>
                   
                    <Text style={styles.errorMessageStyle}>{formErrorMessage(errors,"tarifas")}</Text> 
                    
                </Block> }
                {!isLoadingContent? <>{Object.entries(tarifas).map(([index,tarifa]) => 
                        (
                        <TarifaCard deleteFunction={()=> deleteTarifa(index)} onPressContainer={()=> editTarifa(index,tarifa)} style={{width:width*0.85,marginBottom:30, alignSelf:"center"}} tarifa={tarifa}/>)

                    )}</> :null}
                    
               
                <Block marginTop={0}></Block>
                <Button  onPress={ ()=> navigation.navigate('CrearTarifa',{"servicioForm":form,tarifas:tarifas,"mode":route["params"]["mode"],"lugaresChecked":{}})} style={circleButtonStyle}>
                            <Icon
                            
                            size={20}
                            color={argonTheme.COLORS.WHITE}
                            name="plus"
                            family="Entypo"
                            style={{alignSelf: "center"}}
                            
                            />
                </Button>
                
                <Block  marginTop={120} center>
                      <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit} color="primary" style={styles.button}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Guardar
                        </Text>
                      </Button>
                </Block>
                {form.id?
                    <Block  disabled={isLoadingEliminar} loading={isLoadingEliminar} marginTop={5}  center >
                    <Button style={styles.button} onPress={()=> Alert.alert(
                    "Eliminar servicio","¿Estás seguro de que quieres eliminar el servicio: '" + form.titulo + "' ?",
                    [
                        {text:"SÍ",onPress:()=> deleteServicio(form.id)},
                        {text:"NO"}
                    ]
                    )} 
                    color="error">
                    <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                        Eliminar Servicio
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
      justifyContent: 'center',
    },button: {
        width: width * 0.6,
        marginTop:"4%",
        marginBottom: "4%",
      }, errorMessageStyle:{
        color: argonTheme.COLORS.MESSAGE_ERROR,
        left:5,
        
      }
})