import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button, Select } from '../components';
import RNPickerSelect from "react-native-picker-select";
import SelectPicker from '../components/SelectPicker';
import {backendFormatLugar, frontendFormatLugar} from "../util/UtilFunctions"
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
const { width, height } = Dimensions.get("screen");
export default function CrearLugarEntrenamiento({navigation,route}) {

    const [isLoading,setIsLoading]= useState(false)
    const[errors, setErrors]= useState({})
    const[form,setForm]=useState({
        titulo:"",
        descripcion:"",
        calle:"",
        numero:"",
        piso:"",
        ciudad:"",
        provincia:"",
        codigoPostal:"",
        tipoLugar:"Mi gimnasio"
    })

   /* useEffect(()=>{ //Esto es para el editar
        if(route["params"]!=null){
            console.log("LUGAR DEL BACKEND")
            var lugar = route["params"]["lugar"]
            console.log(lugar)
            var calle=""
            var numero=""
            var piso=""
            if(lugar["direccion"]!=null){
                var splittedDireccion =  lugar["direccion"].split(",")
            
                if(splittedDireccion.length >=1){
                    calle= splittedDireccion[0]
                    numero= splittedDireccion[1]
                }
                if(splittedDireccion.length === 3){
                    piso= splittedDireccion[2]
                }
            }
            setForm({...lugar,["calle"]:calle,["numero"]:numero,["piso"]:piso,["tipoLugar"]:frontendFormatLugar(lugar["tipoLugar"])})
            delete form['direccion'];
            console.log("FORMULARIO FINAL")
            console.log(form)
        }

    },[route["params"]]) */
    
  const handleSubmit= evt => {
    setIsLoading(true)
    var data={
        titulo:form.titulo,
        descripcion:form.descripcion,
        direccion: form.calle + "," + form.numero + "," + form.piso,
        ciudad:form.ciudad,
        provincia:form.provincia,
        codigoPostal:form.codigoPostal,
        tipoLugar: backendFormatLugar(form.tipoLugar)
    }
    console.log("DATA")
    console.log(data)
    getCookie("emailLogged").then(email => {
        call('/lugares/'+email,"POST", navigation,data)
        .then(response => {
          if (response.ok){
            navigation.navigate("CrearTarifa",{"tarifaForm":route["params"]["tarifaForm"], "servicioForm":route["params"]["servicioForm"],"tarifas":route["params"]["tarifas"]})
            setIsLoading(false)
          }else{
            navigation.navigate("CrearTarifa",{"tarifaForm":route["params"]["tarifaForm"], "servicioForm":route["params"]["servicioForm"],"tarifas":route["params"]["tarifas"]})
            setIsLoading(false)
          }
        }) 
    })
    

  }
    
 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Block flex safe  > 
                <KeyboardAvoidingView
                    


                    enabled
                >

            <Block style={{marginTop:"10%",marginBottom:"5%"}} flex row  center>
               
                <Text
                    h5
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Crear lugar de sesión
                </Text>
             </Block>
             
                <Block flex row center width={width * 0.85} style={{marginTop:"6%"}}>
                        <FloatingLabelInput
                            errorMessage={formErrorMessage(errors,"titulo")}
                            
                            label="Título"
                            value={form.titulo}
                            onChangeText={text => setForm({...form,["titulo"]:text})}
                        />
                </Block>
                
                <Block flex row center width={width * 0.85}>
                        <FloatingLabelInput
                            maxLength={300}
                            textCounter={form.descripcion}
                            errorMessage={formErrorMessage(errors,"descripcion")}
                            multiline
                            initialNumberOfLines={4}
                            label="Descripción"
                            value={form.descripcion}
                            onChangeText={text => setForm({...form,["descripcion"]:text})}
                        />
                </Block>
                <Block center  marginTop="3%">
                    <SelectPicker 
                                width={0.85*width}
                                value={form.tipoLugar}
                                title="Tipo"
                                onValueChange={(value) => setForm({...form,["tipoLugar"]:value})}
                                items={[
                                    { color:argonTheme.COLORS.BLACK ,label: "  Mi gimnasio", value: "Mi gimnasio" },
                                    { color:argonTheme.COLORS.BLACK ,label: "  Mi domicilio", value: "Mi domicilio" },
                                    { color:argonTheme.COLORS.BLACK ,label: "  Otro", value: "Otro" },
                                    { color:argonTheme.COLORS.BLACK ,label: "  Aire libre", value: "Aire libre" },
                                    { color:argonTheme.COLORS.BLACK ,label: "  Telemático", value: "Telemático" }
                                
                                ]}/>
                </Block>
                {form.tipoLugar==="Telemático"? null : 
                (<>

<Block style={{marginTop:"5%",marginBottom:"5%"}} flex row  center>
               
               <Text
                   h5
                   bold
                   
                   color={argonTheme.COLORS.ICON}
               >
                   Dirección
               </Text>
           </Block>

           <Block flex row center width={width * 0.85}>
                   <FloatingLabelInput
                       
                       errorMessage={formErrorMessage(errors,"calle")}
                       label="Calle"
                       value={form.calle}
                       onChangeText={text => setForm({...form,["calle"]:text})}
                   />
                    
           </Block>

           <Block flex row center width={width * 0.85}>
                   <FloatingLabelInput
                       
                       errorMessage={formErrorMessage(errors,"numero")}
                       label="Nº"
                       value={form.numero}
                       onChangeText={text => setForm({...form,["numero"]:text})}
                   />
                   <Block style={{marginLeft:"2%"}}></Block> 
                    <FloatingLabelInput
                       
                       errorMessage={formErrorMessage(errors,"piso")}
                       label="Piso"
                       value={form.piso}
                       onChangeText={text => setForm({...form,["piso"]:text})}
                   />
                   
           </Block>
           <Block flex row center width={width * 0.85}>
                   <FloatingLabelInput
                       
                       errorMessage={formErrorMessage(errors,"ciudad")}
                       label="Ciudad"
                       value={form.ciudad}
                       onChangeText={text => setForm({...form,["ciudad"]:text})}
                   />
                   
           </Block>
           <Block flex row center width={width * 0.85}>
                   <FloatingLabelInput
                       
                       errorMessage={formErrorMessage(errors,"codigoPostal")}
                       label="Código Postal"
                       value={form.codigoPostal}
                       onChangeText={text => setForm({...form,["codigoPostal"]:text})}
                   />
                   
           </Block>
           <Block flex row center width={width * 0.85}>
                   <FloatingLabelInput
                       
                       errorMessage={formErrorMessage(errors,"provincia")}
                       label="Provincia"
                       value={form.provincia}
                       onChangeText={text => setForm({...form,["provincia"]:text})}
                   />
                   
           </Block>
                
                </> )
                }
                
               
                <Block marginTop="8%" middle>
                      <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit} color="primary" style={styles.createButton}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Guardar
                        </Text>
                      </Button>
                </Block>
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
     
    }, circleButton:{
        
        
        
        zIndex:10,
        borderRadius: 100,
        width: width*0.13,
        height: width*0.13,
        color: argonTheme.COLORS.PRIMARY,
        backgroundColor: argonTheme.COLORS.PRIMARY,
        position:"absolute",
        bottom: "0%",
        right:"0%",
    
        
    },
    pickerContainer:{
        marginLeft:"2%",
        backgroundColor:"#FFFF",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
        borderWidth:0.8,
        borderRadius: 4,
        borderColor: argonTheme.COLORS.BORDER,
        
    }, createButton: {
       
        width: width * 0.6,
        marginBottom: "10%",
      }
})