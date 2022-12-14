import * as React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../registro/Registro';
import CrearServicio from '../servicios/CrearServicio';
import Login from '../login/Login';
import Home from '../Home';
import Elements from '../plantillas/Elements';
import Onboarding from '../plantillas/Onboarding';
import Pro from '../plantillas/Pro';
import Profile from '../plantillas/Profile';
import AfterRegister from '../registro/AfterRegister';
import CrearTarifa from '../tarifas/CrearTarifa';
import CrearLugarEntrenamiento from '../lugares_entrenamiento/CrearLugarEntrenamiento';
import ListarMisServicios from '../servicios/ListarMisServicios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EjercicioForm from '../ejercicios/EjercicioForm';
import ListadoNoticias from '../plantillas/ListadoNoticias';
import ListarEjercicios from '../ejercicios/ListarEjercicios';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
     <Tab.Navigator>
          
          <Tab.Screen  name="Rest"
              component={RestStack}
              options={{ headerShown: false }
              } />
          
          <Tab.Screen  name="Servicios"
              component={ServiciosStack}
              options={{ headerShown: false }
              } />

           <Tab.Screen  name="Rutinas"
              component={RutinasStack}
              options={{ headerShown: false }
              } />

     </Tab.Navigator>

    </NavigationContainer>
  );
};

const ServiciosStack = ()=>{
     return (
     <Stack.Navigator>
    
            
     <Stack.Screen
            name="ListarMisServicios"
            component={ListarMisServicios}
            options={{ headerShown: false }
            }
            />

     <Stack.Screen
            name="CrearServicio"
            component={CrearServicio}
            options={{ headerShown: false }
            }
            />
       <Stack.Screen
            name="CrearTarifa"
            component={CrearTarifa}
            options={{ headerShown: false }
            }
            />
      <Stack.Screen
            name="CrearLugarEntrenamiento"
            component={CrearLugarEntrenamiento}
            options={{ headerShown: false }
            }
            />            
        </Stack.Navigator>
     );
}


const RestStack = ()=>{
     return (
          <Stack.Navigator>
          <Stack.Screen
               name="Login"
               component={Login}
               options={{ headerShown: false }
               }
               />
          <Stack.Screen
               name="ListadoNoticias"
               component={ListadoNoticias}
               options={{ headerShown: false }
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
            name="AfterRegister"
            component={AfterRegister}
            options={{ headerShown: false }
            }
            />
             <Stack.Screen
            name="Elements"
            component={Elements}
            options={{ title: 'Elements' }
            }
            />
      </Stack.Navigator>
      
     );
}
const RutinasStack = ()=>{
     return (
          <Stack.Navigator>
          <Stack.Screen
               name="ListarEjercicios"
               component={ListarEjercicios}
               options={{ headerShown: false }
               }
               />
          <Stack.Screen
               name="EjercicioForm"
               component={EjercicioForm}
               options={{ headerShown: false }
               }
               />
         
      </Stack.Navigator>
      
     );
}

export default MainStack

