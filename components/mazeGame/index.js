import entities from './entities';
import Physics from './physics';
import { useState, memo, useEffect, } from 'react';
import { StyleSheet, StatusBar, View, Text, Button, } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { MAZE_LS, gameMistakes, gameStatistics, nextGame, virtualMaze, updateStorage } from "../../globals"
import { useAtom } from 'jotai';
import CustomModal from "../simpleComponents/customModal"

export default MazeGame=memo(()=>{
  const COUNT_FROM=40
  const [running, setRunning] = useState(true);
  const [collectedKeys, setCollectedKeys] = useState(0);
  const [timeLeft, setTimeLeft] = useState(COUNT_FROM)
  const [modalVis, setModalVis] = useState(false)
  const [nextGameObj]=useAtom(nextGame)
  const [falseAndTotal]=useAtom(gameStatistics)
  const [mistakes]=useAtom(gameMistakes)
  const [virtualMazeVal]=useAtom(virtualMaze)

  function stopGame(){
    setRunning(false)

    updateStorage({
      isSuccessful: timeLeft!==0,
      mistakes,
      statistics: falseAndTotal,
      gameKey: MAZE_LS,
      gameName: "mazeGame",
      gameToAdd: virtualMazeVal,
    })

    setModalVis(true)
  }

  useEffect(()=>{// Count Down
    if (timeLeft===0) {// when game stops
      stopGame()
      return;
    }
    if (running) {
      setTimeout(()=>{
        setTimeLeft((t)=>t-1)
      }, 1000)
    }
  },[timeLeft, running])

  return (
    <>
      <View style={styles.topBar}>
        <Text style={styles.text}>{`Anahtarlar: ${collectedKeys}/3`}</Text>
        <Text style={styles.text}>{`Kalan Süreniz: ${timeLeft}`}</Text>
        {!running && !modalVis ? <Button onPress={nextGameObj.get} title='Devam Et'/> : null}
      </View>
      <CustomModal
        visible={modalVis}
        onClose={()=>setModalVis(false)}
        onContinue={nextGameObj.get}
        title={timeLeft===0?"Süre Yetişmedi ⏱️" : "Başardınız 🏆"}
        body={timeLeft===0?"Bir Dahakine 😇" : "Alkışı Hakettiniz 👏"}/>
      <GameEngine
        systems={[Physics]}
        style={styles.container}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          if (e.type === 'NewKey') {
            if (collectedKeys===2) {
              stopGame()
            }
            setCollectedKeys((current) => current + 1);
          }
        }}>
        <StatusBar hidden={true} />
      </GameEngine>
    </>
  );
})

const styles = StyleSheet.create({
  topBar: {
    zIndex: 1,
    backgroundColor: 'aqua',
    borderBottomWidth: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
});