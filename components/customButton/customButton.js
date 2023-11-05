import { Pressable, Text, View } from 'react-native';
import { useState } from "react"
import styles from "./styles";

export default function OptionButton({ children, onPress=()=>{}, textStyles={}, style }) {
  const [isPressed, setPressed]=useState(false)

  return (
    <Pressable
     onPress={onPress}
     onPressIn={()=>{setPressed(true)}}
     onPressOut={()=>{setPressed(false)}}
     style={[styles.containerButton,
     isPressed ? {marginTop:4,} : {paddingBottom:5,},
     style]}>
      <View style={{borderRadius:3, overflow:"hidden"}}>
        <Text style={[styles.innerText, textStyles]}>{children}</Text>
      </View>
    </Pressable>
  );
}