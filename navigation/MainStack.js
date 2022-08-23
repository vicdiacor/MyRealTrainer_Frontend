import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../registro/Registro';
import CrearServicio from '../servicios/CrearServicio';
import Login from '../login/Login';


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Iniciar sesión' }
            }
            />
          
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{ title: 'Registro' }
            }
            />

            <Stack.Screen
            name="CrearServicio"
            component={CrearServicio}
            options={{ title: 'Crear servicio' }
            }
            />
        </Stack.Navigator>

    </NavigationContainer>
  );
};

export default MainStack