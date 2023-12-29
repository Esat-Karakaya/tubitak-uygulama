import { ScrollView, View, StyleSheet, Text, } from "react-native"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, query, orderByChild } from "firebase/database";
import { useEffect, useState } from "react";
import GetNameModal from "../simpleComponents/getNameModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY_LS } from "../../globals";

// My Firebase web app's configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQYzl3NqdgZn6hsg_09r2CPUse8V3N16Q",
  authDomain: "tubitak-db.firebaseapp.com",
  projectId: "tubitak-db",
  storageBucket: "tubitak-db.appspot.com",
  messagingSenderId: "647506049124",
  appId: "1:647506049124:web:49a6e757689873b44c8771",
  databaseUrl: "https://tubitak-db-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();

export default function TipsScreen(){
  const [ userState, setUserState ] = useState([])
  const [ modalVis, setModalVis ] = useState(false)
  const [ userKey, setUserKey ] = useState("")

  useEffect(()=>{
    const usersFBRef=query(ref(db, 'rank'), orderByChild("points"))    
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
      <GetNameModal db={db} visible={modalVis}/>
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