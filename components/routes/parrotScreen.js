import { useState } from 'react';
import { Dimensions, StyleSheet,} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../birdFiles/entities';
import Physics from '../birdFiles/physics';

export default function App() {
  const [collectNum, setCollectNum] = useState(0)
  return (
    <>
      <GameEngine
        systems={[Physics]}
        style={styles.container}
        entities={entities()}
        running={collectNum!==2}
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
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height,
  },
});