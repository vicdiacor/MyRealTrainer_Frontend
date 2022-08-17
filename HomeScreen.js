import React from 'react'
import {StyleSheet,  Text, View, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function HomeScreen ({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
        <Text> Hoala </Text>
        </SafeAreaView>
      
    );
  };


  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
