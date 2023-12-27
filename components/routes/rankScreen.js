import { ScrollView, View, StyleSheet, Text, Modal } from "react-native"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import GetNameModal from "../simpleComponents/getNameModal";

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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function TipsScreen(){
  const [ userState, setUserState ]=useState([])

  useEffect(()=>{
    const usersFBRef=ref(db, 'rank')
    
    onValue(usersFBRef, (snapshot) => {
      const newUsers=[]
      snapshot.forEach((childSnap)=>{
        newUsers.push({name:childSnap.key, point: childSnap.val()})
      });
      setUserState(newUsers);
    });
  },[])

  return(
    <ScrollView>
      <View style={styles.userContainer}>
        {userState.map((e, i) => (
          <View key={e.name} style={styles.user}>
            <Text style={{fontSize:20, fontWeight:"800"}} children={i+1+"."}/>
            <Text style={{fontSize:20,}} children={`${e.name}`}/>
            <Text style={{fontSize:20, flex:1, textAlign:"right"}} children={`${e.point} 🪙`}/>
          </View>
        ))}
      </View>
      <GetNameModal/>
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