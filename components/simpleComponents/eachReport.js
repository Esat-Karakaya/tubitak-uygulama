import { Text, StyleSheet, View } from "react-native"

export default function EachReport({prop, value}){
  return(
    <View style={styles.eachReport}>
        <Text style={styles.prop}>
            {prop}
        </Text>
        <Text style={styles.value}>
            {value}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  prop: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  eachReport:{
    backgroundColor:"white",
    borderWidth:1,
    borderRadius:15,
    alignItems:"center",
  },
  value:{
    fontSize:50,
  }
});