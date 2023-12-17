import { StyleSheet, View, Image, Dimensions, Text } from "react-native";
import OptionButton from "../simpleComponents/customButton"
import Img from "../../assets/parrot.png"
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../simpleComponents/customModal"

export default ParrotScreen=()=>{
  const [selecteds, setSelecteds]=useState([])
  const [currentDate] = useState((new Date()).getDate())
  const [currentHour] = useState((new Date()).getHours())
  const [doneTasks, setDoneTasks] = useState([])
  const [modalVis, setModalVis] = useState(false)
  const isFeedable=useMemo(()=>parrotWants((new Date()).getDate(), (new Date()).getHours(), doneTasks),[doneTasks])
  useEffect(()=>{getToDo(setDoneTasks)}, [])
  useEffect(()=>{
    if (selecteds.length===2 || !isFeedable) { 
      setModalVis(true)
      let available=null
      if (currentHour<13) { available=12 }
      else if (currentHour<19) { available=18 }
      if (doneTasks.includes(currentDate+"/"+available)) { return }
      doneTasks.push(currentDate+"/"+available)
      const newTasks= doneTasks.filter((str)=>str.split("/")[0]==currentDate) // deletes legacy progress
      AsyncStorage.setItem("parrot", JSON.stringify(newTasks))
    }
  }, [isFeedable, selecteds])

  function onModalClose() { setModalVis(false) }

  return (
    <View style={styles.pageContainer}>
      <Image style={styles.parrot} source={Img}/>
      <CustomModal
        visible={modalVis}
        onClose={onModalClose}
        title={"Kuşunuz Yeterince Beslendi 😃"}/>
      <View style={styles.buttonContain}>
        {
          (isFeedable ? ["🫐", "💧"]:[]).map((e)=>
            <OptionButton
              onPress={()=>setSelecteds(arr=>[e, ...arr])}
              key={e}
              style={
                selecteds.includes(e)?
                {display:"none"}:
                {}
              }
              children={e}/>
          )
        }
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  parrot:{
    marginTop:40,
    width:Dimensions.get("window").width*3/4,
    height:Dimensions.get("window").width*3/4,
    borderRadius:20,
  },
  pageContainer:{
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",

  },
  buttonContain:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-around",
    backgroundColor:"aqua",
    padding:10,
    borderTopWidth:3,
  }
})

async function getToDo(setFunc) {
  await AsyncStorage.setItem("parrot", "[]")
  const rawParrot_LS=(await AsyncStorage.getItem('parrot')) ?? "[]"
  console.log(rawParrot_LS)
  setFunc(JSON.parse(rawParrot_LS))
}

function parrotWants(currentDate, currentHour, doneTasks) {
  let available=null
  if (currentHour<13) { available=12 }
  else if (currentHour<19) { available=18 }
  if (
    !doneTasks.includes(currentDate+"/"+available) &&
    [11, 12, 17, 18].includes(currentHour)
  ) {
    return true
  }
  return false
}