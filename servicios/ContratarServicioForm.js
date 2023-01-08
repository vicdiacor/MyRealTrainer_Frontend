import React, {useEffect,useState} from 'react';
import { View, Dimensions,Image,ActivityIndicator,SafeAreaView,KeyboardAvoidingView, StatusBar,ScrollView,StyleSheet,Alert} from 'react-native';
import { Block, Text , theme} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { Icon, Button,Switch} from '../components';
import TarifaCard from '../components/TarifaCard';
import { getCookie } from '../temporal_database/SecureStore';
import call from '../Caller';
import { delay } from '../components/Delay';
import validateCrearServicio from './ValidateCrearServicio';
import { showBackendErrors, yesOrNotAlertMessage } from '../util/UtilFunctions';
const { width, height } = Dimensions.get("screen");
import { useIsFocused } from "@react-navigation/native";


import CircleButton from '../components/CircleButton';
import CarouselCards from '../components/CarouselCards';
import { datePicker, dateTimeFormat } from '../components/Dates';

export default function SolicitarServicioForm({navigation,route}) {

  const isFocused = useIsFocused();
  const [reducedDescription,setReducedDescription]= useState(false)
    const[errors, setErrors]= useState({})
    const[isLoading,setIsLoading]=useState(false)
    const[isLoadingContent,setIsLoadingContent]=useState(true)
    const[servicio,setServicio]=useState({
      "titulo":"",
      "descripcion":"",

    })
    const [form,setForm] =  useState({
      fechaInicio:"",
      fechaFin: ""
    })
    const [show1,setShow1] = useState(false);
    const [show2,setShow2] = useState(false);

    const [descripcion,setDescripcion]=useState("")

    const[fixedLabelDate1,setFixedLabelDate1]= useState(false)
    const[fixedLabelDate2,setFixedLabelDate2]= useState(false)

    const [tarifas,setTarifas] = useState([])
    const imgContainer = [styles.imageContainer,
      styles.verticalStyles,
       styles.shadow
     ];

     const cardContainer = [styles.card, styles.shadow];

     
    
    const RenderTarifa = ({item, index}) => {
        return (
          <Block flex  key={index}>
            <TarifaCard  onPressContainer={()=> null} style={{width:width*0.9,alignSelf:"center"}} tarifa={item}/>
          </Block>
        )
      }
       
      function changeReducedDescriptionMode(){
        if(reducedDescription){
          setDescripcion(servicio["descripcion"])
          setReducedDescription(false)
        }else{
          setDescripcion(servicio["descripcion"].substring(0, 300))
          setReducedDescription(true)
        }
      }

      const onChangeFechaInicio= (event,selectedDate) => {
   
        setShow1(false);
        setFixedLabelDate1(true)
        setForm({...form,["fechaInicio"]:selectedDate})
    
      };
      const onChangeFechaFin= (event,selectedDate) => {
   
        setShow2(false);
        setFixedLabelDate2(true)
        setForm({...form,["fechaFin"]:selectedDate})
    
      };
    

  
    useEffect(()=>{
      setIsLoadingContent(true)
      setServicio(route["params"]["servicio"])
      setTarifas(route["params"]["tarifas"])
      setDescripcion(route["params"]["servicio"]["descripcion"])
      setIsLoadingContent(false)
    },[isFocused])


 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Block flex safe  > 
                <KeyboardAvoidingView
                    


                    enabled
                >
               {isLoadingContent?
            <Block center marginTop={100}>
              <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
            </Block>
            : <>
            <Block style={{marginTop:60,marginBottom:10}} flex row  center>
               
                <Text
                    h4
                    bold
                    
                    color={argonTheme.COLORS.ICON}
                >
                    Solicitar Servicio
                </Text>
             </Block>

             <Block  card flex style={cardContainer}>
                <Block flex style={imgContainer}>
                    <Image source={{uri: "https://img.freepik.com/foto-gratis/entrenamiento-fisico-kettlebells_1098-13823.jpg?w=1060&t=st=1673114575~exp=1673115175~hmac=b9bac408b34fe66ebbb0e0887d5349e531289d1d799ed337eed3b90db2b085c5"}} style={styles.fullImage} />
                </Block>
                <Block left flex space="between" style={styles.cardDescription}>
                    <Text bold size={17} style={styles.cardTitle}>{servicio.titulo}</Text>
                    <Text  size={14} style={{textAlign: 'justify',marginRight:5,marginLeft:5}}>{descripcion}   {reducedDescription?<Text  onPress={()=> {changeReducedDescriptionMode}} size={14} style={{marginRight:5,zIndex:2,marginLeft:5,marginTop:5,marginBottom:50}} color={argonTheme.COLORS.PRIMARY} bold>{reducedDescription? "...Leer más": "Mostrar menos"}</Text>: null}</Text>
                 
                </Block>
              </Block>

              <Block style={{marginTop:30,marginBottom:32}} flex row  center>

                    <Text
                        h4
                        bold
                        
                        color={argonTheme.COLORS.ICON}
                    >
                        Seleccionar tarifa
                    </Text>
                    
                </Block>
            <CarouselCards data={tarifas} RenderItem={RenderTarifa}/>
            <Block marginBottom={30} flex row  center>
               
               <Text
                   h4
                   bold
                   
                   color={argonTheme.COLORS.ICON}
               >
                   Duración del contrato
               </Text>
            </Block>
            <Block  row center width={width * 0.8}>
                    <FloatingLabelInput
                     onPress={() => setShow1(true)}
                      errorMessage={formErrorMessage(errors,"fechaInicio")}
                      fixedLabel={fixedLabelDate1}
                      label="Fecha de inicio"
                      editable={false}
                      value={form.fechaInicio===""? "" : dateTimeFormat(form.fechaInicio,false)}
                      iconContent={
                        <Icon
                       
                          onPress={() => setShow1(true)}
                          size={24}
                          color={argonTheme.COLORS.ICON}
                          name="calendar-edit"
                          family="MaterialCommunityIcons"
                          style={{marginRight:"3%"}}

                          
                        />
                      }
                     
                    />

                </Block>
                {show1 ? (datePicker("date",form.fechaInicio===""?new Date():form.fechaInicio,onChangeFechaInicio)):(null)}

                <Block  row center width={width * 0.8}>
                    <FloatingLabelInput
                     onPress={() => setShow2(true)}
                      errorMessage={formErrorMessage(errors,"fechaFin")}
                      fixedLabel={fixedLabelDate2}
                      label="Fecha de fin"
                      editable={false}
                      value={form.fechaFin===""? "" : dateTimeFormat(form.fechaFin,false)}
                      iconContent={
                        <Icon
                       
                          onPress={() => setShow2(true)}
                          size={24}
                          color={argonTheme.COLORS.ICON}
                          name="calendar-edit"
                          family="MaterialCommunityIcons"
                          style={{marginRight:"3%"}}

                          
                        />
                      }
                     
                    />

                </Block>
                {show2 ? (datePicker("date",form.fechaFin===""?new Date():form.fechaFin,onChangeFechaFin)):(null)}


                <Block marginBottom={10} marginTop={100} middle>
                      <Button disabled={isLoading} loading={isLoading} onPress={null} color="primary" style={styles.button}>
                        <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                          Solicitar servicio
                        </Text>
                      </Button>
                </Block>
                </>
                }
              
            </KeyboardAvoidingView>
            </Block> 
            
        </ScrollView>
        
        
    </SafeAreaView>



 )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F4F5F7",
      justifyContent: 'center',
    },button: {
        width: width * 0.6,
        marginTop:"4%",
        marginBottom: "4%",
      }, errorMessageStyle:{
        color: argonTheme.COLORS.MESSAGE_ERROR,
        left:5,
        
      },
      fullImage: {
        height: 215,
        borderRadius:5,
      },
      imageContainer: {
        borderRadius: 10,
        elevation: 1,
        overflow: 'hidden',
        width: width * 0.9,
        alignSelf: "center",

      },
    shadow: {
      shadowColor: theme.COLORS.BLACK,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 2,
    },
    verticalStyles: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0
    },
    card: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: theme.SIZES.BASE,
      borderWidth: 0,
      minHeight: 114,
      marginBottom: 16,
      borderRadius:10,
      width: 0.9*width,
      alignSelf: "center",
    }, cardDescription: {
      padding: theme.SIZES.BASE / 2,
    
    },
    cardTitle: {
      flex: 1,
      flexWrap: 'wrap',
      paddingBottom: 6,
      marginRight:5,
      marginLeft:5
    }

})