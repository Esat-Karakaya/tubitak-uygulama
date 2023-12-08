import entities from './entities';
import Physics from './physics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, memo, useEffect, } from 'react';
import { StyleSheet, StatusBar, View, Text, Button, } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { MAZE_LS, STATISTICS_LS, gameMistakes, gameStatistics, nextGame, virtualMaze } from "../../globals"
import { useAtom } from 'jotai';

export default MazeGame=memo(()=>{
  const COUNT_FROM=20
  const [running, setRunning] = useState(true);
  const [collectedKeys, setCollectedKeys] = useState(0);
  const [entitiesVal,]= useState(entities())
  const [timeLeft, setTimeLeft] = useState(COUNT_FROM)
  const [nextGameObj]=useAtom(nextGame)
  const [falseAndTotal]=useAtom(gameStatistics)
  const [mistakes]=useAtom(gameMistakes)
  const [virtualMazeAtom]=useAtom(virtualMaze)

  const updateStorage=(isSuccessful)=>{
    if (mistakes.length>4) { //If the question was a prev fail
      mistakes.shift()
    }
    if (!isSuccessful) { //If maze was revealed add to mistakes
      mistakes.push(virtualMazeAtom)
      falseAndTotal.mazeGame[0]++ //Incrementing the incorrection number in DB
    }
    falseAndTotal.mazeGame[1]++ //Incrementing the playing number in DB

    const storageSets=[
      [MAZE_LS, JSON.stringify(mistakes)],
      [STATISTICS_LS, JSON.stringify(falseAndTotal)]
    ]

    AsyncStorage.multiSet(storageSets)
  }

  useEffect(()=>{
    function everySecondFor(x, callback) {
      let intervalId = setInterval(() => {
        callback()
      }, 1000);
    
      setTimeout(() => clearInterval(intervalId), x * 1000);
    }

    everySecondFor(COUNT_FROM, ()=>setTimeLeft((t)=>t-1))
  },[])

  return (
    <>
      <View style={styles.topBar}>
        <Text style={styles.text}>{`Anahtarlar: ${collectedKeys}/3`}</Text>
        <Text>{`Kalan Süreniz: ${timeLeft}`}</Text>
        {collectedKeys===3?
          <Button onPress={nextGameObj.get} title='Devam Et'/> :
          null
        }
      </View>
      <GameEngine
        systems={[Physics]}
        style={styles.container}
        entities={entitiesVal}
        running={running}
        onEvent={(e) => {
          if (e.type === 'NewKey') {
            if (collectedKeys===2) {
              setRunning(false)
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
    fontSize: 20,
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