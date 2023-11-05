import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GamesScreen from "./routes/gamesRoute/gamesScreen"
import TipsScreen from "./routes/tipsRoute/tipsScreen"
import ChairScreen from "./routes/chairRoute/chairScreen"
import DailyInfoScreen from "./routes/dailyInfoRoute/dailyInfoScreen"

const Stack = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Oyunlar">
        <Stack.Screen name="Oyunlar" component={GamesScreen} />
        <Stack.Screen name="Tavsiyeler" component={TipsScreen} />
        <Stack.Screen name="Günlük Rapor" component={DailyInfoScreen} />
        <Stack.Screen name="Akıllı Sandalye" component={ChairScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}