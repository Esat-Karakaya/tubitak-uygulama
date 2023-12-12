import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameNavigator from "./components/routes/gamesScreen"
import TipsScreen from "./components/routes/tipsScreen"
import ChairScreen from "./components/routes/chairScreen"
import DailyInfoScreen from "./components/routes/dailyInfoScreen"
import registerNNPushToken from 'native-notify';
import { useAtom } from "jotai";
import { NavOpts } from "./globals";

const Stack = createBottomTabNavigator()

export default function App() {
  const [optionsVal]=useAtom(NavOpts)

  registerNNPushToken(15426, 'PDvWtkdZmYUHA20TrbdOAr');  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Oyunlar"
      screenOptions={optionsVal}>
        <Stack.Screen options={{headerShown:false, title:"Eğitici Oyunlar"}} name="Oyunlar Menüsü" component={GameNavigator} />
        <Stack.Screen options={{headerShown:false, title:"Tavsiyeler"}} name="Tavsiyeler Menüsü" component={TipsScreen} />
        <Stack.Screen name="Günlük Rapor" component={DailyInfoScreen} />
        <Stack.Screen name="Akıllı Sandalye" component={ChairScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}