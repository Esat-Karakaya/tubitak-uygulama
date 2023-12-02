import { View } from 'react-native';
import {
  KEY_SIZE,
  MAZE_TOP,
  MAZE_LEFT,
  MAZE_POS,
  MAZE_HEIGHT,
  MAZE_WIDTH,
} from '../constants';
import Matter from 'matter-js';

const Key = ({ body, relativity }) => {
  const { scale } = relativity;
  const { x, y } = body.position;
  const xBody =
    (x - MAZE_LEFT) * scale +
    (MAZE_POS.x - (MAZE_WIDTH * scale) / 2) -
    (KEY_SIZE * scale) / 2;
  const yBody =
    (y - MAZE_TOP) * scale +
    (MAZE_POS.y - (MAZE_HEIGHT * scale) / 2) -
    (KEY_SIZE * scale) / 2;
  const rotate = `${(body.angle * 180) / Math.PI}deg`;

  return (
    <View
      style={{
        width: KEY_SIZE * scale,
        aspectRatio: 1,
        left: xBody + relativity.x,
        top: yBody + relativity.y,
        borderRadius: (KEY_SIZE * scale) / 4,
        position: 'absolute',
        backgroundColor: '#f7df07',
        transform: [{ rotate: rotate }],
      }}
    />
  );
};

export default (world, pos, relativity) => {
  const initialKey = Matter.Bodies.rectangle(pos.x, pos.y, KEY_SIZE, KEY_SIZE);
  Matter.World.add(world, initialKey);
  return {
    body: initialKey,
    relativity,
    renderer: <Key />,
  };
};
