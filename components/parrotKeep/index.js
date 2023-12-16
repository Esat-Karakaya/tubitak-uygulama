import { useState } from 'react';
import { StyleSheet,} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function ParrotKeep() {
  return (
    <GameEngine
      systems={[Physics]}
      style={styles.container}
      entities={entities()}/>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
});
