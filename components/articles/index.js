import { StyleSheet, Text } from "react-native"
import { PARAGRAPHS, HEADERS } from "../../globals"

export default function Paragraph({ route, navigation }) {
    navigation.setOptions({ title:HEADERS[route.params.tipId] })

    return(
        <>
            <Text style={styles.paragraph}> { PARAGRAPHS[route.params.tipId] } </Text>
        </>
    )
}

const styles = StyleSheet.create({
    paragraph:{
        textAlign:"center",
        fontSize:20,
        margin:10,
    }
})