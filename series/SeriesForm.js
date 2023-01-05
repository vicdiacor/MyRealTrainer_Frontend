import React, {useEffect,useRef,useState} from 'react';
import { View, Dimensions,Keyboard,TextInput, TouchableWithoutFeedback,ActivityIndicator,SafeAreaView,KeyboardAvoidingView,Image, Alert,StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { useIsFocused } from "@react-navigation/native";
import EjercicioCard from '../components/EjercicioCard';
import CircleButton from '../components/CircleButton';
import { generateNumberSelectors,keyboardDimissAndExecuteFunction, round2Decimals } from '../util/UtilFunctions';
import {Icon, Button, Input} from "../components";
import SegmentedPicker from 'react-native-segmented-picker';
import SerieCard from '../components/SerieCard';
import validateSeriesForm from './ValidateSeriesForm';
import { InteractionManager } from 'react-native';

const { width, height } = Dimensions.get("screen");

export default function SeriesForm({navigation,route}) {
  const [visiblePickerTiempo,setVisiblePickerTiempo] = useState(false);
  const [visiblePickerNumSeries,setVisiblePickerNumSeries] = useState(false);
  const [bloqueSeries,setBloqueSeries]=useState();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading]= useState(true);
  const [isLoadingSeries, setIsLoadingSeries]= useState(false);
  const segmentedPickerTiempo= useRef(null)
  const saveButtonRef= useRef(null);
  const segmentedPickerNumSeries= useRef(null)
  const [isLoadingButton,setIsLoadingButton] = useState(false) 
  const emptyInputRef= useRef(null)

  const [form,setForm]= useState({
    numSeries:"1",
    id:"",
    numOrden:"",
    tiempoEntreSeries:"00:00",
    tipoBloque:"REPETICIONES",
    series:[{
      numOrden:"0",
      numRepeticiones:"",
      peso:"",
      tiempo:"00:00:00"
    }],
    ejercicio:null
  });
  const[errors, setErrors]= useState({})
  const[isKeyboardOpened,setIsKeyboardOpened]=useState(false)

  useEffect(()=>{
    if(route["params"]["bloque"]){
      setForm(route["params"]["bloque"])
    }else{
      setForm({...form,["ejercicio"]:route["params"]["ejercicio"]})

    }
    
    setIsLoading(false)

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpened(true)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpened(false)
    });


  },[isFocused])
   
  
  function onConfirmNumSeries(selections){
    // Save numSeries in the form
    
    setIsLoadingSeries(true)
    const numeroSeries= Number.parseInt(selections["numSeries"])

    if(Number.isNaN(numeroSeries)){
      setForm({...form,["numSeries"]:""+0})
    }else if (numeroSeries > 20) {
      setForm({...form,["numSeries"]:""+20})

    } else if(numeroSeries<0){
      setForm({...form,["numSeries"]:""+0})
    }else {
      setForm({...form,["numSeries"]:""+numeroSeries})

    }
    setVisiblePickerNumSeries(false)

    // Shows the different "series-card" taking into account "numSeries" from the form
    
    let series= form.series.slice(0,numeroSeries)
    
    
    for(let i = series.length ; i < numeroSeries ; i++){
      
      let nuevaSerie= {
        numOrden:"" + i,
        numRepeticiones:"",
        peso:"",
        tiempo: "00:00:00"
      }
      series.push(nuevaSerie)

    }
    setForm({...form,["series"]:series,["numSeries"]:""+numeroSeries})
    setIsLoadingSeries(false)
  }

  const onConfirmTiempoDescanso = (selections)=> {
    
    setForm({...form,["tiempoEntreSeries"]:""+selections["minutos"] + ":" + selections["segundos"]})
    setVisiblePickerTiempo(false)
  }


  const onConfirmTiempoSerie = (selections,index)=> {
    
    let series= form.series
    series[index]={...series[index],["tiempo"]:""+selections["horas"] + ":" + selections["minutos"] + ":" +selections["segundos"]}
    setForm({...form,["series"]:series});
    
  }


  const afterEditingNumRepeticiones = (text,index) => {
    
    let series = form.series
    let serie= series[index]

   
      if( !/^\d\d?\d?$/.test(text)){
          series[index]={...serie,["numRepeticiones"]:''}
      }else{
          let numero= Number(text)
          numero >=1 ? series[index]={...serie,["numRepeticiones"]: '' + numero} :  series[index]={...serie,["numRepeticiones"]: '1'} 
          
     } 
      setForm({...form,["series"]:series})
    
  
  
  }


  
 

  const afterEditingPeso = (text,index) =>{
    let series= form.series
   
    if( !/^(\d|\.\d)/.test(text)){
      series[index]= {...series[index],["peso"]:''}
  }else if(Number(text)>999){
      series[index]={...series[index],["peso"]:'999'}
  }else if(Number(text)<0){
      series[index]({...series[index],["peso"]:'0'})
  }else{
      let approximatedPeso = round2Decimals(text)
      series[index]={...series[index],["peso"]:""+approximatedPeso}
  }
    setForm({...form,["series"]:series})
  }
  
function editEjercicio(ejercicio){
  let form={
    titulo:ejercicio["titulo"],
    preparacion:ejercicio["preparacion"],
    ejecucion:ejercicio["ejecucion"],
    consejos:ejercicio["consejos"],
    id: ejercicio["id"]
}
navigation.navigate('EjercicioForm',{...route["params"],["form"]:form,["mode"]:"edit"})
}

// Open  the keyboard in order to dismiss it (later) to refresh the text inputs
function reloadKeyboardAndExecuteFunction(funcion){

   
  const onOpenKeyboardListener = (event) => {
    Keyboard.removeListener('keyboardDidShow', onOpenKeyboardListener);
    funcion()
}

  Keyboard.addListener('keyboardDidShow', onOpenKeyboardListener);
  emptyInputRef.current.focus()

}

function handleSubmit(){

  

  let nuevosErrores= validateSeriesForm(form)
  setErrors(nuevosErrores)
  let numeroErrores = Object.keys(nuevosErrores).length;
  if(numeroErrores===0){
    let formulario = form
    let entrenamiento = route["params"]["entrenamiento"]

    if (formulario.numOrden!==""){
      
      entrenamiento["bloques"][formulario.numOrden] = formulario
    }else{
      formulario["numOrden"] = "" + entrenamiento["bloques"].length
      entrenamiento["bloques"].push(formulario)
    }
    
    console.log("BLOQUE TRAS SUBMIT ===============")
    console.log(formulario)
    delete route['params']["bloque"]
    delete route["params"]["ejercicio"]
    navigation.navigate("EntrenamientoForm",{...route["params"],["entrenamiento"]:entrenamiento})
    setIsLoadingButton(false)
    
  }else{
    setIsLoadingButton(false)
  }

}
  


 return (

    <SafeAreaView style={styles.container}> 
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Block flex safe  > 
                <KeyboardAvoidingView enabled>
                  <Block style={{marginTop:40,marginBottom:40}} flex row  center>

                      <Text
                          h4
                          bold
                          
                          color={argonTheme.COLORS.ICON}
                      >
                          Asignar series
                      </Text>
                      
                  </Block>
                  {isLoading? 
                  <Block center marginTop={100}>
                  <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                  </Block>
                  
                  :
                  <>
                <Block width={width*0.9} center marginBottom={20}>
                  <EjercicioCard textSize={14.5} imageOnLeft={true} onPress={()=>editEjercicio(form["ejercicio"])} ejercicio={form["ejercicio"]} />
                </Block>
                      
                <Block  row  center width={width * 0.9}>
                      
                        <FloatingLabelInput
                         onPress={()=>setVisiblePickerTiempo(true)}
                        errorMessage={formErrorMessage(errors,"tiempoEntreSeries")}
                        editable={false}
                        label="Descanso entre series (min:s)"
                      
                        value={form["tiempoEntreSeries"]}
                        iconContent={
                          <Icon
                        
                            onPress={()=>setVisiblePickerTiempo(true)}
                            size={26}
                            color={argonTheme.COLORS.ICON}
                            name="clock-edit-outline"
                            family="MaterialCommunityIcons"
                            style={{marginRight:"3%"}}

                            
                          />
                        }
                      
                        />
                </Block>
                <Block  row  center width={width * 0.9}>
                    <FloatingLabelInput
                            onPress={()=> isKeyboardOpened? keyboardDimissAndExecuteFunction(()=>setVisiblePickerNumSeries(true)): reloadKeyboardAndExecuteFunction(()=>keyboardDimissAndExecuteFunction(()=>setVisiblePickerNumSeries(true)))}
                            errorMessage={formErrorMessage(errors,"numSeries")}
                            label="Número de series"
                            editable={false}
                            
                            value={form.numSeries}
                           
                            iconContent={
                              <Icon
                                onPress={()=> isKeyboardOpened ?  keyboardDimissAndExecuteFunction(()=>setVisiblePickerNumSeries(true)) : reloadKeyboardAndExecuteFunction(()=>keyboardDimissAndExecuteFunction(()=>setVisiblePickerNumSeries(true))) }
                              

                                size={25}
                                color={argonTheme.COLORS.ICON}
                                name="edit"
                                family="Feather"
                                style={{marginRight:"3%"}}

                                
                              />
                            }
                          
                            />
                    </Block>
                 
               
                <Block>
                <SegmentedPicker
                    ref={segmentedPickerTiempo}
                    onConfirm={onConfirmTiempoDescanso}
                    onCancel={()=> setVisiblePickerTiempo(false)}
                    confirmText="Aceptar"
                    defaultSelections={{["minutos"]: form.tiempoEntreSeries.split(":")[0],["segundos"]: form.tiempoEntreSeries.split(":")[1]}}
                    visible={visiblePickerTiempo}
                    options={[
                      {
                        key: 'minutos',
                        items: generateNumberSelectors(0,29,true)
                      },
                      {
                        key: 'separador',
                        items: [
                          { label: ':', value: ':' },
                        ],
                      },{
                        key: 'segundos',
                        items: generateNumberSelectors(0,59,true)
                      }
                    ]}
                />
                </Block>
                <Block>
                <SegmentedPicker
                    ref={segmentedPickerNumSeries}
                    onConfirm={onConfirmNumSeries}
                    onCancel={()=> setVisiblePickerNumSeries(false)}
                    confirmText="Aceptar"
                    defaultSelections={{["numSeries"]: form.numSeries}}
                    visible={visiblePickerNumSeries}
                    options={[
                      {
                        key: 'numSeries',
                        items: generateNumberSelectors(1,20,false)
                      }
                    ]}
                />
                </Block>
                <Block style={{marginTop:20,marginBottom:20}} flex row  center>

                  <Text
                      h4
                      bold
                      
                      color={argonTheme.COLORS.ICON}
                  >
                      Series
                  </Text>

                </Block>
                {isLoadingSeries? 
                  <Block center marginTop={100}>
                  <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                  </Block>
                  :
                  <>
              <Block flex row center marginBottom={10} width={width*0.92}>
                <TouchableWithoutFeedback onPress={() => {
                  setForm({...form,["tipoBloque"]:"REPETICIONES"})
                }}>
                  <Block  style={[styles.card,form.tipoBloque !== "TIEMPO" && styles.selectedTipoSerie]} flex row marginRight={5} middle  width={width*0.4}>
                    
                      <Text size={16} bold color={form.tipoBloque !== "TIEMPO" ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON}>Repeticiones</Text>

                  </Block>
                 </TouchableWithoutFeedback>
                 <TouchableWithoutFeedback onPress={() => {
                  setForm({...form,["tipoBloque"]:"TIEMPO"})
                }}>
                 <Block style={[styles.card,form.tipoBloque == "TIEMPO" && styles.selectedTipoSerie]} flex row middle  width={width*0.4}>
                   
                  
                   <Text size={16} bold color={form.tipoBloque == "TIEMPO"? argonTheme.COLORS.WHITE :  argonTheme.COLORS.ICON}>Tiempo</Text>
                  </Block>
                </TouchableWithoutFeedback>
               </Block>

                <Block style={styles.card} flex row center width={width*0.92}>
                   {form.tipoBloque !== "TIEMPO" ?  
                   <>
                   <Block flex={0.35}  center>
                    <Text size={16} bold color={argonTheme.COLORS.ICON}>Nº</Text>
                   </Block>

                  <Block flex row center>
                   
                    <Block flex={0.4} center>
                      <Text size={16} bold color={argonTheme.COLORS.ICON}>Repeticiones</Text>
                    </Block>
                    <Block flex={0.6} center>
                      <Text  size={16} bold color={argonTheme.COLORS.ICON}>Peso</Text>
                    </Block>
                  </Block>
                   
                   </>
                   :
                   <>
                    <Block flex={0.18} right>
                    <Text size={16} bold color={argonTheme.COLORS.ICON}>Nº</Text>
                   </Block>
                   
                   <Block flex center>
                   <Text size={16} bold color={argonTheme.COLORS.ICON}>Tiempo</Text>
                   </Block>
                  </> 
                   }
                   
                  

                </Block>

                     {form.series.map((serie,index)=>(
                        <Block>
                          <Block row center marginTop={10} width={width*0.92}>
                            <SerieCard serie={serie} numSerie={index+1} onConfirmTiempo={onConfirmTiempoSerie}
                                      tipo={form.tipoBloque}
                                      afterEditingNumRepeticiones={afterEditingNumRepeticiones}
                                      errores={errors[""+index]}
                                      afterEditingPeso={afterEditingPeso} />
                           

                          </Block>
                          
                          {form.tipoBloque == "TIEMPO" ? 
                            <>
                              {formErrorMessage(errors[""+index],"tiempo") != null  ?  
                                    <Text row style={styles.errorMessageStyle}>{formErrorMessage(errors[""+index],"tiempo")}</Text>:null}
                            </>
                            : 
                            <> 
                              {formErrorMessage(errors[""+index],"numRepeticiones") != null ?<Text row style={styles.errorMessageStyle}>{formErrorMessage(errors[""+index],"numRepeticiones")}</Text> : null }
                              {formErrorMessage(errors[""+index],"peso") != null ? <Text row style={styles.errorMessageStyle}>{formErrorMessage(errors[""+index],"peso")}</Text> : null}
                            
                            </>
                                            
                          }

                        </Block>
                      ))}
                <Block  marginTop={20} marginBottom={10} middle>
                    <Button  disabled={isLoadingButton} loading={isLoadingButton} onPress={()=> {
                      setIsLoadingButton(true)
                      isKeyboardOpened ? keyboardDimissAndExecuteFunction(()=>handleSubmit()) : reloadKeyboardAndExecuteFunction(()=>keyboardDimissAndExecuteFunction(()=>handleSubmit())) 
                    }} color="primary" style={styles.createButton}>
                      <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                        Guardar
                      </Text>
                    </Button>
                </Block>
                <TextInput ref={emptyInputRef}></TextInput>
                  </>
                }
               
            
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
      marginTop:"5%",
      justifyContent: 'center',
     
    }, createButton: {
       
        width: width * 0.6,
        marginBottom: 20,
      },button: {
        width: width * 0.6,
        marginTop:"4%",
        marginBottom: "4%",
      },
       errorMessageStyle:{
        color: argonTheme.COLORS.MESSAGE_ERROR,
        marginTop:8,
        marginLeft:"5.5%",
        width:width*0.9
        
      },card: {
        backgroundColor: '#FFFFFF',
        borderWidth:1,
        borderRadius: 8,
        borderColor: argonTheme.COLORS.BORDER,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
        height:50
    },
    selectedTipoSerie : {
      backgroundColor: argonTheme.COLORS.ICON,
    }
})