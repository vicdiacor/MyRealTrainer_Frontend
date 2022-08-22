import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView , Platform} from 'react-native';
import MainStack from './navigation/MainStack';




export default function App() {
  return (
   
      <>
     
      <MainStack/>
       
      </>
    

  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
