
import {deleteCookie} from "../temporal_database/SecureStore"


export default function Logout(navigation){

    deleteCookie("AuthToken"); // determine if authorized, from context or however you're doing it
    deleteCookie("idLogged")
    deleteCookie("nameLogged")
    deleteCookie("apellidosLogged")
    deleteCookie("emailLogged")
    navigation.navigate('Login')
    
}
