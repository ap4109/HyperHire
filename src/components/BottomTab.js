import { View, Text,Image } from 'react-native'
import React from 'react'
import { getScreenHeight, getScreenWidth } from '../utils/responsive'
const BottomTab = () => {
    const Users = [
        { id: "1", uri: require('../assets/images/search.png') },
        { id: "2", uri: require('../assets/images/noti.png') },
        { id: "3", uri: require('../assets/images/add-button.png') },
        { id: "4", uri: require('../assets/images/chat.png') },
        { id: "5", uri: require('../assets/images/person.png') },
      ]
  return (
    <View style={{ height: getScreenHeight(10), width: getScreenWidth(100), backgroundColor: "white", flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
    {Users.map((i,v)=>{
        return(
            <View>
                <Image source={i.uri} style={{height:30,width:30}} resizeMode='center'/>
            </View>
        )
    })}
     
    </View>
  )
}

export default BottomTab