
import { Block } from 'galio-framework';
import React from 'react'
import { View,Dimensions } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
const { width, height } = Dimensions.get("screen");
export default function CarouselCards ({data,RenderItem}) {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <Block flex>
     
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={RenderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
       <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(23,43,64, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
      
    </Block>
  )



}

