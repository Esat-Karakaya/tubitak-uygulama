import GameLink from "../simpleComponents/gameLink"
import EmojisGame from "../emojisGame"
import MazeGame from "../mazeGame"
import PasswordCracking from "../passwordCracking"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { View, } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAtom, useSetAtom } from "jotai";
import { nextGame, gameMistakes, gameStatistics, EMOJIS_LS, MAZE_LS, PASSWORD_LS, STATISTICS_LS, NavOpts } from "../../globals"

const { getItem, setItem } = AsyncStorage;

function GameMenu({ navigation,}) {
  const setNavOptions=useSetAtom(NavOpts)
  const setMistakesAtom = useSetAtom(gameMistakes)
  const setNextGameAtom = useSetAtom(nextGame)
  const [GameStatisticsAtom, setGameStatisticsAtom] = useAtom(gameStatistics)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNavOptions({ headerShown: true, tabBarStyle: { display: "flex" }})// Display Main Nav Header
    });

    return unsubscribe;
  }, []);

  const goToGame = async (route, storage, isRandom, shouldReplace) => { // SIDE EFFECTS
    const rawData = await getItem(storage)
    const readItems = rawData === null ? [] : JSON.parse(rawData) // parse to arr
    setMistakesAtom(readItems)
    setGameStatisticsAtom(GameStatisticsAtom ?? await retreiveGameStatistics())
    setNextGameAtom({
      get: (isRandom ?
        () => {
          randomNavigator(true)
        } :
        () => {
          goToGame(route, storage, false, true)
        })
    })
    navigation[shouldReplace ? "replace" : "navigate"](route);
    setNavOptions({ headerShown: false, tabBarStyle: { display: "none" }})// Hide Main Nav Header
  }

  const randomNavigator = async (bool) => { // SIDE EFFECTS
    const statistics= await retreiveGameStatistics()

    switch (pickedGame(gamePercentages(statistics))) {
      case "emojisGame":
        goToGame("Emojileri Hatırla", EMOJIS_LS, true, bool)
        break;

      case "mazeGame":
        goToGame("Labirentten Çıkış", MAZE_LS, true, bool)
        break;

      case "passwordCracking":
        goToGame("Şifre Kırma", PASSWORD_LS, true, bool)
        break;
    }
  }

  return (
    <View style={{ rowGap: 10, margin: 10, }}>
      <GameLink GameIcon={"😎"}
        onPress={() => goToGame("Emojileri Hatırla", EMOJIS_LS)}
        GameTitle={"Emojileri Hatırla"} />
      <GameLink GameIcon={"🤔"}
        onPress={() => goToGame("Labirentten Çıkış", MAZE_LS)}
        GameTitle={"Labirentten Çıkış"} />
      <GameLink GameIcon={"🕵️"}
        onPress={() => goToGame("Şifre Kırma", PASSWORD_LS)}
        GameTitle={"Şifre Kırma"} />
      <GameLink GameIcon={"✏️"}
        onPress={() => randomNavigator()}
        GameTitle={"Özelleştirilmiş Test"} />
    </View>
  )
}

export default function GameNavigator() {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Eğitici Oyunlar" component={GameMenu} />
      <Stack.Screen name="Emojileri Hatırla" component={EmojisGame} />
      <Stack.Screen name="Labirentten Çıkış" component={MazeGame} />
      <Stack.Screen name="Şifre Kırma" component={PasswordCracking} />
    </Stack.Navigator>
  )
}

 // Pure Helper Functions

const gamePercentages = (statistics) => {
  const probabilities = {}

  const sum = Object.entries(statistics).reduce((acc, gameInfo) => {
    const inaccuracy = gameInfo[1][0] / gameInfo[1][1]
    probabilities[gameInfo[0]] = inaccuracy

    return inaccuracy + acc
  }, 0)

  for (const key in probabilities) {
    probabilities[key] = probabilities[key] * 100 / sum
  }

  return probabilities
}

const pickedGame = (probabilities) => {
  const minVals = []
  for (const key in probabilities) {
    minVals.push((minVals.at(-1) ?? 0) + probabilities[key])
  }
  const pickedNum = Math.random() * 100

  let pickedI = 0
  minVals.every((val, i) => {
    if (val >= pickedNum) {
      pickedI = i
      return false
    }
    return true
  })

  return Object.keys(probabilities)[pickedI]
}
const retreiveGameStatistics= async ()=>{
  const rawData = await getItem(STATISTICS_LS)
   // parse to obj
  const statistics = rawData ? JSON.parse(rawData) : {
    emojisGame: [5, 5],
    mazeGame: [5, 5],
    passwordCracking: [5, 5]
  }
  if (rawData === null) {
    setItem(STATISTICS_LS, JSON.stringify(statistics))
  }

  return statistics
}