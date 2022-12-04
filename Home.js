import React from 'react';
import { StyleSheet, SafeAreaView,Dimensions, ScrollView,StatusBar } from 'react-native';
import { Block, theme } from 'galio-framework';

import Card from './components/Card';
import articles from './constants/articles';
const { width } = Dimensions.get('screen');

export default function Home({navigation}) {
  
    return (
      <SafeAreaView style={styles.container}>
      <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[0]} horizontal  />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </ScrollView>
      </Block>
      </SafeAreaView>
    )
  


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});
