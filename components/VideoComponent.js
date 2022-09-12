import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { argonTheme } from '../constants';
import { Block, Text} from "galio-framework";
import { Button } from '../components';


const { width, height } = Dimensions.get("screen");


export default function VideoComponent({uri,titulo,deleteFunction}){
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <Block  style={styles.container}> 
    <View style={styles.containerVideo}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: uri,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      
    </View>
    {titulo? 
    <Block width={ width*0.9} left style={{marginBottom:10, marginLeft:"4%"}}>
      <Text bold size={18}>{titulo}</Text> 
    </Block> 
    :null}
    {deleteFunction?
            <Block  marginBottom={15} width="100%" center>
            <Button  onPress={deleteFunction} color="error">
              <Text bold size={17} color={argonTheme.COLORS.WHITE}>
                Eliminar
              </Text>
            </Button>
          </Block> 
            : null}
    </Block>
  );
}

const styles = StyleSheet.create({
  container:{
    marginLeft:10,
    marginRight:10,
    marginTop:20,
    marginBottom:20,
    backgroundColor:"#FFFF",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
    borderRadius:8,
   
  },
  containerVideo: {
    marginTop:20,
    marginBottom:15,
    flex: 1,
    justifyContent: 'center',
   
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  video: {
    borderRadius:8,
    alignSelf: 'center',
    width: width*0.9,
    height: width*0.5,
    
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
