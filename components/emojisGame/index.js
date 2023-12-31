import { Text, StyleSheet, View } from 'react-native';
import { useState, useEffect, } from "react";
import Game from "./emojisGame";

export default function EmojisGame(){
  const [count, setCount]=useState(3)

  useEffect(()=>{
    setTimeout(()=>
      setCount(prev => prev>0 ? prev-1 : prev)
    ,1000)
  }, [count])

  if (count>0) {
    return(
      <View style={styles.container}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    )
  }
  return(<Game/>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems:"center",
  },
  countText:{
    fontSize:100,
    fontWeight:"bold",
  }
});