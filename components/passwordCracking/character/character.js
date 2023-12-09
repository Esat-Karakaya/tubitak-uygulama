import { View, Text, } from 'react-native';
import styles from "./styles";


export default function Character({ children, isTyped, reveal, }) {
  let revealCss={}
  if(reveal){
    revealCss={backgroundColor:"#90fca0"}
  }
  
  return (
    <View
     style={[styles.containerButton,
     isTyped?{marginTop:10,}:{paddingBottom:8,}]}>
      <Text style={[styles.innerText, revealCss]}>{children}</Text>
    </View>
  );
}