import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../registro/Registro';


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{ title: 'Registro' }
            }
            />
          </Stack.Navigator>

    </NavigationContainer>
  );
};

export default MainStack