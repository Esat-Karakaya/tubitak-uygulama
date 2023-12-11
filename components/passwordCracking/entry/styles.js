import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    alignItems:"center",
    backgroundColor: 'white',
    borderWidth:3,
    borderRadius:10,
    padding:3,
    rowGap:10,
    minWidth:"80%"
  },
  innerContainer:{
    flexDirection:"row",
    justifyContent:"center",
  },
  inputHider:{
    backgroundColor:"white",
    width:"15%", height:"10%",
    position:"absolute",
    left:0,
    top:"45%",
    zIndex:20,}
}); 