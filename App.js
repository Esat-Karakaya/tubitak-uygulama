import { useEffect, useRef, } from "react";
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameNavigator from "./components/routes/gamesScreen"
import TipsScreen from "./components/routes/tipsScreen"
import ParrotScreen from "./components/routes/parrotScreen"
import RankScreen from "./components/routes/rankScreen"
import registerNNPushToken from 'native-notify';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAtom, useSetAtom } from "jotai";
import { NavOpts, pointsAtom } from "./globals";
import { Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createBottomTabNavigator()
AsyncStorage.removeItem("point_LS")
AsyncStorage.removeItem("lastFedPoint_LS")

export default function App() {
  const [optionsVal] = useAtom(NavOpts)
  const setPoints = useSetAtom(pointsAtom)
  const navigationRef = useRef(null)
  const lastNR = Notifications.useLastNotificationResponse()

  useEffect(()=>{
    AsyncStorage.getItem("point_LS").then( data => {
      setPoints(Number(data))
    })
  }, [])

  useEffect(()=>{
    if (lastNR) {
      const { title }=lastNR.notification.request.content
      const { modalMessage }=lastNR.notification.request.content.data
      Alert.alert(title, modalMessage, [{text: 'Tamam'}])
    }
  }, [lastNR])

  registerNNPushToken(15426, 'PDvWtkdZmYUHA20TrbdOAr');
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={optionsVal}>
        <Stack.Screen
          options={{
            headerShown:false,
            title:"Eğitici Oyunlar",
            tabBarIcon:()=><Ionicons name="game-controller" size={24} color="black" />,
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
            headerTransparent:true,
            tabBarIcon:()=><MaterialCommunityIcons name="bird" size={24} color="black" />,
            headerBackground:()=>(<View style={{backgroundColor:"white", position:"absolute", top:0, bottom:0, left:0, right:0}}/>),
            unmountOnBlur:true,
          }}
          name="Evcil Kuş"
          component={ParrotScreen} />
        <Stack.Screen
          options={{
            tabBarIcon:()=><MaterialCommunityIcons name="medal" size={24} color="black" />,
            unmountOnBlur:true,
          }}
          name="Sıralama"
          component={RankScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}