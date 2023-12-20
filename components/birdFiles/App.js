import { useState } from 'react';
import { StyleSheet,} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function App() {
  const [collectNum, setCollectNum] = useState(0)
  return (
    <>
      <GameEngine
        systems={[Physics]}
        style={styles.container}
        entities={entities()}
        running={collectNum===2}
        onEvent={ e => {
          if (e.type === "used") {
            setCollectNum(prev=>prev+1)
          }
        }}/>
    </>
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