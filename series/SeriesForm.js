import React, {useEffect,useRef,useState} from 'react';
import { View, Dimensions,TouchableWithoutFeedback,ActivityIndicator,SafeAreaView,KeyboardAvoidingView,Image, Alert,StatusBar,ScrollView,StyleSheet} from 'react-native';
import { Block, Text,Toast} from "galio-framework";
import { argonTheme } from '../constants';
import FloatingLabelInput from '../components/FloatingLabelInput';
import formErrorMessage from '../components/FormErrorMessage';
import { useIsFocused } from "@react-navigation/native";
import EjercicioCard from '../components/EjercicioCard';
import CircleButton from '../components/CircleButton';
import { insertIntoString } from '../util/UtilFunctions';
import {Icon} from "../components";
import SegmentedPicker from 'react-native-segmented-picker';
import SerieCard from '../components/SerieCard';


const { width, height } = Dimensions.get("screen");

export default function SeriesForm({navigation,route}) {
  const [visiblePickerTiempo,setVisiblePickerTiempo] = useState(false);
  const [visiblePickerNumSeries,setVisiblePickerNumSeries] = useState(false);
  const [bloqueSeries,setBloqueSeries]=useState();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading]= useState(true);
  const [isLoadingSeries, setIsLoadingSeries]= useState(false);
  const segmentedPickerTiempo= useRef(null)
  const segmentedPickerNumSeries= useRef(null)

  const [form,setForm]= useState({
    numSeries:"1",
    id:"",
    numOrden:"",
    minutosDescanso:"00",
    segundosDescanso:"00",
    series:[{
      numRepeticiones:"1",
      peso:"0.00",
      horas: "00",
      minutos:"00",
      segundos:"00"
    }],
    ejercicio:null
  });
  const[errors, setErrors]= useState({})

  useEffect(()=>{
    if(route["params"]["bloque"]){
      setForm(bloque)
    }

    if(route["params"]["ejercicio"]){
      setForm({...form,["ejercicio"]:route["params"]["ejercicio"]})
    }
    
    setIsLoading(false)

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
    
    while(series.length < numeroSeries){
      
      let nuevaSerie= {
        numRepeticiones:"1",
        peso:"0.00",
        horas: "00",
        minutos:"00",
        segundos:"00"
      }
      series.push(nuevaSerie)

    }
    setForm({...form,["series"]:series,["numSeries"]:""+numeroSeries})
    setIsLoadingSeries(false)
  }

  const onConfirmTiempoDescanso = (selections)=> {
    setForm({...form,["minutosDescanso"]:""+selections["minutos"],["segundosDescanso"]:""+selections["segundos"]})
    setVisiblePickerTiempo(false)
  }


  const onConfirmTiempoSerie = (selections,index)=> {
    let series= form.series
    series[index]={...series[index],["horas"]:""+selections["horas"],["minutos"]:""+selections["minutos"],["segundos"]:""+selections["segundos"]}
    setForm({...form,["series"]:series});
    
  }


  const afterEditingNumRepeticiones = (text,index) => {
   
    let series = form.series
    let serie= series[index]

   
      if( !/^\d\d?\d?$/.test(text)){
          series[index]={...serie,["numRepeticiones"]:'1'}
      }else{
          let numero= Number(text)
          numero >=1 ? series[index]={...serie,["numRepeticiones"]: '' + numero} :  series[index]={...serie,["numRepeticiones"]: '1'} 
          
      }
      setForm({...form,["series"]:series})
    
  
  
  }

 

  const afterEditingPeso = (text,index) =>{
    let series= form.series
   
    if( !/^(\d|\.\d)/.test(text)){
      series[index]= {...series[index],["peso"]:'0.00'}
  }else if(Number(text)>999){
      series[index]={...series[index],["peso"]:'999.00'}
  }else if(Number(text)<0){
      series[index]({...series[index],["peso"]:'0.00'})
  }else{
      series[index]={...series[index],["peso"]:'' + Number(text).toFixed(2)}
  }
    setForm({...form,["series"]:series})
  }
  
function editEjercicio(ejercicio){
  var form={
    titulo:ejercicio["titulo"],
    preparacion:ejercicio["preparacion"],
    ejecucion:ejercicio["ejecucion"],
    consejos:ejercicio["consejos"],
    id: ejercicio["id"]
}
navigation.navigate('EjercicioForm',{"form":form,"mode":"edit"})
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
                        
                        label="Descanso entre series (min:s)"
                        editable={false}
                        value={form["minutosDescanso"] + ":" + form["segundosDescanso"]}
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
                        onPress={()=>setVisiblePickerNumSeries(true)}
                        errorMessage={formErrorMessage(errors,"numSeries")}
                        label="Número de series"
                        editable={false}
                        value={form.numSeries}
                        iconContent={
                          <Icon
                        
                            onPress={()=>setVisiblePickerNumSeries(true)}
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
                    defaultSelections={{["minutos"]: form.minutosDescanso,["segundos"]:form.segundosDescanso}}
                    visible={visiblePickerTiempo}
                    options={[
                      {
                        key: 'minutos',
                        items: [
                          { label: '00', value: '00' },
                          { label: '01', value: '01' },
                          { label: '02', value: '02' },
                          { label: '03', value: '03' },
                          { label: '04', value: '04' },
                          { label: '05', value: '05' },
                          { label: '06', value: '06' },
                          { label: '07', value: '07' },
                          { label: '08', value: '08' },
                          { label: '09', value: '09' },
                          { label: '10', value: '10' },
                          { label: '11', value: '11' },
                          { label: '12', value: '12' },
                          { label: '13', value: '13' },
                          { label: '14', value: '14' },
                          { label: '15', value: '15' },
                          { label: '16', value: '16' },
                          { label: '17', value: '17' },
                          { label: '18', value: '18' },
                          { label: '19', value: '19' },
                          { label: '20', value: '20' }
                        ],
                      },
                      {
                        key: 'separador',
                        items: [
                          { label: ':', value: ':' },
                        ],
                      },{
                        key: 'segundos',
                        items: [
                          { label: '00', value: '00' },
                          { label: '01', value: '01' },
                          { label: '02', value: '02' },
                          { label: '03', value: '03' },
                          { label: '04', value: '04' },
                          { label: '05', value: '05' },
                          { label: '06', value: '06' },
                          { label: '07', value: '07' },
                          { label: '08', value: '08' },
                          { label: '09', value: '09' },
                          { label: '10', value: '10' },
                          { label: '11', value: '11' },
                          { label: '12', value: '12' },
                          { label: '13', value: '13' },
                          { label: '14', value: '14' },
                          { label: '15', value: '15' },
                          { label: '16', value: '16' },
                          { label: '17', value: '17' },
                          { label: '18', value: '18' },
                          { label: '19', value: '19' },
                          { label: '20', value: '20' }
                        ],
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
                        items: [
                          { label: '1', value: '1' },
                          { label: '2', value: '2' },
                          { label: '3', value: '3' },
                          { label: '4', value: '4' },
                          { label: '5', value: '5' },
                          { label: '6', value: '6' },
                          { label: '7', value: '7' },
                          { label: '8', value: '8' },
                          { label: '9', value: '9' },
                          { label: '10', value: '10' },
                          { label: '11', value: '11' },
                          { label: '12', value: '12' },
                          { label: '13', value: '13' },
                          { label: '14', value: '14' },
                          { label: '15', value: '15' },
                          { label: '16', value: '16' },
                          { label: '17', value: '17' },
                          { label: '18', value: '18' },
                          { label: '19', value: '19' },
                          { label: '20', value: '20' }
                        ],
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
                     {form.series.map((serie,index)=>(

                          <Block row center marginTop={10} width={width*0.9}>
                            <SerieCard serie={serie} numSerie={index+1} onConfirmTiempo={onConfirmTiempoSerie}
                                    
                                      afterEditingNumRepeticiones={afterEditingNumRepeticiones}
                                     
                                      afterEditingPeso={afterEditingPeso} />
                          </Block>

                      ))}
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
      }
})