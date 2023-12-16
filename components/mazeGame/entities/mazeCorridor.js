import { View } from 'react-native';
import Matter from 'matter-js';
import packedWalls from '../helpers/wallPacker';
import mazeStructure from '../helpers/mazeGenerator';
import { useMemo, memo } from 'react';
import { MAZE_TOP, MAZE_LEFT, MAZE_POS, MAZE_WIDTH, MAZE_HEIGHT } from '../constants';
import { useAtom, useSetAtom } from 'jotai';
import { gameMistakes, virtualMaze } from '../../../globals';

const Corridors = memo(({ composite, relativity }) => {
  const concreteWalls = useMemo(ViewGenerate, [relativity.scale]);

  function ViewGenerate() {
    return composite.bodies.map((body, i) => {
      const { vertices } = body;
      const width = Matter.Vector.magnitude(
        Matter.Vector.sub(vertices[0], vertices[1])
      ); // width
      const height = Matter.Vector.magnitude(
        Matter.Vector.sub(vertices[1], vertices[2])
      ); // height
      const { scale } = relativity;
      const { x, y } = body.position;
      const xBody =(x - MAZE_LEFT) * scale + (MAZE_POS.x - MAZE_WIDTH*scale / 2) - width * scale/2
      const yBody =(y - MAZE_TOP) * scale + (MAZE_POS.y - MAZE_HEIGHT*scale / 2) - height * scale/2

      return (
        <View
          key={i}
          style={{
            width: width * scale,
            height: height * scale,
            backgroundColor: 'black',
            left: xBody,
            top: yBody,
            position: 'absolute',
          }}
        />
      );
    });
  }

  return <>{concreteWalls}</>;
})

const CorridorContainer = (props) => {
  return (
    <View
      style={{
        transform: [
          { translateX: props.relativity.x },
          { translateY: props.relativity.y },
        ],
      }}>
      <Corridors {...props} />
    </View>
  );
};

export default (world, relativity) => {
  const [mistakes]=useAtom(gameMistakes)
  const setVirtualMaze=useSetAtom(virtualMaze)

  const wallPhysics = useMemo(()=>{
    if (mistakes.length>4) {
      setVirtualMaze(generated)
      return packedWalls(mistakes[0])
    }
    const generated=mazeStructure()
    setVirtualMaze(generated)
    return packedWalls(generated)
  },[]);
  Matter.World.add(world, wallPhysics);

  return {
    composite: wallPhysics,
    relativity,
    renderer: <CorridorContainer />,
  };
};
