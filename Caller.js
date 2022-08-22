import Logout from "./login/Logout";
import jwt_decode from 'jwt-decode';
import {Alert} from "react-native";


const urlBackend ="http://192.168.0.63:8080";
const urlFrontend = "http://192.168.0.63:19000/";


     async function call(pathToCall,method,navigation,body){
       
        console.log("CALL A " + pathToCall)
        let headers_ = {"Content-Type": "application/json", "Access-Control-Allow-Origin" : urlFrontend, "mode": "cors"};
        
        const token = await getCookie('AuthToken');
       

        
        if(token !== undefined && token !== "undefined"){
            
            var decoded = jwt_decode(token);
            if(Date.now() >new Date(decoded.exp*1000) ){ // el token ha expirado y tenemos que logearnos de nuevo
                

                //Redirigir al Login con un ALERT
                Alert.alert(
                    "Error",
                    "Su sesión ha expirado, por favor, vuelva a iniciar sesión",
                    [
                      
                      { text: "OK", onPress: () => Logout(navigation) }
                    ]
                  );

            }

            headers_ = {"Authorization" : "Bearer " + token.toString(), "Content-Type": "application/json", "Access-Control-Allow-Origin" : urlFrontend, "mode": "cors"};
        }

        const requestOptions = {
            method: method,
            headers: headers_,
            body: (JSON.stringify(body))
        };
       
        return await fetch(urlBackend+pathToCall, requestOptions).then(response =>{
            console.log("Response en CALL para el path " + pathToCall)
            console.log(response)
            if(response.ok){
                console.log("200 OK")
                return response
            }else{
                response.json().then(res => {

                    if(res.hasOwnProperty("errores")){ // Mostrar errores CONTROLADOS
                        var errores= res.errores
                        for (var i=0; i<errores.length; i++){
                            
                            Alert.alert(
                                "Error",
                                errores[i],
                                [
                                  
                                  { text: "OK"}
                                ]
                              );

                            
                            
                        }
                    } else{ // Errores no controlados
                        
                        return response

                    }
                })
            }
            
        }).catch(exception =>{
           
           console.log(exception);  
        })
        

            
      
    
    }
    
export default call
