import { useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameNavigator from "./components/routes/gamesScreen"
import TipsScreen from "./components/routes/tipsScreen"
import ChairScreen from "./components/routes/chairScreen"
import ParrotScreen from "./components/routes/parrotScreen"
import registerNNPushToken from 'native-notify';
import { useAtom } from "jotai";
import { NavOpts } from "./globals";

const Stack = createBottomTabNavigator()

export default function App() {
  const [optionsVal]=useAtom(NavOpts)
  const navigationRef=useRef(null)
  const lastNR = Notifications.useLastNotificationResponse()

  useEffect(()=>{
    registerNotification()
    if (lastNR) {
      navigationRef?.current.navigate(lastNR.notification.request.content.data.screen)
    }
  }, [lastNR])

  registerNNPushToken(15426, 'PDvWtkdZmYUHA20TrbdOAr');  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Oyunlar"
      screenOptions={optionsVal}>
        <Stack.Screen options={{headerShown:false, title:"Eğitici Oyunlar"}} name="Oyunlar Menüsü" component={GameNavigator} />
        <Stack.Screen options={{headerShown:false, title:"Tavsiyeler"}} name="Tavsiyeler Menüsü" component={TipsScreen} />
        <Stack.Screen name="Evcil Kuş" component={ParrotScreen} />
        <Stack.Screen name="Akıllı Sandalye" component={ChairScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function registerNotification() {
  const triggerNotificationHandler = async () => {

    await Notifications.cancelAllScheduledNotificationsAsync()

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Kuşunuz ilgi istiyor',
        body: "Kuşunuzu beslemek için dokununuz",
        data: { screen: 'Evcil Kuş' },
      },
      trigger: { 
        hour: 20, minute: 20, repeats: true,
      }
    });
  };

  triggerNotificationHandler();
}