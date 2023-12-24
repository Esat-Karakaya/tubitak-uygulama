import { ScrollView ,View ,StyleSheet } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HEADERS } from '../../globals'
import Paragraph from "../articles"
import CustomButton from "../simpleComponents/customButton"
import { useMemo } from "react"

function TipsScreen({ navigation }){
  const buttons=useMemo(()=>HEADERS.map((header, i)=>{
    return(
      <CustomButton
        key={header}
        style={styles.card}
        textStyles={styles.cardTitle}
        onPress={()=>{
          navigation.navigate("Tips Screen", {tipId:i})
        }}>
        {header}
      </CustomButton>
    )
  }),[])

  return(
    <ScrollView>
      <View style={styles.cardContainer}>
        {buttons}
      </View>
    </ScrollView>
  )
}

export default function TipsNavigation() {
  const Stack = createNativeStackNavigator()

  return(
    <Stack.Navigator>
      <Stack.Screen name="Tavsiyeler" component={TipsScreen} />
      <Stack.Screen name="Tips Screen" component={Paragraph} />
    </Stack.Navigator>
  )
}

//CSS
const styles = StyleSheet.create({
  cardContainer:{
    flexWrap:"wrap",
    flexDirection:"row",
    justifyContent:"space-around",
    rowGap:20,
    columnGap:20,
    paddingVertical:20,
  },
  card:{
    width:"40%",
    maxWidth:200,
  },
  cardTitle:{
    textAlignVertical:"center",
    fontSize:17,
    aspectRatio:1,
  }
});