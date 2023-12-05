import Matter from 'matter-js';
import { View } from 'react-native';
import {
  PLAYER_X,
  PLAYER_Y,
  PLAYER_R_X,
  PLAYER_R_Y,
  PLAYER_SIZE,
} from '../constants';

const Player = ({ body, relativity }) => {
  const xBody = PLAYER_R_X - (PLAYER_SIZE * relativity.scale) / 2;
  const yBody = PLAYER_R_Y - (PLAYER_SIZE * relativity.scale) / 2;
  const rotate = `${(body.angle * 180) / Math.PI}deg`;
  const eyesCss = {
    width: (PLAYER_SIZE * relativity.scale) / 15,
    height: (PLAYER_SIZE * relativity.scale) / 6,
    backgroundColor: 'black',
    borderRadius: (PLAYER_SIZE * relativity.scale) / 15,
  };

  const renderSize = PLAYER_SIZE * relativity.scale;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: renderSize*1/5,
        padding: renderSize/20,
        width: renderSize,
        aspectRatio: 1,
        left: xBody,
        top: yBody,
        borderWidth: renderSize / 15,
        transform: [{ rotate: rotate }],
        borderRadius: renderSize / 4,
        position: 'absolute',
        borderColor: 'blue',
      }}>
      <View style={eyesCss} />
      <View style={eyesCss} />
    </View>
  );
};

export default (world, relativity) => {
  const initialPlayer = Matter.Bodies.rectangle(
    PLAYER_X,
    PLAYER_Y,
    PLAYER_SIZE,
    PLAYER_SIZE,
    {
      label: 'Player',
      angle: Math.PI / 2,
      frictionAir: 0.1,
    }
  );
  Matter.World.add(world, initialPlayer);

  return {
    body: initialPlayer,
    relativity,
    renderer: <Player />,
  };
};
