import { StyleSheet, View, Text, Modal, Button } from 'react-native';

export default function CustomModal({title, body, visible, onClose, onContinue}) {
  return(
    <Modal animationType='slide' transparent={true} onRequestClose={onClose} visible={visible}>
      <View style={styles.background}>
        <View style={styles.modal}>
          <Text style={{fontSize:35, textAlign:"center"}}>{title}</Text>
          <Text style={{fontSize:20, textAlign:"center"}}>{body}</Text>
      	  <View style={{flexDirection:"row", columnGap:10}}>
            {onContinue ? <Button onPress={onContinue} title='Devam Et'/> : null}
            <Button onPress={onClose} title='Kapat'/>
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