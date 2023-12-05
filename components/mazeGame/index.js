import entities from './entities';
import Physics from './physics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, memo, } from 'react';
import { StyleSheet, StatusBar, View, Text, Button, } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { gameMistakes, gameStatistics, nextGame, virtualMaze } from "../../jotai"
import { useAtom } from 'jotai';
import { SHRINKED } from './constants';

export default MazeGame=memo(()=>{
  const [running] = useState(true);
  const [collectedKeys, setCollectedKeys] = useState(0);
  const [entitiesVal, setEntities]= useState(entities())
  const [nextGameObj]=useAtom(nextGame)
  const [falseAndTotal]=useAtom(gameStatistics)
  const [mistakes]=useAtom(gameMistakes)
  const [virtualMazeAtom]=useAtom(virtualMaze)

  const beforeLeaving=()=>{
    if (mistakes.length>4) { //If the question was a prev fail
      mistakes.shift()
    }
    if (entitiesVal.relativity.scale===SHRINKED) { //If maze was revealed add to mistakes
      mistakes.push(virtualMazeAtom)
      falseAndTotal.mazeGame[0]++ //Incrementing the incorrection number in DB
    }
    falseAndTotal.mazeGame[1]++ //Incrementing the playing number in DB

    const storageSets=[
      ["mazeGameMistakes", JSON.stringify(mistakes)],
      ["falseAndTotal", JSON.stringify(falseAndTotal)]
    ]

    AsyncStorage.multiSet(storageSets)
  }

  return (
    <>
      <View style={styles.topBar}>
        <Text style={styles.text}>{`Anahtarlar: ${collectedKeys}/3`}</Text>
        {collectedKeys===3?
          <Button onPress={()=>{
            beforeLeaving()
            nextGameObj.get()}
          } title='Devam Et'/>:

          <Button disabled={entitiesVal.relativity.scale===SHRINKED}
          onPress={()=>{
            setEntities(state=>{
              state.relativity.scale=SHRINKED
              return state
            })
          }}
          title='Küçült'/>
        }
      </View>
      <GameEngine
        systems={[Physics]}
        style={styles.container}
        entities={entitiesVal}
        running={running}
        onEvent={(e) => {
          if (e.type === 'NewKey') {
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
