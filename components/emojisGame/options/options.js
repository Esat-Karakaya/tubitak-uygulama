import { Animated, View, Dimensions, Button, Text } from 'react-native';
import { useEffect, useRef, useState } from "react";
import {useAtom} from "jotai"
import OptionButton from "../optionButton/optionButton";
import styles from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nextGame, gameStatistics } from '../../../jotai';

const VW=Dimensions.get("window").width

export default function Options({showCount, showList, mistakes}) {
  const Anim = useRef(new Animated.Value(0)).current;
  const showLeft = Anim.interpolate({inputRange:[0, 1], outputRange:[VW, (VW-styles.container.width)/2]})

  const [ nextGameObj ]=useAtom(nextGame)
  const [ falseAndTotal ]=useAtom(gameStatistics)
  const options=useRef(showList.reduce((acc, e)=>acc.includes(e)?acc:[...acc, e],[])).current; //visible options
  const duplicate= useRef(findDuplicate(showList)).current //correct answer
  const shuffledEmojis= useRef(shuffle(options)).current //shuffles the options
  const [ selectedE, setSelectedE ] = useState(null) //selected emoji
  const [ reveal, setReveal ] = useState(false) //true when confirmed

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
    if (mistakes.length>4) { //If the question was a prev mistake
      mistakes.shift()
    }
    if (selectedE!==duplicate) { //If done incorrect add to mistakes
      mistakes.push(showList)
      falseAndTotal.emojisGame[0]++ //Incrementing the incorrection number in DB
    }
    falseAndTotal.emojisGame[1]++ //Incrementing the playing number in DB

    const storageSets=[
      ["emojisGameMistakes", JSON.stringify(mistakes)],
      ["falseAndTotal", JSON.stringify(falseAndTotal)]
    ]

    AsyncStorage.multiSet(storageSets)
    setReveal(true)
  }

  const onSelect=(e)=>{
    if(reveal){
      return;
    }
    setSelectedE((prev)=>prev===e ? null : e)
  }

  return (
    <Animated.View style={[styles.container, { transform:[{translateX:showLeft}] }]}>
      <Text style={{fontSize:20, marginVertical:20}}>Hangi Emoji İki Kez Geçti❓</Text>
      <View style={styles.innerContainer}>{shuffledEmojis.map((e, i)=>
        <OptionButton
         key={i}
         onPress={()=>onSelect(e)}
         isAnswer={duplicate===e}
         reveal={reveal}
         isSelected={selectedE===e}>
          {e}
        </OptionButton>
      )}</View>
      {reveal ? 
      <>
        <Text style={{fontSize:20}}>
          {selectedE===duplicate?"Tebrikler 🥳":"Çalıştıkça Gelişir 😉"}
        </Text>
        <Button onPress={nextGameObj.get} title='Devam Et'/>
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