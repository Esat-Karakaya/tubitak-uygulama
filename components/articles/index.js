import { StyleSheet, Text, ScrollView, Button } from "react-native"
import { PARAGRAPHS, HEADERS } from "../../globals"
import { useEffect } from "react"

export default function Paragraph({ route, navigation }) {

    useEffect(()=>{
        navigation.setOptions({ title:HEADERS[route.params.tipId] })
    },[])

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.paragraph}> { PARAGRAPHS[route.params.tipId] } </Text>
            <Button title="Uygulamaya Başla"/>
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