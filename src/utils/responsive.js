import { Dimensions, PixelRatio } from 'react-native';

const getScreenWidth = dp=> {
  
  const screenWidth = Dimensions.get('window').width;
  const elemWidth =
    typeof dp === 'number' ? dp : parseFloat(dp);
console.log(PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100),"kkkkkk");
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const getScreenHeight = dp => {
  
  const screenHeight = Dimensions.get('window').height;
  const elemHeight =
    typeof dp=== 'number'
      ? dp
      : parseFloat(dp);
      const t = PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
      console.log(t);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  
};

export { getScreenWidth, getScreenHeight };
