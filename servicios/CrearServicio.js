import React, {useEffect,useState} from 'react';
import { View, Dimensions,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text } from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button } from '../components';

const { width, height } = Dimensions.get("screen");
export default function CrearServicio({navigation}) {

  
    const[errors, setErrors]= useState({})
    const[form,setForm]=useState({
        titulo:"",
        descripcion:"",


    })
    
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
                    
                    color={argonTheme.COLORS.DEFAULT}
                >
                    Publicar Servicio
                </Text>
             </Block>
                <Block flex row middle width={width * 0.8} style={{marginTop:"6%"}}>
                        <FloatingLabelInput
                            errorMessage={formErrorMessage(errors,"titulo")}
                            label="Título"
                            value={form.titulo}
                            onChangeText={text => setForm({...form,["titulo"]:text})}
                        />
                </Block>

                <Block flex row middle width={width * 0.8} style={{marginTop:"6%"}}>
                        <FloatingLabelInput
                            multiline={true}
                            initialNumberOfLines={5}
                            errorMessage={formErrorMessage(errors,"descripcion")}
                            label="Descripción"
                            value={form.descripcion}
                            onChangeText={text => setForm({...form,["descripcion"]:text})}
                        />
                </Block>

                <Block style={{marginTop:"10%",marginBottom:"5%"}} flex row  center>

                <Text
                    h5
                    bold
                    
                    color={argonTheme.COLORS.DEFAULT}
                >
                    Tarifas
                </Text>
                
                   
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
    circleButtonContainer:{
        
       

        
    }
})