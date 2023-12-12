import { ScrollView ,View ,StyleSheet } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Lorem1 from "../articles/lorem1"
import CustomButton from "../simpleComponents/customButton"

function TipsScreen({ navigation }){
  return(
    <ScrollView>
      <View style={styles.cardContainer}>
        <CustomButton 
        style={styles.card}
        textStyles={styles.cardTitle}
        onPress={()=>{
          navigation.navigate("Lorem1")
        }}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
      </View>
    </ScrollView>
  )
}

export default function TipsNavigation() {
  const Stack = createNativeStackNavigator()

  return(
    <Stack.Navigator>
      <Stack.Screen name="Tavsiyeler" component={TipsScreen} />
      <Stack.Screen name="Lorem1" component={Lorem1} />
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
    paddingVertical:20,
  },
  card:{
    width:"40%",
  },
  cardTitle:{
    textAlignVertical:"center",
    fontSize:17,
    aspectRatio:1,
  }
});