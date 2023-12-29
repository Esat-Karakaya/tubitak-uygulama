import { push, ref, set } from "firebase/database";
import { useAtom } from "jotai";
import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Modal, Button, TextInput, Alert } from 'react-native';
import { USER_KEY_LS, pointsAtom } from "../../globals";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GetNameModal({ visible, db }) {
  const [ modalVis, setModalVis ] = useState(false)
  const [ inputVal, setInputVal ] = useState('')
  const [ points ] = useAtom(pointsAtom)
  useEffect(()=> setModalVis(Boolean(visible)) , [visible])

  function onSubmit() {
    appendUserToDb(inputVal, points, db)
    setModalVis(false)
  }

  return(
    <Modal animationType='slide' transparent={true} onRequestClose={()=>{setModalVis(false)}} visible={modalVis}>
      <View style={styles.background}>
        <View style={styles.modal}>
          <Text style={{fontSize:35, textAlign:"center"}}>{"Yarışmak İçin Kullanıcı Adı Giriniz"}</Text>
          <TextInput onChangeText={setInputVal} style={styles.input}/>
          <View style={{flexDirection:"row", columnGap:10}}>
            <Button onPress={onSubmit} title='Kaydet'/>
            <Button onPress={()=>setModalVis(false)} title='Kapat'/>
          </View>
        </View>
      </View>
    </Modal>
  )
}

// Helpers

function appendUserToDb(name, points, db) {
  try {
    const rankRef = ref(db, "rank")
    const newUserRef = push(rankRef)
    set(newUserRef, {
      name,
      points
    })
    AsyncStorage.setItem(USER_KEY_LS, newUserRef.key)
  } catch {
    Alert.alert("Bir Hata Oluştu", "Sunucumuza bağlanamadık 😕")
  }
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  modal:{
    width:"90%",
    aspectRatio:1,
    backgroundColor:"#fff",
    alignItems:"center",
    padding:10,
    rowGap:30,
    justifyContent:"center",
    borderRadius:20,
    borderWidth:3,
  },
  input: {
    paddingHorizontal:10,
    paddingVertical:5,
    width: "50%",
    borderWidth: 1,
    borderRadius: 10,
  }
});