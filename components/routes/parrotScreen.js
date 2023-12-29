import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../birdFiles/entities';
import Physics from '../birdFiles/physics';
import { useAtom } from 'jotai';
import { pointsAtom, setPointTo } from "../../globals";
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
    AsyncStorage.getItem("lastFedPoint_LS").then(data => setLastFedPoint(Number(data)))
  }, [])
  
  useEffect(()=>{
    if (isTaskDone) {
      AsyncStorage.setItem("lastFedPoint_LS", String(pointsVal + 20))
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
          title={"Title"}
          body={`Puan Aldınız 🪙`}/>
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
              <Text style={styles.pointText}>{`Beslemek İçin ${50-pointMargin} Puan Daha Almalısınız 🔒`}</Text>
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
    position:"absolute",
    bottom:40,
    fontSize: 15,
    width: "100%",
    textAlign:"center",
  }
});