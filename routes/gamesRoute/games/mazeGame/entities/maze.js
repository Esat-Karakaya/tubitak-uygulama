import Matter from 'matter-js';
import { View } from 'react-native';
import {
  MAZE_POS,
  MAZE_HEIGHT,
  MAZE_WIDTH,
  THICKNESS,
} from '../constants';

const Maze = ({ relativity }) => {
  const rWidth = MAZE_WIDTH * relativity.scale + relativity.scale*THICKNESS;
  const xBody = (MAZE_POS.x - rWidth/2)
  const rHeight = MAZE_HEIGHT * relativity.scale + relativity.scale*THICKNESS;
  const yBody = (MAZE_POS.y - rHeight/2)

  return (
    <View
      style={{
        width: rWidth ,
        height: rHeight ,
        left: xBody + relativity.x,
        top: yBody + relativity.y,
        borderWidth: THICKNESS * relativity.scale,
        position: 'absolute',
      }}
    />
  );
};

export default (world, relativity) => {
  //Maze Boundries

  const top = Matter.Bodies.rectangle(
    MAZE_POS.x,
    MAZE_POS.y - MAZE_HEIGHT / 2,
    MAZE_WIDTH,
    THICKNESS,
    { isStatic: true }
  );
  const right = Matter.Bodies.rectangle(
    MAZE_POS.x + MAZE_WIDTH / 2,
    MAZE_POS.y,
    THICKNESS,
    MAZE_HEIGHT,
    { isStatic: true }
  );
  const bottom = Matter.Bodies.rectangle(
    MAZE_POS.x,
    MAZE_POS.y + MAZE_HEIGHT / 2,
    MAZE_WIDTH,
    THICKNESS,
    { isStatic: true }
  );
  const left = Matter.Bodies.rectangle(
    MAZE_POS.x - MAZE_WIDTH / 2,
    MAZE_POS.y,
    THICKNESS,
    MAZE_HEIGHT,
    { isStatic: true }
  );

  const initialMaze = Matter.Composite.create({
    bodies: [top, right, bottom, left],
  });

  Matter.World.add(world, initialMaze);

  return {
    composite: initialMaze,
    relativity,
    renderer: <Maze />,
  };
};
