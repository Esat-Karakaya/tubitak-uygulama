import { Text, SafeAreaView, StyleSheet, Button, View } from 'react-native';
import Card from "./components/card/card";
import Options from "./components/options/options"
import { useState, useMemo, } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Game({ refresh, mistakes }) {
  const showList= useMemo(returnShowList,[])

  const [showCount, setShowCount] = useState(0)
  return (
    <SafeAreaView style={styles.container}>
      {showCount<10 ? 
      <Text style={{position:"absolute",top:30,width:"100%",textAlign:"center", fontSize:20}}>{showCount+1}/{EMOJI_NUM}</Text>:
      <></>}
      <Card ANIM_DUR={ANIM_DUR} showCount={showCount} EMOJI_NUM={EMOJI_NUM} setShowCount={setShowCount} key={showCount} >{showList[showCount]}</Card>
      <Options showCount={showCount} mistakes={mistakes} showList={showList}/>
      <View style={{position:"absolute",bottom:10,width:"100%",alignItems:"center"}}>
        <Button onPress={()=>refresh((b)=>!b)} color="green" title="YENİDEN BAŞLAT"/>
      </View>
    </SafeAreaView>
  );

  function returnShowList (){
    if (mistakes.length>4) {
      const oldestMistake=mistakes.shift()
      AsyncStorage.setItem("emojisGameMistakes", JSON.stringify(mistakes))
      return oldestMistake
    }
  
    return selectSome(emojisArr, EMOJI_NUM);
  }
}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    overflow:"hidden",
  },
});

//CONFIGS
const EMOJI_NUM=10
const ANIM_DUR=700

//HELPER FUNCTIONS
const selectSome=( arr, count )=>{
  const selectRandomFrom=(arr)=>{
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const selecteds=[]

  while(selecteds.length<count-1){
    const candidate=selectRandomFrom(arr);
    selecteds.includes(candidate) || selecteds.push(candidate)
  }
 
  const doubled=selectRandomFrom(selecteds)
  const originalI=selecteds.indexOf(doubled)
  const possiblePositions=[...Array(count).keys()].filter((el)=> 4<=Math.abs(el-originalI))

  selecteds.splice(selectRandomFrom(possiblePositions), 0, doubled)

  return selecteds;
}

//EMOJI LIST
const emojisArr=[
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
  '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '🤞', '🥲', '😋',
  '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
  '🤨', '😐', '😑', '😶', '😶‍🌫️', '😏', '😒', '🙄', '😬', '😌',
  '😔', '🤤', '😷', '😴', '🤒', '🤕', '🤢', '🤧', '🥵', '🥶',
  '🥴', '😵‍💫', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕',
  '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😱', '🥱',
  '😈', '👿', '💞', '💕', '💓', '💖', '💬', '💣', '💫', '💦',
  '🗯', '💤', '👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏',
  '✌', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '🕳',
]