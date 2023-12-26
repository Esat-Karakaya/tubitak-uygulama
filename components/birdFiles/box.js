import { Animated, Text, Dimensions } from 'react-native';
import { useRef, useEffect } from "react";

const Box = ({ body, type, isDropped, }) => {
  const { left } = body;
  const { bottom } = body;
  const width = body.size;
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(()=>{

    function scaleAnimate(scale, callback=()=>{}) {
      Animated.timing(scaleAnim, {
        toValue: scale,
        duration: 250,
        useNativeDriver: true,
      }).start(callback)
    }
    if(isDropped){
      scaleAnimate(0, ()=>{
        body.fallUpdate=type
      })
    }
    else if(body.isPressed){ scaleAnimate(1.5) }
    else if(!body.isPressed && !isDropped){ scaleAnimate(1) }
  }, [isDropped, scaleAnim, body.isPressed])
  return (
    <Animated.View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width,
        aspectRatio: 1,
        left,
        bottom,
        borderWidth: 3,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius:15,
        transform:[{scale:scaleAnim}],
      }}>
      <Text
        style={{
          fontSize: width * 0.6,
        }}>
        {type}
      </Text>
    </Animated.View>
  );
};

export default (type, arr) => {
  const size = 70;
  const left = (Dimensions.get('window').width * arr[0]) / (arr[1] + 1) - size / 2;
  const bottom = 10;

  return {
    body: { bottom, left, size, isPressed: false, fallUpdate:false },
    initials: { bottom, left, size, isPressed: false, fallUpdate:false },
    type,
    isDropped:false,
    renderer: <Box />,
  };
};
