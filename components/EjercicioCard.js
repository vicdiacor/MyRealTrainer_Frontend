import React from 'react';

import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';
const { width, height } = Dimensions.get("screen");

export default function EjercicioCard({navigation,ejercicio, style, imageStyle }) {

    
    const imageStyles = [
      styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block  card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block  style={imgContainer}>
            <Image source={{uri: "https://blogscdn.thehut.net/app/uploads/sites/450/2021/05/shutterstock_541669732opt_hero_1621859509_1622118621.jpg"}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block center flex space="between" style={styles.cardDescription}>
            <Text  size={14} style={styles.cardTitle}>{ejercicio["titulo"]}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    
    borderWidth: 0,
    width: width*0.45,
    minHeight: 100,
    marginBottom: 16,
    borderRadius:10,

  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    
    borderRadius: 10,
    elevation: 1,
    overflow: 'hidden',
   
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});