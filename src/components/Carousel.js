

import React from 'react';
import { Text, View, Dimensions, Image, Animated, PanResponder, ToastAndroid } from 'react-native';
import { getScreenWidth, getScreenHeight } from '../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const Users = [
  { id: "1", uri: require('../assets/images/1.png') },
  { id: "2", uri: require('../assets/images/2.png') },
  { id: "3", uri: require('../assets/images/3.png') },

]

export default class Carousel extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }
  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: false
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
          {  ToastAndroid.showWithGravity(
            "KEEP",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )}
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: false
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
          {  ToastAndroid.showWithGravity(
            "PASS",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )}
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false

          }).start()
        }
      }
    })
  }

  renderUsers = () => {

    return Users.map((item, i) => {


      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {


        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: getScreenHeight(50), width: getScreenWidth(99), padding: 10, }]}>
            <Animated.View style={{ opacity: this.likeOpacity, position: 'absolute', zIndex: 1000 }}>

              <View
                style={{ flex: 1, height: getScreenHeight(47.6), width: getScreenWidth(94), borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.9)', padding: 10, position: 'absolute', margin: 10, justifyContent: 'center', alignItems: 'center' }}
              >
                <Image
                  style={{ height: 100, width: 100 }}
                  source={require('../assets/images/pass.png')} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>KEEP</Text>
              </View>
            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, position: 'absolute', zIndex: 1000 }}>

              <View
                style={{ flex: 1, height: getScreenHeight(47.6), width: getScreenWidth(94), borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.8)', padding: 10, margin: 10, justifyContent: 'center', alignItems: 'center' }}
              >
                <Image
                  style={{ height: 100, width: 100 }}
                  source={require('../assets/images/cross.png')} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>PASS</Text>
              </View>

            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />
            <View style={{ position: 'absolute', height: getScreenHeight(47.5), width: getScreenWidth(94), padding: 10, alignSelf: 'center', margin: 10, borderRadius: 20, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center',}}>
                <Image
                  style={{ height: 50, width: 50, resizeMode: 'cover', borderRadius: 25, borderWidth: 3, borderColor: '#FFBFBF', marginHorizontal: 7 }}
                  source={item.uri} />
                <View style={{ width: 90, }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>John Pride</Text><Text style={{ color: 'white' }}>24 Gangseo-gu, Seoul</Text>
                </View>
              </View>
              <View style={{padding:10}}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Playing After Work</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ borderWidth: 1, height: getScreenHeight(3.5), width: getScreenWidth(15), borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 5, borderColor: "#ffff" }}>

                    <Text style={{ color: "white", }}>Tennis</Text>
                  </View>
                  <View style={{ borderWidth: 1, height: getScreenHeight(3.5), width: getScreenWidth(8), borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 5, borderColor: "#ffff" }}>

                    <Text style={{ color: "white", }}>NBA</Text>
                  </View>

                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ height: 15, width: 15, resizeMode: 'cover', borderRadius: 25, marginHorizontal: 10 }}


                    source={require("../assets/images/pass.png")} />
                  <Text style={{ color: "white", }} >29, Bongeunsa-ro 4-gil,{'\n'} Gangnam-gu, Seou</Text>


                </View>

              </View>


            </View>

          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: getScreenHeight(50), width: getScreenWidth(99), padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: this.likeOpacity, position: 'absolute', zIndex: 1000 }} />



            <Animated.View style={{ opacity: this.dislikeOpacity, position: 'absolute', zIndex: 1000 }} />




            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />
            <View style={{ position: 'absolute', height: getScreenHeight(47.5), width: getScreenWidth(94), padding: 10, alignSelf: 'center', margin: 10, borderRadius: 20, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ height: 50, width: 50, resizeMode: 'cover', borderRadius: 25, borderWidth: 3, borderColor: '#FFBFBF', marginHorizontal: 10 }}
                  source={item.uri} />
                <View style={{ width: 90, }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>John Pride</Text><Text style={{ color: 'white' }}>24 Gangseo-gu, Seoul</Text>
                </View>
              </View>
              <View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Playing After Work</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ borderWidth: 1, height: getScreenHeight(3.5), width: getScreenWidth(15), borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 5, borderColor: "#ffff" }}>

                    <Text style={{ color: "white", }}>Tennis</Text>
                  </View>
                  <View style={{ borderWidth: 1, height: getScreenHeight(3.5), width: getScreenWidth(8), borderRadius: 15, justifyContent: 'center', alignItems: 'center', margin: 5, borderColor: "#ffff" }}>

                    <Text style={{ color: "white", }}>NBA</Text>
                  </View>

                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ height: 15, width: 15, resizeMode: 'cover', borderRadius: 25, marginHorizontal: 10 }}


                    source={require("../assets/images/pass.png")} />
                  <Text style={{ color: "white", }} >29, Bongeunsa-ro 4-gil,{'\n'} Gangnam-gu, Seou</Text>


                </View>

              </View>


            </View>
          


          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        {this.renderUsers()}
        <LinearGradient colors={['#61D9FF', '#4266D8', '#A32FFF']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={{ height: getScreenHeight(7), width: getScreenWidth(94), backgroundColor: "white", justifyContent: 'space-around', borderRadius: 15, elevation: 2, flexDirection: 'row', }} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../assets/images/close.png')} style={{ height: 50, width: 50 }} />
            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 20 }}>PASS</Text>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../assets/images/pass.png')} style={{ height: 30, width: 30, marginRight: 8 }} />
            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 20 }}>KEEP</Text>

          </View>
        </LinearGradient>




      </View>

    );
  }
}