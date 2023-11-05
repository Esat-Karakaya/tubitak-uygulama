import { ScrollView ,View ,StyleSheet } from "react-native"
import CustomButton from "../../components/customButton/customButton"

export default function TipsScreen(){
  return(
    <ScrollView>
      <View style={styles.cardContainer}>
        <CustomButton style={styles.card} textStyles={styles.cardTitle}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
        <CustomButton style={styles.card} textStyles={styles.cardTitle}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
        <CustomButton style={styles.card} textStyles={styles.cardTitle}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
        <CustomButton style={styles.card} textStyles={styles.cardTitle}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
        <CustomButton style={styles.card} textStyles={styles.cardTitle}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
        <CustomButton style={styles.card} textStyles={styles.cardTitle}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
        <CustomButton style={styles.card} textStyles={styles.cardTitle}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
        <CustomButton style={styles.card} textStyles={styles.cardTitle}>
          {"Hafıza Nasıl Geliştirilebilir"}
        </CustomButton>
      </View>
    </ScrollView>
  )
}

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