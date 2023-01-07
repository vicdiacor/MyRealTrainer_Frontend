import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';
const { width, height } = Dimensions.get("screen");

export default function SimpleImageCard({navigation,element, onPress,title,style,imageOnLeft, textSize}) {

    
    const imageStyles = [
      imageOnLeft? styles.horizontalImageOnLeft : styles.horizontalImage,
     
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [imageOnLeft? styles.imageContainerOnLeft :styles.imageContainer,
      imageOnLeft? styles.verticalStylesImageOnLeft :styles.verticalStyles,
      styles.shadow
    ];


    return (
      <TouchableWithoutFeedback  onPress={onPress? onPress : null}>
        <Block  row={imageOnLeft} card flex style={cardContainer}>
            <Block  style={imgContainer}>
              <Image source={{uri: "https://blogscdn.thehut.net/app/uploads/sites/450/2021/05/shutterstock_541669732opt_hero_1621859509_1622118621.jpg"}} style={imageStyles} />
            </Block>
          <TouchableWithoutFeedback onPress={onPress ? onPress : null}>
            <Block center flex space="between" style={styles.cardDescription}>
              <Text  size={textSize? textSize:14} style={styles.cardTitle}>{title}</Text>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      </TouchableWithoutFeedback >
    );
  }

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0,
    minHeight: 100,
    borderRadius:10,
    

  },
  cardTitle: {
    
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    
   
  },
  imageContainer: {
    
    borderRadius: 10,
    elevation: 1,
    overflow: 'hidden',
   
  },
  imageContainerOnLeft: {
    borderRadius: 10,
    elevation: 1,
    overflow: 'hidden',
    minHeight:100,
    minWidth:width*0.3,
   
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalImageOnLeft:{
      minHeight:100,
      minWidth:width*0.3,
      width: 'auto',
      resizeMode:'cover',
     
     
    
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  verticalStylesImageOnLeft:{
    
    
    borderBottomRightRadius:0,
    borderTopRightRadius:0,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  shadow: {
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});