import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useState } from "react"

const PAD=3
const BOTTOM_PAD=4
const RADIUS=5

export default function CustomButton({ children, onPress=()=>{}, textStyles={}, style }) {
  const [isPressed, setPressed]=useState(false)

  return (
    <Pressable
     onPress={onPress}
     onPressIn={()=>{setPressed(true)}}
     onPressOut={()=>{setPressed(false)}}
     style={[styles.containerButton,
     isPressed ? {marginTop:BOTTOM_PAD,} : {paddingBottom:PAD+BOTTOM_PAD,},
     style]}>
      <View style={{borderRadius:RADIUS-PAD, overflow:"hidden"}}>
        <Text style={[styles.innerText, textStyles]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  containerButton:{
    justifyContent:"center",
    alignItems:"center",
    borderRadius:RADIUS,
    backgroundColor:"black",
    padding:PAD,
  },
  innerText:{
    userSelect:"none",
    fontSize:60,
    width:"100%",
    //Shadow
    backgroundColor:"white",
    textAlign:"center",
  }
});