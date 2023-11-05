import { Text, StyleSheet } from "react-native"

export default function TipsScreen(){
  return(
    <Text style={styles.paragraph}>
      {"Sandalyeniz Bağlı 🥳"}
    </Text>
  )
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});