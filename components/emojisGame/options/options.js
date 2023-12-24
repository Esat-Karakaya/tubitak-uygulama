import { Animated, View, Dimensions, Button, Text } from 'react-native';
import { useEffect, useRef, useState } from "react";
import {useAtom,} from "jotai"
import OptionButton from "../optionButton/optionButton";
import styles from "./styles";
import { gameData, gameStatistics, EMOJIS_LS, updateStorage, pointsAtom, setPointTo, } from '../../../globals';

export default function Options({showCount, showList, mistakes}) {
  const VW=Dimensions.get("window").width
  const Anim = useRef(new Animated.Value(0)).current;
  const showLeft = Anim.interpolate({inputRange:[0, 1], outputRange:[VW, (VW-styles.container.width)/2]})

  const [ gameDataObj ]=useAtom(gameData)
  const [ falseAndTotal ]=useAtom(gameStatistics)
  const options=useRef(showList.reduce((acc, e)=>acc.includes(e)?acc:[...acc, e],[])).current; // visible options
  const duplicate= useRef(findDuplicate(showList)).current // correct answer
  const shuffledEmojis= useRef(shuffle(options)).current // shuffles the options
  const [ selectedE, setSelectedE ] = useState(null) // selected emoji
  const [ reveal, setReveal ] = useState(false) // true when confirmed
  const [ pointsVal, setPoints ] = useAtom(pointsAtom)

  useEffect(()=>{
    if(showCount===showList.length){
      Anim.setValue(0)
      Animated.timing(Anim, {
        toValue: 1,
        duration: 800 ,
        useNativeDriver: false,
      }).start();
    }
  },[Anim, showCount, showList.length])

  const onConfirm=()=>{
    updateStorage({
      isSuccessful: selectedE!==duplicate,
      mistakes,
      statistics: falseAndTotal,
      gameKey: EMOJIS_LS,
      gameName: "emojisGame",
      gameToAdd: showList,
    })
    setReveal(true)
    setPointTo({
      value: pointsVal + gameDataObj.addPoint,
      updateAtomWith: setPoints
    })
  }

  const onSelect=(e)=>{
    if(reveal){
      return;
    }
    setSelectedE((prev)=>prev===e ? null : e)
  }

  return (
    <Animated.View style={[styles.container, { transform:[{translateX:showLeft}] }]}>
      <Text style={{fontSize:20, marginVertical:20}}>{ "Hangi Emoji İki Kez Geçti❓" }</Text>
      <View style={styles.innerContainer}>
        {shuffledEmojis.map((e, i)=>
          <OptionButton
            key={i}
            onPress={()=>onSelect(e)}
            isAnswer={duplicate===e}
            reveal={reveal}
            isSelected={selectedE===e}
            children={e} />
        )}
      </View>
      {reveal ? 
      <>
        <Text style={{fontSize:20}}>
          {selectedE===duplicate?"Tebrikler 🥳":"Çalıştıkça Gelişir 😉"}
        </Text>
        <Text style={{fontSize:15}}>{`${gameDataObj.addPoint} Puan Aldınız 🪙`}</Text>
        <Button onPress={gameDataObj.get} title='Devam Et'/>
      </>:
      <Button onPress={onConfirm} title={selectedE?"Kontrol Et":"Cevabı Gör"}/>}
    </Animated.View>
  );
}

function findDuplicate(arr) {
  let seen = new Set();
  for (let element of arr) {
    if (seen.has(element)) {
      return element;
    }
    seen.add(element);
  }
}

function shuffle(input) {
  const array=JSON.parse(JSON.stringify(input))
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}