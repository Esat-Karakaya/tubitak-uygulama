import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../birdFiles/entities';
import Physics from '../birdFiles/physics';
import { useAtom } from 'jotai';
import { LAST_FED_POINT_LS, pointsAtom, setPointTo, } from "../../globals";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../simpleComponents/customModal';

export default function ParrotScreen() {
  const [ droppeds, setDroppeds ] = useState("")
  const [ pointsVal, setPoints] = useAtom(pointsAtom)
  const [ lastFedPoint, setLastFedPoint ] = useState(0)
  const [ modalVis, setModalVis ] = useState(false)

  const pointMargin = pointsVal - lastFedPoint
  const isFeedable = pointMargin >= 50
  const isRunning = (droppeds!=="💧🫐" && droppeds!=="🫐💧") && isFeedable
  const isTaskDone = droppeds=="💧🫐" || droppeds=="🫐💧"

  useEffect(()=>{
    AsyncStorage.getItem(LAST_FED_POINT_LS).then(data => setLastFedPoint(Number(data)))
  }, [])
  
  useEffect(()=>{
    if (isTaskDone) {
      AsyncStorage.setItem(LAST_FED_POINT_LS, String(pointsVal + 20))
      setPointTo({
        value: pointsVal + 20,
        updateAtomWith: setPoints
      })
      setLastFedPoint(pointsVal + 20)
      setModalVis(true)
    }
  }, [isTaskDone])
  
  return (
    <>
      <CustomModal
          visible={modalVis}
          onClose={()=>setModalVis(false)}
          titleStyle={{fontSize:25}}
          title={"Kuşunuzu Mutlu Ettiniz 😃"}
          body={`20 Puan Aldınız 🪙`}/>
      <GameEngine
        systems={[ Physics ]}
        style={styles.container}
        entities={entities()}
        running={isRunning}
        onEvent={ e => {
          if (e.type === "used" && !droppeds.includes(e.box)) {
            setDroppeds(prev=>prev+e.box)
          }
        }}>
          {
            isRunning?
              <></>:
              <View style={{flex:1, alignItems:"center"}}>
                <Text style={styles.pointText}>{`Beslemek İçin ${50-pointMargin} Puan Daha Almalısınız 🔒`}</Text>
              </View>
          }
      </GameEngine>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  pointText:{
    backgroundColor:"white",
    padding:15,
    position:"absolute",
    bottom:40,
    fontSize: 15,
    textAlign:"center",
    borderRadius:15,
  }
});