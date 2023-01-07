import React, {useEffect,useRef,useState} from 'react';
import { StyleSheet,Dimensions,TextInput, TouchableWithoutFeedback } from 'react-native';
import { argonTheme } from '../constants';
import SegmentedPicker from 'react-native-segmented-picker';
import { Block, Text} from "galio-framework";
import FloatingLabelInput from './FloatingLabelInput';
const { width, height } = Dimensions.get("screen");
import formErrorMessage from '../components/FormErrorMessage';
import {generateNumberSelectors } from '../util/UtilFunctions';

export default function SerieCard ({navigation,numSerie=1,tipo,serie,errores,onConfirmTiempo,afterEditingNumRepeticiones,afterEditingPeso}) {
    
    const [visiblePickerTiempo,setVisiblePickerTiempo] = useState(false);
    const segmentedPickerTiempo= useRef(null)
    const onConfirmTiempo2 = (selections)=> {
        onConfirmTiempo(selections,numSerie-1)
        setVisiblePickerTiempo(false)
      }
    const[errors, setErrors]= useState({})

    const [form,setForm] = useState({
        id: "",
        numOrden:"0",
        numRepeticiones:"",
        peso:"",
        tiempo:"00:00:00"
    })

    var [horas,minutos,segundos] =  serie.tiempo.split(":")
    useEffect(()=>{
      if (serie["id"]){
        serie["id"] = "" + serie["id"]
      } 
      serie["numOrden"] = "" + serie["numOrden"]
      serie["numRepeticiones"] = serie["numRepeticiones"]!==null ? "" + serie["numRepeticiones"] : ""
      serie["peso"] = serie["peso"]!== null? "" + serie["peso"] : ""
      
      setForm(serie)
      
    },[serie])

    useEffect(()=>{
      errores ? setErrors(errores) : null
    },[errores])
    
  const onChangeNumRepeticiones = (text) => {

    setForm({...form,["numRepeticiones"]:text.replace(/\s|,|\./,"")})

  }

  const onChangePeso = (text) =>{
 
    setForm({...form,["peso"]:text.replace(",",".").replace(" ","").replace(/\..*\./,"")})
  }

  

    return (
        <Block  minHeight={110} flex  row style={styles.card}>

            <Block marginLeft={"6%"} center style={styles.numSerieCircle}>
                <Block flex row center>
                    <Text   size={22} color='#FFFF'>{numSerie}</Text>
                </Block>
            </Block>

           
            {tipo == "REPETICIONES" ? 
            <>
            <Block  center flex height={50} marginLeft={"6%"}>
                <Block flex row center>
                <FloatingLabelInput maxLength={3} keyboardType="numeric" centerText value={form.numRepeticiones}
                    onChangeText={text=> onChangeNumRepeticiones(text)}
                    afterEditing={(text)=>afterEditingNumRepeticiones(text,numSerie-1)}
                    errorMessage={formErrorMessage(errors,"numRepeticiones")!=null? "":null}
                    />
                </Block>
            </Block>
            <Block  center flex  height={50} marginLeft={"6%"} marginRight={"6%"}>
                <Block flex row center>
                <FloatingLabelInput maxLength={6} keyboardType="numeric" centerText  value={form.peso}
                    onChangeText={text=> onChangePeso(text)}
                    afterEditing={(text)=>afterEditingPeso(text,numSerie-1)}
                    errorMessage={formErrorMessage(errors,"peso")!=null? "":null}
                    />
                    
                </Block>
            </Block>

            </>
            :
            <>
                <Block  center flex  height={50} marginLeft={"6%"} marginRight={"6%"}>
                    <Block flex row center>
                        <FloatingLabelInput onPress={()=> setVisiblePickerTiempo(true)} centerText value={serie.tiempo} editable={false}
                            />
                    </Block>
              </Block>
            
            <SegmentedPicker
                    ref={segmentedPickerTiempo}
                    onConfirm={onConfirmTiempo2}
                    onCancel={()=> setVisiblePickerTiempo(false)}
                    confirmText="Aceptar"
                    defaultSelections={{["horas"]: horas,["minutos"]: minutos,["segundos"]:segundos}}
                    visible={visiblePickerTiempo}
                    options={[
                        {
                            key: 'horas',
                            items: generateNumberSelectors(0,4,true),
                        },
                        {
                            key: 'separador',
                            items: [
                              { label: ':', value: ':' },
                            ],
                          },
                      {
                        key: 'minutos',
                        items: generateNumberSelectors(0,59,true)
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
            </>
            }
            

           
               
              
        </Block>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth:1,
        borderRadius: 8,
        borderColor: argonTheme.COLORS.BORDER,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
    },
    numSerieCircle:{
        zIndex:1,
        borderRadius: 100,
        width: width*0.1,
        height: width*0.1,
        backgroundColor: argonTheme.COLORS.PRIMARY,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
    }

})

