
import { View, Text } from 'react-native'
import React from 'react'
import Carousel from './src/components/Carousel'
import Highlight from './src/components/Highlight'
import BottomTab from './src/components/BottomTab'
import Header from './src/components/Header'


const App = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Header/>
      <Highlight/>
    <Carousel/>
    <BottomTab/>
  
 
    </View>
  )
}

export default App