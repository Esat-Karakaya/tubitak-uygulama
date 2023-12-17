import { useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameNavigator from "./components/routes/gamesScreen"
import TipsScreen from "./components/routes/tipsScreen"
import ParrotScreen from "./components/routes/parrotScreen"
import registerNNPushToken from 'native-notify';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
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
      const { screen }=lastNR.notification.request.content.data
      screen && navigationRef?.current.navigate(screen)
    }
  }, [lastNR])

  registerNNPushToken(15426, 'PDvWtkdZmYUHA20TrbdOAr');  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Oyunlar"
      screenOptions={optionsVal}>

        <Stack.Screen
          options={{
            headerShown:false,
            title:"Eğitici Oyunlar",
            tabBarIcon:()=><Ionicons name="game-controller" size={24} color="black" />
          }}
          name="Oyunlar Menüsü"
          component={GameNavigator}/>

        <Stack.Screen
          options={{
            headerShown:false,
            title:"Tavsiyeler",
            tabBarIcon:()=><Entypo name="book" size={24} color="black" />
          }}
          name="Tavsiyeler Menüsü"
          component={TipsScreen} />

        <Stack.Screen
          options={{
            tabBarIcon:()=><MaterialCommunityIcons name="bird" size={24} color="black" />
          }}
          name="Evcil Kuş"
          component={ParrotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// register parrot notifications
function registerNotification() {
  const triggerNotificationHandler = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync()
    
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Kuşunuz ilgi istiyor',
        body: 'Kuşunuzu beslemek için dokununuz',
        data: { screen: 'Evcil Kuş' },
      },
      trigger: { 
        hour: 18, minute: 0, repeats: true,
      }
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Kuşunuz ilgi istiyor',
        body: 'Kuşunuzu beslemek için dokununuz',
        data: { screen: 'Evcil Kuş' },
      },
      trigger: { 
        hour: 12, minute: 0, repeats: true,
      }
    });
  };

  triggerNotificationHandler();
}