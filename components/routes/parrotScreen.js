import { StyleSheet, View, Image, Dimensions } from "react-native";
import OptionButton from "../simpleComponents/customButton"
import Img from "../../assets/parrot.png"
import { useState } from "react";

export default ParrotScreen=()=>{
  const [selecteds, setSelecteds]=useState([])
  return (
    <View style={styles.pageContainer}>
      <Image style={styles.parrot} source={Img}/>
      <View style={styles.buttonContain}>
        <OptionButton
          onPress={()=>setSelecteds(arr=>["🫐", ...arr])}
          style={
            selecteds.includes("🫐")?
            {display:"none"}:
            {}
          }
          children={"🫐"}/>
        <OptionButton
          onPress={()=>setSelecteds(arr=>["💧", ...arr])}
          style={
            selecteds.includes("💧")?
            {display:"none"}:
            {}
          }
          children={"💧"}/>
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  parrot:{
    marginTop:40,
    width:Dimensions.get("window").width*3/4,
    height:Dimensions.get("window").width*3/4,
    borderRadius:20,
  },
  pageContainer:{
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",

  },
  buttonContain:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-around",
    backgroundColor:"aqua",
    padding:10,
    borderTopWidth:3,
  }
})