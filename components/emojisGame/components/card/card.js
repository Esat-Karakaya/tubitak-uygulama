import { Animated, Text, Dimensions, } from 'react-native';
import { useEffect, useRef } from "react";
import styles from "./styles"


export default function Card({ children, ANIM_DUR, setShowCount, EMOJI_NUM, showCount }) {
  const Anim = useRef(new Animated.Value(0)).current;
  const VW=Dimensions.get("window").width
  const CARD_W=styles.container.width;
  
  const slideLeft =Anim.interpolate({
    inputRange:[0, 1],
    outputRange:[VW, -CARD_W]
  })

  useEffect(()=>{
    if (showCount!=EMOJI_NUM) {
      Anim.setValue(0)
      Animated.timing(Anim, {
        toValue: 1,
        duration: ANIM_DUR ,
        useNativeDriver: true,
      }).start(()=>setShowCount((i)=> i<EMOJI_NUM ? i+1 : i));
    }
  },[ANIM_DUR, Anim, setShowCount])

  return (
    <Animated.View style={[styles.container, {transform:[{translateX:slideLeft}]}]}>
      <Text style={styles.emoji}>{children}</Text>
    </Animated.View>
  );
}