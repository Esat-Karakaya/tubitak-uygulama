import GameLink from "../simpleComponents/gameLink"
import EmojisGame from "../emojisGame"
import MazeGame from "../mazeGame"
import PasswordCracking from "../passwordCracking"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { View, } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAtom } from "jotai";
import { nextGame, gameMistakes } from "../../jotai"

const { getItem, setItem } = AsyncStorage;

function GameMenu({ navigation, minParent, normParent }) {
  const [, setMistakesAtom] = useAtom(gameMistakes)
  const [, setNextGameAtom] = useAtom(nextGame)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      normParent()
    });

    return unsubscribe;
  }, []);

  const goToGame = async (route, storage, isRandom, shouldReplace) => {//SIDE EFFECTS
    const rawData = await getItem(storage)
    const readItems = rawData === null ? [] : JSON.parse(rawData)//parse to arr
    setMistakesAtom(readItems)
    //setItem(storage, "[]") TO RESET
    
    setNextGameAtom({ get: (isRandom ? () => gamePicker(true) : () => goToGame(route, storage, false, true)) })
    navigation[shouldReplace ? "replace" : "navigate"](route);
    minParent()
  }

  const gamePicker = async (bool) => {//SIDE EFFECTS
    const rawData = await getItem("falseAndTotal")
    const statistics=rawData ? JSON.parse(rawData) : { emojisGame: [5, 5], mazeGame: [5, 5], passwordCracking: [5, 5] }//parse to obj
    
    if (rawData===null) {
      setItem("falseAndTotal", JSON.stringify(statistics))
    }
    
    const pickedNum = Math.ceil(Math.random() * 100)
    if (pickedNum > 50) {
      goToGame("Emojileri Hatırla", "emojisGameMistakes", true, bool)
    } else {
      goToGame("Labirentten Çıkış", "emojisGameMistakes", true, bool)
    }
  }

  return (
    <View style={{ rowGap: 10, margin: 10, }}>
      <GameLink GameIcon={"😎"}
        onPress={() => goToGame("Emojileri Hatırla", "emojisGameMistakes")}
        GameTitle={"Emojileri Hatırla"} />
      <GameLink GameIcon={"🤔"}
        onPress={() => goToGame("Labirentten Çıkış", "emojisGameMistakes")}
        GameTitle={"Labirentten Çıkış"} />
      <GameLink GameIcon={"🕵️"}
        onPress={() => goToGame("Şifre Kırma", "emojisGameMistakes")}
        GameTitle={"Şifre Kırma"} />
      <GameLink GameIcon={"✏️"}
        onPress={() => gamePicker()}
        GameTitle={"Özelleştirilmiş Test"} />
    </View>
  )
}

export default function GamesScreen({ navigation }) {

  const Stack = createNativeStackNavigator()

  const minParent = () => {
    navigation.setOptions({ headerShown: false, tabBarStyle: { display: "none" } })
  }

  const normParent = () => {
    navigation.setOptions({ headerShown: true, tabBarStyle: { display: "flex" } })
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="GameMenu" options={{ headerShown: false }}>
        {(props) => <GameMenu {...props} normParent={normParent} minParent={minParent} />}
      </Stack.Screen>
      <Stack.Screen name="Emojileri Hatırla" component={EmojisGame} />
      <Stack.Screen name="Labirentten Çıkış" component={MazeGame} />
      <Stack.Screen name="Şifre Kırma" component={PasswordCracking} />
    </Stack.Navigator>
  )
}