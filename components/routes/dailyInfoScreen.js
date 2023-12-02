import { ScrollView, View } from "react-native"
import EachReport from "../simpleComponents/eachReport";

export default function DailyInfoScreen(){

  return(
    <ScrollView>
      <View style={{rowGap:10, padding:10,}}>
        <EachReport prop={"Ortalamaya Göre Ekran Süresindeki Değişim:"} value={`-20%`}/>
        <EachReport prop={"Bugünkü Adım Sayınız"} value={`20`}/>
        <EachReport prop={"Bugün Kazandığınız Toplam Puan:"} value={`40xp`}/>
        <EachReport prop={"Ortalamaya Göre Ekran Süresindeki Artış:"} value={"%20"}/>
      </View>
    </ScrollView>
  )
}