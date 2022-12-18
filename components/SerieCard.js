import React, {useEffect,useRef,useState} from 'react';
import { StyleSheet,Dimensions,TextInput, TouchableWithoutFeedback } from 'react-native';
import { argonTheme } from '../constants';
import SegmentedPicker from 'react-native-segmented-picker';
import { Block, Text} from "galio-framework";
import FloatingLabelInput from './FloatingLabelInput';
const { width, height } = Dimensions.get("screen");


export default function SerieCard ({navigation,numSerie=1,serie,onConfirmTiempo,onChangeNumRepeticiones,afterEditingNumRepeticiones,
    onChangePeso,afterEditingPeso}) {
    
    const [visiblePickerTiempo,setVisiblePickerTiempo] = useState(false);
    const segmentedPickerTiempo= useRef(null)
    const onConfirmTiempo2 = (selections)=> {
        onConfirmTiempo(selections,numSerie-1)
        setVisiblePickerTiempo(false)
      }
    return (
        <Block  minHeight={110} flex  row style={styles.card}>

            <Block marginLeft={15} center style={styles.numSerieCircle}>
                <Block flex row center>
                    <Text   size={24} color='#FFFF'>{numSerie}</Text>
                </Block>
            </Block>

            <Block  center width={"20%"} height={50} marginLeft={12}>
                <Block flex row center>
                <FloatingLabelInput maxLength={3} keyboardType="numeric" centerText value={serie.numRepeticiones}
                    onChangeText={text=> onChangeNumRepeticiones(text,numSerie-1)}
                    afterEditing={()=>afterEditingNumRepeticiones(numSerie-1)}/>
                </Block>
            </Block>

            <Block  center width={"20%"} height={50} marginLeft={10}>
                <Block flex row center>
                <FloatingLabelInput maxLength={6} keyboardType="numeric" centerText  value={serie.peso}
                    onChangeText={text=> onChangePeso(text,numSerie-1)}
                    afterEditing={()=>afterEditingPeso(numSerie-1)}
                    />
                    
                </Block>
            </Block>

           
               
                <Block  center width={"30%"} height={50} marginLeft={10}>
                    <Block flex row center>
                        <FloatingLabelInput onPress={()=> setVisiblePickerTiempo(true)} centerText value={serie.horas + ":" + serie.minutos + ":" + serie.segundos} editable={false}
                            />
                    </Block>
                </Block>
            
            <SegmentedPicker
                    ref={segmentedPickerTiempo}
                    onConfirm={onConfirmTiempo2}
                    onCancel={()=> setVisiblePickerTiempo(false)}
                    confirmText="Aceptar"
                    defaultSelections={{["horas"]: serie.horas,["minutos"]: serie.minutos,["segundos"]:serie.segundos}}
                    visible={visiblePickerTiempo}
                    options={[
                        {
                            key: 'horas',
                            items: [
                              { label: '00', value: '00' },
                              { label: '01', value: '01' },
                              { label: '02', value: '02' },
                              { label: '03', value: '03' },
                              { label: '04', value: '04' },
                              { label: '05', value: '05' },
                            ],
                        },
                        {
                            key: 'separador',
                            items: [
                              { label: ':', value: ':' },
                            ],
                          },
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
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth:1,
        borderRadius: 4,
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
        width: width*0.11,
        height: width*0.11,
        backgroundColor: argonTheme.COLORS.PRIMARY,
         shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 2,
    }

})

