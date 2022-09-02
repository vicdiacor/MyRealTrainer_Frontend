import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button, Select } from '../components';
import RNPickerSelect from "react-native-picker-select";
import SelectPicker from '../components/SelectPicker';

const { width, height } = Dimensions.get("screen");
export default function CrearLugarEntrenamiento({navigation}) {

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
        tipo:"Mi gimnasio"
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
                                value={form.tipo}
                                title="Tipo"
                                onValueChange={(value) => setForm({...form,["tipo"]:value})}
                                items={[
                                    { color:argonTheme.COLORS.BLACK ,label: "  Mi gimnasio", value: "Mi gimnasio" },
                                    { color:argonTheme.COLORS.BLACK ,label: "  Mi domicilio", value: "Mi domicilio" },
                                    { color:argonTheme.COLORS.BLACK ,label: "  Otro", value: "Otro" }
                                
                                ]}/>
                </Block>
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
        width: width * 0.5,
        marginBottom: "10%",
      }
})