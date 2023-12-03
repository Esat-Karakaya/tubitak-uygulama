import { Dimensions, StyleSheet, } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: 'white',
    width: Dimensions.get("window").width/2,
    aspectRatio:1,
    justifyContent: 'center',
    alignItems:"center",
    borderWidth:1,
    borderRadius:10,
  },
  emoji: {
    fontSize:110,
    userSelect:"none",
  },
}); 