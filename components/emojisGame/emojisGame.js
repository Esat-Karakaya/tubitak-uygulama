import Card from "./card/card";
import Options from "./options/options"
import { useState, useMemo, } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { gameMistakes } from "../../globals";

export default function Game() {
  const [ mistakes ]=useAtom(gameMistakes)
  const showList= useMemo(returnShowList,[])
  const [ showCount, setShowCount ] = useState(0)
  
  return (
    <SafeAreaView style={styles.container}>
      {showCount<10 ? 
      <Text style={{position:"absolute",top:30,width:"100%",textAlign:"center", fontSize:20}}>{showCount+1}/{EMOJI_NUM}</Text>:
      <></>}
      <Card ANIM_DUR={ANIM_DUR} showCount={showCount} EMOJI_NUM={EMOJI_NUM} setShowCount={setShowCount} key={showCount} >{showList[showCount]}</Card>
      <Options showCount={showCount} mistakes={mistakes} showList={showList}/>
    </SafeAreaView>
  );

  function returnShowList (){
    if (mistakes.length>4) {
      return mistakes[0]
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