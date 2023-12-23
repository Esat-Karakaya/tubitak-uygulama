import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../birdFiles/entities';
import Physics from '../birdFiles/physics';
import { useAtom } from 'jotai';
import { pointsAtom, setPointTo } from "../../globals";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ParrotScreen() {
  const [ droppeds, setDroppeds ] = useState("")
  const [ pointsVal, setPoints] = useAtom(pointsAtom)
  const [ lastFedPoint, setLastFedPoint ] = useState(0)

  const pointMargin = pointsVal - lastFedPoint
  const isFeedable = pointMargin >= 50
  const isRunning = (droppeds!=="💧🫐" && droppeds!=="🫐💧") && isFeedable
  const isTaskDone = droppeds=="💧🫐" || droppeds=="🫐💧"

  useEffect(()=>{
    console.log(1)
    AsyncStorage.getItem("lastFedPoint_LS").then(data => setLastFedPoint(Number(data)))
  }, [])
  
  useEffect(()=>{
    if (isTaskDone) {
      console.log(2)
      AsyncStorage.setItem("lastFedPoint_LS", String(pointsVal + 20))
      setPointTo({
        value: pointsVal + 20,
        updateAtomWith: setPoints
      })
      setLastFedPoint(pointsVal + 20)
    }
  }, [isTaskDone])
  console.log("parrotScreen",isRunning, lastFedPoint, pointsVal)
  return (
    <>
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
              <>
                <Text style={styles.pointText}>{`Kuşunuzu Beslemek İçin ${50-pointMargin} Puan Daha Almalısınız`}</Text>
              </>
          }
        </GameEngine>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height,
  },
  pointText:{
    position:"absolute",
    top: 80,
    fontSize: 15,
    width: Dimensions.get("window").width,
    textAlign:"center",
  }
});