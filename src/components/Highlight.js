import { View, Text, Image } from 'react-native'
import React from 'react'
import { getScreenHeight, getScreenWidth } from '../utils/responsive'
import { FlatList } from 'react-native-gesture-handler'

const data = [
    {
        id: 1

    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    },
    {
        id: 6
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    },
    {
        id: 6
    },

]
const renderItems = (i) => {
    return (
        <View style={{ height: 60, width: 60, borderRadius: 35, borderStyle: 'dashed', borderWidth: 1, flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', margin: 5, borderColor: "#8A49EB" }}>



            <Image
                style={{ height: 20, width: 20, position: 'absolute', bottom: 0, right: 0 }}

                source={require('../assets/images/plus.png')} />

        </View>
    )

}



const Highlight = () => {
    return (
        <View style={{ height: getScreenHeight(10), width: getScreenWidth(94), backgroundColor: "white", borderRadius: 15, elevation: 5 }}>

            <FlatList
                data={data}
                renderItem={i => renderItems(i)}
                horizontal
                ListHeaderComponent={<View style={{ justifyContent: 'center', flex: 1, width: 90, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{color:'black',fontWeight:'bold',fontSize:17}}>Fixed meeting</Text><Text>without any restrictions</Text></View>}
                showsHorizontalScrollIndicator={false}


            />

        </View>
    )
}

export default Highlight