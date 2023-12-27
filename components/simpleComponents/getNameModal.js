import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Modal, Button } from 'react-native';

export default function GetNameModal({ visible }) {
    const [ modalVis, setModalVis ] = useState(false)
    useEffect(()=> setModalVis(visible) , [visible])
    return(
        <Modal animationType='slide' transparent={true} onRequestClose={()=>{setModalVis(false)}} visible={modalVis}>
            <View style={styles.background}>
                <View style={styles.modal}>
                    <Text style={{fontSize:35, textAlign:"center"}}>{"Yarışmak İçin Kullanıcı Adı Giriniz"}</Text>
                    <View style={{flexDirection:"row", columnGap:10}}>
                        <Button title='Kaydet'/>
                    </View>
                </View>
            </View>
        </Modal>
  )
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
  }
});