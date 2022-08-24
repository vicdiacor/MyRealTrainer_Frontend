import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function ErrorMessage({message}){
 
    if(message!=undefined){


        return ( 
        <View style={styles.InputErrorView} >
            <Text style={styles.MensajeError}> {message}</Text>
        </View>
        )
    }else{
        return null
    }
    

}


const styles = StyleSheet.create({

   
    InputErrorView:{
      width:"80%",
      backgroundColor:"rgb(255,45,38)",
      alignItems:"center",
      justifyContent:"center",
      alignSelf:"center",
      borderRadius:25,
      height:100,
      marginBottom:20,
      
      padding:20
  
    },
    MensajeError:{
        alignItems:"center",
        alignSelf:"center",
        justifyContent:"center",
        color:"white",
        marginBottom:10,
    
      },
  
  });


