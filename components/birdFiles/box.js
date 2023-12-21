import { Animated, Text, Dimensions } from 'react-native';
import { useRef, useEffect } from "react";

const Box = ({ body, type, isDropped, initials }) => {
  const { left } = body;
  const { top } = body;
  const width = body.size;
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(()=>{

    function scaleAnimate(scale) {
      Animated.timing(scaleAnim, {
        toValue: scale,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
    if(isDropped){ scaleAnimate(0) }
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
        top,
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
  const left =
    (Dimensions.get('window').width * arr[0]) / (arr[1] + 1) - size / 2;
  const top = Dimensions.get('window').height - size - 20;

  return {
    body: { top, left, size, isPressed: false },
    initials: { top, left, size },
    type,
    isDropped:false,
    renderer: <Box />,
  };
};
