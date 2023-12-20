import { StyleSheet, Text, ScrollView } from "react-native"
import { PARAGRAPHS, HEADERS } from "../../globals"

export default function Paragraph({ route, navigation }) {
    navigation.setOptions({ title:HEADERS[route.params.tipId] })

    return(
        <ScrollView>
            <Text style={styles.paragraph}> { PARAGRAPHS[route.params.tipId] } </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    paragraph:{
        textAlign:"center",
        fontSize:20,
        margin:10,
    }
})