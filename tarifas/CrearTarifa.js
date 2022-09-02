import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button, Select } from '../components';
import RNPickerSelect from "react-native-picker-select";
import CheckBoxLugarEntrenamiento from '../components/CheckBoxLugarEntrenamiento';
import SelectPicker from '../components/SelectPicker';

const { width, height } = Dimensions.get("screen");
export default function CrearTarifa({navigation}) {

    const [isLoading,setIsLoading]= useState(false)
    const[errors, setErrors]= useState({})
    const[form,setForm]=useState({
        titulo:"",
        precio:"",
        duracion:"",
        tipoDuracion:"Mes",
        limitaciones:"",

    })
    const handleSubmit= evt => {
        setIsLoading(true)
        
    
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
                    Crear Tarifa
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
                <Block flex row style={{marginTop:"6%"}}>
                    <Block  flex={0.30} row width={width * 0.30}>
                            <FloatingLabelInput
                                placeholderFontSize={15}
                                keyboardType="numeric"
                                errorMessage={formErrorMessage(errors,"precio")}
                                label="Precio(€)"
                                value={form.precio}
                                onChangeText={text => setForm({...form,["precio"]:text})}
                            />
                            
                    </Block>
                    <Block  style={{marginLeft:"1%"}} flex={0.30} row width={width * 0.30}>
                            <FloatingLabelInput
                                placeholderFontSize={15}
                                keyboardType="numeric"
                                errorMessage={formErrorMessage(errors,"duracion")}
                                label="Duración"
                                value={form.duracion}
                                onChangeText={text => setForm({...form,["duracion"]:text})}
                            />
                            
                    </Block>
                    <Block style={{marginLeft:"1%",marginTop:"2.4%"}} flex={0.4} row>
                        <SelectPicker 
                            width={width*0.33}
                            height={65}
                            value={form.tipoDuracion}
                            onValueChange={(value) => setForm({...form,["tipoDuracion"]:value})}
                            items={[
                                { color:argonTheme.COLORS.BLACK ,label: "  Mes/es", value: "Mes" },
                                { color:argonTheme.COLORS.BLACK,label: "  Año/s", value: "Año" },
                                { color:argonTheme.COLORS.BLACK, label: "  Hora/s", value: "Hora" },
                             
                            ]}
                        />
                    </Block>
                     
                </Block>
                <Block flex row center width={width * 0.85} style={{marginTop:"6%"}}>
                        <FloatingLabelInput
                            maxLength={500}
                            textCounter={form.limitaciones}
                            errorMessage={formErrorMessage(errors,"limitaciones")}
                            multiline
                            initialNumberOfLines={4}
                            label="Limitaciones del servicio"
                            value={form.limitaciones}
                            onChangeText={text => setForm({...form,["limitaciones"]:text})}
                        />
                </Block>
               
                <Block style={{marginTop:"10%",marginBottom:"5%"}} flex row  center>
               
                        <Text
                            h5
                            bold
                            
                            color={argonTheme.COLORS.DEFAULT}
                        >
                            Lugares de las sesiones
                        </Text>
                </Block>
                <Block flex row center style={{width:"80%",marginTop:"5%"}}>
                    <CheckBoxLugarEntrenamiento title={"Mi gimnasio"}>
                    </CheckBoxLugarEntrenamiento>
                </Block>
                <Block flex row center style={{width:"80%",marginTop:"5%"}}>
                    <CheckBoxLugarEntrenamiento title={"Telemático"}>
                    </CheckBoxLugarEntrenamiento>
                </Block>
                <Block flex row center style={{width:"80%",marginTop:"5%"}}>
                    <CheckBoxLugarEntrenamiento title={"Al aire libre"}>
                    </CheckBoxLugarEntrenamiento>
                </Block>

                <Block flex row center style={{width:"80%",marginTop:"5%"}}>
                    <CheckBoxLugarEntrenamiento title={"Tu domicilio"}>
                    </CheckBoxLugarEntrenamiento>
                </Block>
                <Block flex row center style={{width:"80%",marginTop:"5%"}}>
                    <CheckBoxLugarEntrenamiento title={"Mi domicilio"}>
                    </CheckBoxLugarEntrenamiento>
                </Block>
                
               
                
                <Button style={styles.circleButton}>
                            <Icon
                            
                            size={20}
                            color={argonTheme.COLORS.WHITE}
                            name="plus"
                            family="Entypo"
                            style={{alignSelf: "center"}}
                            
                            />
                </Button>
                 
                <Block  marginTop="30%" center>
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }, circleButton:{
        
        
        
        zIndex:10,
        borderRadius: 100,
        width: width*0.13,
        height: width*0.13,
        color: argonTheme.COLORS.PRIMARY,
        backgroundColor: argonTheme.COLORS.PRIMARY,
        position:"absolute",
        bottom: "7%",
        right:"0%",
    
        
    },
    pickerContainer:{
        marginLeft:"1%",
        backgroundColor:"#FFFF",
        height:65,
        marginTop:8,
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
        marginTop:"4%",
        marginBottom: "4%",
      }
})