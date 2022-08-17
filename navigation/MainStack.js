import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import Login from '../login/Login';
import Logout from '../login/Logout';
import Registro from '../registro/Registro';
import CrearEvento from '../crearEvento/CrearEvento';
import ListarEventos from '../listarEventos/ListarEventos';
import MisEventos from '../listarEventos/MisEventos';
import EditarEvento from '../crearEvento/EditarEvento';
import EventoCreadoCorrectamente from '../listarEventos/EventoCreadoCorrectamente';
import Prueba from '../login/Prueba';


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>

    

    </NavigationContainer>
  );
};

export default MainStack