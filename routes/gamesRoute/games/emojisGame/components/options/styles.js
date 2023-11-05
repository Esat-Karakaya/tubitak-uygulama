import { Dimensions, StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    alignItems:"center",
    position: "absolute",
    backgroundColor: 'white',
    width:Dimensions.get("window").width*9/10,
    borderWidth:1,
    borderRadius:10,
    padding:5,
    rowGap:10,
  },
  innerContainer:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
  },
}); 