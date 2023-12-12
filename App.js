import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameNavigator from "./components/routes/gamesScreen"
import TipsScreen from "./components/routes/tipsScreen"
import ChairScreen from "./components/routes/chairScreen"
import DailyInfoScreen from "./components/routes/dailyInfoScreen"
import registerNNPushToken from 'native-notify';

const Stack = createBottomTabNavigator()

export default function App() {
  registerNNPushToken(15426, 'PDvWtkdZmYUHA20TrbdOAr');
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Oyunlar">
        <Stack.Screen name="Oyunlar" component={GameNavigator} />
        <Stack.Screen name="Tavsiyeler" component={TipsScreen} />
        <Stack.Screen name="Günlük Rapor" component={DailyInfoScreen} />
        <Stack.Screen name="Akıllı Sandalye" component={ChairScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}