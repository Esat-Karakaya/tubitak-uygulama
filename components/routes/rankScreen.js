import { ScrollView, View, StyleSheet, Text, } from "react-native"
import { ref, onValue, query, orderByChild } from "firebase/database";
import { useEffect, useState } from "react";
import GetNameModal from "../simpleComponents/getNameModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY_LS, rankDB } from "../../globals";

export default function TipsScreen(){
  const [ userState, setUserState ] = useState([])
  const [ modalVis, setModalVis ] = useState(false)
  const [ userKey, setUserKey ] = useState("")

  useEffect(()=>{ // Get users from firebase & get our user's db key from storage
    const usersFBRef=query(ref(rankDB, 'rank'), orderByChild("points"))    
    onValue(usersFBRef, (snapshot) => {
      const newUsers=[]
      snapshot.forEach((childSnap)=>{
        const { name, points } = childSnap.val()
        const { key } = childSnap

        newUsers.push({name, points, key})
      });
      setUserState(newUsers.reverse());
    });

    AsyncStorage.getItem(USER_KEY_LS)
    .then(val => {
      if(typeof(val)==="string"){
        setUserKey(val)
        return
      }
      setModalVis(true)
    })
  },[])

  return(
    <ScrollView>
      <View style={styles.userContainer}>
        {userState.map((e, i) => (
          <View key={e.key} style={styles.user}>
            <Text style={{fontSize:20, fontWeight:"800"}} children={i+1+"."}/>
            <Text style={{fontSize:20,}} children={`${e.name} ${e.key===userKey ? "(siz 😎)" : ""}`}/>
            <Text style={{fontSize:20, flex:1, textAlign:"right"}} children={`${e.points} 🪙`}/>
          </View>
        ))}
      </View>
      <GetNameModal db={rankDB} visible={modalVis}/>
    </ScrollView>
  )
}
//CSS
const styles = StyleSheet.create({
  userContainer:{
    flex:1,
    rowGap:10,
    margin:10,
  },
  user:{
    padding:10,
    backgroundColor:"white",
    borderRadius:15,
    borderWidth:4,
    flexDirection:"row",
    columnGap:40,
  },
});