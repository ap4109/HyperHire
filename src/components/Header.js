import { View, Text, Image } from 'react-native'
import React from 'react'
import { getScreenHeight, getScreenWidth } from '../utils/responsive'

const Header = () => {
    return (
        <View style={{ height: getScreenHeight(10), width: getScreenWidth(100), backgroundColor: "white", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: "#000" }}>Closer</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderWidth: 1, height: getScreenHeight(3.5), width: getScreenWidth(15), borderRadius: 20, flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                    <Image
                        source={require("../assets/images/light.png")}
                        style={{ height: 20, width: 20 }}
                    />
                    <Text>Earn</Text>
                </View>
                <Image
                    source={require("../assets/images/options.png")}
                    style={{ height: 20, width: 20 }}
                />

            </View>
        </View>
    )
}

export default Header