import { useState, memo } from 'react';
import { StyleSheet, StatusBar, View, Text, Button } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import {nextGame} from "../../../../jotai"
import { useAtom } from 'jotai';

export default MazeGame=memo(()=>{
  const [running] = useState(true);
  const [collectedKeys, setCollectedKeys] = useState(0);
  const [nextGameObj]=useAtom(nextGame)

  return (
    <>
      <View style={styles.topBar}>
        <Text style={styles.text}>{`Anahtarlar: ${collectedKeys}/3`}</Text>
        {collectedKeys===3?<Button onPress={nextGameObj.get} title='Devam Et'/>:null}
      </View>
      <GameEngine
        systems={[Physics]}
        style={styles.container}
        entities={entities()}
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
