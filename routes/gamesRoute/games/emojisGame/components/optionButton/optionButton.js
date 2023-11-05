import { Pressable, Text, } from 'react-native';
import styles from "./styles";


export default function OptionButton({ children, isSelected, onPress, reveal, isAnswer}) {
  let revealCss={}
  if(reveal){
    if(isAnswer){
      revealCss={backgroundColor:"green"}
    }else if(isSelected){
      revealCss={backgroundColor:"red"}
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