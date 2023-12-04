import { Pressable, Text, } from 'react-native';
import styles from "./styles";


export default function OptionButton({ children, isSelected, onPress, reveal, isAnswer}) {
  let revealCss={}
  if(reveal){
    if(isAnswer){
      revealCss={backgroundColor:"#90fca0"}
    }else if(isSelected){
      revealCss={backgroundColor:"#fc9090"}
    }
  }

  return (
    <Pressable
     onPress={onPress}
     style={[styles.containerButton,
     isSelected?{marginTop:9,}:{paddingBottom:5,}]}>
      <Text style={[styles.innerText, revealCss]}>{children}</Text>
    </Pressable>
  );
}