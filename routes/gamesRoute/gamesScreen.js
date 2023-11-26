import { useEffect } from "react";
import { View, } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import GameLink from "./gameLink/gameLink"
import EmojisGame from "./games/emojisGame"
import MazeGame from "./games/mazeGame"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from "jotai";
import {nextGame} from "../../jotai"
const {getItem, setItem} = AsyncStorage;

function GameMenu({ navigation, minParent, normParent }) {
  const [, setNextGameAtom]=useAtom(nextGame)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      normParent()
    });

    return unsubscribe;
  }, []);

  const goToGame=async (route, storage, isRandom, shouldReplace)=>{//SIDE EFFECTS
    console.log(route, storage, isRandom, shouldReplace)
    const rawData = await getItem(storage)
    const readItem = rawData===null?null:JSON.parse(rawData)//str to arr

    //setItem(storage, "[]") TO RESET

    if (readItem===null) {//declares it a JSON arr if null
      setItem(storage, "[]")
    }
    setNextGameAtom({get:(isRandom ? ()=>gamePicker(true) : () => goToGame(route, storage, false, true))})
    navigation[shouldReplace?"replace":"navigate"](route, {
      mistakes: readItem ?? [],
    });
    minParent()
  }

  const gamePicker=(bool)=>{//SIDE EFFECTS
    const pickedNum=Math.ceil(Math.random()*100)
    if (pickedNum>50) {
      goToGame("Emojileri Hatırla", "emojisGameMistakes", true, bool)
    } else {
      goToGame("Labirentten Çıkış", "emojisGameMistakes", true, bool)
    }
  }

  return(
    <View style={{rowGap:10, margin:10,}}>
      <GameLink GameIcon={"😎"}
      onPress={()=>goToGame("Emojileri Hatırla", "emojisGameMistakes")}
      GameTitle={"Emojileri Hatırla"}/>
      <GameLink GameIcon={"🤔"}
      onPress={()=>goToGame("Labirentten Çıkış", "emojisGameMistakes")}
      GameTitle={"Labirentten Çıkış"}/>
      <GameLink GameIcon={"✏️"}
      onPress={()=>gamePicker()}
      GameTitle={"Özelleştirilmiş Test"}/>
    </View>
  )
}

export default function GamesScreen({ navigation }){

  const Stack= createNativeStackNavigator()

  const minParent=()=>{
    navigation.setOptions({headerShown: false, tabBarStyle: {display:"none"}})
  }

  const normParent=()=>{
    navigation.setOptions({headerShown: true, tabBarStyle: {display:"flex"}})
  }

  return(
    <Stack.Navigator>
      <Stack.Screen name="GameMenu" options={{headerShown:false}}>
        {(props)=><GameMenu {...props} normParent={normParent} minParent={minParent} />}
      </Stack.Screen>
      <Stack.Screen name="Emojileri Hatırla" component={EmojisGame}/>
      <Stack.Screen name="Labirentten Çıkış" component={MazeGame}/>
    </Stack.Navigator>
  )
}