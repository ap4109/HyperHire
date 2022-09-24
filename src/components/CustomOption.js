import { View, Text } from 'react-native'
import React from 'react'
import { getScreenHeight,getScreenWidth } from '../utils/responsive'

const CustomOption = () => {
  return (
    <View style={{ height: getScreenHeight(5), width: getScreenWidth(94), backgroundColor: "white", borderRadius: 15, elevation: 5 }}>

      <Text>CustomOption</Text>
    </View>
  )
}

export default CustomOption