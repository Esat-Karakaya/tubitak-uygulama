import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useState } from "react"

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

const styles = StyleSheet.create({
  containerButton:{
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
    backgroundColor:"black",
    padding:1,
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