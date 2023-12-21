import { StyleSheet, Text, ScrollView, Button } from "react-native"
import { PARAGRAPHS, HEADERS } from "../../globals"
import { useEffect } from "react"

export default function Paragraph({ route, navigation }) {

    useEffect(()=>{
        navigation.setOptions({ title:HEADERS[route.params.tipId] })
    },[])

    return(
        <ScrollView>
            <Text style={styles.paragraph}> { PARAGRAPHS[route.params.tipId] } </Text>
            <Button title="Uygulamaya Başla"/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    paragraph:{
        textAlign:"center",
        fontSize:20,
        margin:10,
        justifyContent:"center",
    }
})