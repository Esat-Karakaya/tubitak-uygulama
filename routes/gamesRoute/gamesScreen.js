import { useEffect } from "react";
import { View, } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import GameLink from "./gameLink/gameLink"
import EmojisGame from "./games/emojisGame"
import MazeGame from "./games/mazeGame"
import AsyncStorage from '@react-native-async-storage/async-storage';
const {getItem, setItem} = AsyncStorage;

function GameMenu({ navigation, minParent, normParent }) {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      normParent()
    });

    return unsubscribe;
  }, []);

  const goToGame=async (route, storage)=>{
    const rawData = await getItem(storage)
    const readItem = rawData===null?null:JSON.parse(rawData)//str to arr

    //setItem(storage, "[]") TO RESET

    if (readItem===null) {//declares it a JSON arr if null
      setItem(storage, "[]")
    }
    navigation.navigate(route, {mistakes:readItem ?? []})
    minParent()
  }

  return(
    <View style={{rowGap:10, margin:10,}}>
      <GameLink GameIcon={"😎"}
      onPress={()=>goToGame("Emojileri Hatırla", "emojisGameMistakes")}
      GameTitle={"Emojileri Hatırla"}/>
      <GameLink GameIcon={"🤔"}
      onPress={()=>goToGame("Labirentten Çıkış", "emojisGameMistakes")}
      GameTitle={"Labirentten Çıkış"}/>
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