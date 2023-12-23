import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../birdFiles/entities';
import Physics from '../birdFiles/physics';
import { useAtom } from 'jotai';
import { pointsAtom } from "../../globals";

export default function App() {
  const [ droppeds, setDroppeds ] = useState("")
  const [, setPoints]=useAtom(pointsAtom)

  const didStop = droppeds!=="💧🫐" || droppeds!=="🫐💧"

  useEffect(()=>{
    if (didStop) {
      setPoints(prev=>prev+20)
    }
  }, [didStop])

  return (
    <>
      <GameEngine
        systems={[ Physics ]}
        style={styles.container}
        entities={entities()}
        running={didStop}
        onEvent={ e => {
          if (e.type === "used" && !droppeds.includes(e.box)) {
            setDroppeds(prev=>prev+e.box)
          }
        }}>
          {
            didStop?
              <>
                <Text style={styles.congrats}>{"Kuşunuzu Mutlu Ettiniz 😇"}</Text>
                <Text style={styles.pointText}>{"20 Puan Aldınız 🪙"}</Text>
              </>:
              <></>
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
  congrats:{
    position:"absolute",
    bottom: 40,
    fontSize: 20,
    width: Dimensions.get("window").width,
    textAlign:"center",
  },
  pointText:{
    position:"absolute",
    bottom: 20,
    fontSize: 15,
    width: Dimensions.get("window").width,
    textAlign:"center",
  }
});