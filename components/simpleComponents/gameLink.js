import { View, Text, StyleSheet } from 'react-native';
import CustomButton from "./customButton"

export default function GameLink({ GameIcon, GameTitle, onPress }) {
  return (
    <View style={styles.linkContainer}>
      <CustomButton onPress={onPress}>{GameIcon}</CustomButton>
      <Text style={{fontSize:20}}>{GameTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linkContainer:{
    width:"45%",
    minWidth:350,
    flexDirection:"row",
    alignItems:"center",
    columnGap:10,
    backgroundColor:"white",
    borderWidth:4,
    borderRadius:15,
    padding:15
  }
});