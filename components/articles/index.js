import { StyleSheet, Text, ScrollView, Button } from "react-native";
import { PARAGRAPHS, HEADERS, pickedTips } from "../../globals";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

const {getItem, setItem}=AsyncStorage
const TIPS_LS="pickedTips"

export default function Paragraph({ route, navigation }) {
	const [ pickedTipsVal, setPickedTips ] = useAtom(pickedTips)
	const [ isNotificationOn, setIsNotificationOn ] = useState(null)
	const {tipId}=route.params

	useEffect(()=>{
		navigation.setOptions({ title:HEADERS[tipId] })
		if (pickedTipsVal===null) {
			getItem(TIPS_LS)
				.then(ls => setPickedTips(JSON.parse(ls ?? "[]")))
		}
	} ,[])

	const pickedTipsArr=pickedTipsVal ?? []

	const isOn = isNotificationOn ?? pickedTipsArr.includes(tipId)

	return(
		<ScrollView style={styles.container}>
			<Text style={styles.paragraph}> { PARAGRAPHS[tipId] } </Text>
			{
				isOn?
					<>
						<Button 
							onPress={()=>{
								pickedTipsArr.splice(pickedTipsArr.indexOf(tipId), 1)
								setPickedTips(pickedTipsArr)
								setItem(TIPS_LS, JSON.stringify(pickedTipsArr))
								Notifications.cancelScheduledNotificationAsync("tip"+tipId)
								setIsNotificationOn(false)
							}}
							title="Hatırlatmayı Kapat"/>
						<Text>{"Bu tavsiyemizi bir alışkanlığa dönüştürebildiyseniz hatırlatmayı kapatabilirsiniz"}</Text>
					</> :
					<>
						<Button 
							onPress={()=>{
								pickedTipsArr.includes(tipId) || pickedTipsArr.push(tipId)
								setItem(TIPS_LS, JSON.stringify(pickedTipsArr))
								setPickedTips(pickedTipsArr)
								registerNotification({identifier:"tip"+tipId})
								setIsNotificationOn(true)
							}}
							title="Hatırlatmayı Aç"/>
						<Text>{"Bu tavsiyemizi daha kolay hatırlamak için bildirim göndermemizi istiyorsanız hatırlatmayı açabilirsiniz"}</Text>
					</>
			}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container:{
		contentContainerStyle:{
			justifyContent:"center",
		},
		margin:20,
	},
	paragraph:{
		textAlign:"center",
		fontSize:20,
		paddingBottom:20
	}
})

// register notification
function registerNotification({identifier, tipId}) {
	Notifications.scheduleNotificationAsync({
		content: {
			title: HEADERS[tipId]+" Hakkındaki Tavsiyemizi Hatırlatmak İstedik",
			body: 'Hatırlamak için dokununuz',
			data: { modalMessage: PARAGRAPHS[tipId] },
		},
		trigger: { 
			hour: 12, minute: 0, repeats: true,
		},
		identifier,
	});
}