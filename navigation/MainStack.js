import * as React from 'react';

import Articles from "../plantillas/Articles";

import CustomDrawerContent from "./Menu";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../registro/Registro';
import CrearServicio from '../servicios/CrearServicio';
import Login from '../login/Login';
import Home from '../Home';
import ListadoNoticias from '../plantillas/ListadoNoticias'
import Elements from '../plantillas/Elements';
import Onboarding from '../plantillas/Onboarding';
import Pro from '../plantillas/Pro';
import Profile from '../plantillas/Profile';
import Prueba from '../Prueba';
import AfterRegister from '../registro/AfterRegister';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
       
       <Stack.Navigator>
          <Stack.Screen
            name="AfterRegister"
            component={AfterRegister}
            options={{ headerShown: false }
            }
            />

       <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }
            }
            />

       <Stack.Screen
            name="Elements"
            component={Elements}
            options={{ title: 'Elements' }
            }
            />

      

       <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Profile' }
            }
            />

       <Stack.Screen
            name="Pro"
            component={Pro}
            options={{ title: 'Pro' }
            }
            />


       <Stack.Screen
            name="OnBoarding"
            component={Onboarding}
            options={{ title: 'Onboarding' }
            }
            />

       <Stack.Screen
            name="Articles"
            component={Articles}
            options={{ title: 'Articles' }
            }
            />
      
          <Stack.Screen
            name="ListadoNoticias"
            component={ListadoNoticias}
            options={{ title: 'Listado Noticias' }
            }
            />
            <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Inicio' }
            }
            />
         
          
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{ headerShown: false }
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

