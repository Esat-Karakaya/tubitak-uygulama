import Matter from 'matter-js';
import { MAZE_TOP, MAZE_LEFT, THICKNESS, CELL_SIZE } from '../constants';

export default function packedWalls(virtualWalls) {
  const newWallAt = (x, y, w, h) =>
    Matter.Bodies.rectangle(x, y, w, h, { isStatic: true }); //create

  const [horizontals, verticals] = virtualWalls;
  const detachedWalls = [];

  horizontals.forEach((rowArr, rowI) => {
    rowArr.forEach((bool, columnI) => {
      if (!bool) {
        const placedToX = MAZE_LEFT + (columnI + 1) * CELL_SIZE - CELL_SIZE / 2;
        const placedToY = MAZE_TOP + (rowI + 1) * CELL_SIZE;
        const newPhysicalH = newWallAt(
          placedToX,
          placedToY,
          CELL_SIZE + THICKNESS,
          THICKNESS
        );
        detachedWalls.push(newPhysicalH);
      }
    });
  });

  verticals.forEach((rowArr, rowI) => {
    rowArr.forEach((bool, columnI) => {
      if (!bool) {
        const placedToX = MAZE_LEFT + (columnI + 1) * CELL_SIZE;
        const placedToY = MAZE_TOP + (rowI + 1) * CELL_SIZE - CELL_SIZE / 2;
        const newPhysicalV = newWallAt(
          placedToX,
          placedToY,
          THICKNESS,
          CELL_SIZE + THICKNESS
        );
        detachedWalls.push(newPhysicalV);
      }
    });
  });

  const wallPhysics = Matter.Composite.create({ bodies: detachedWalls });

  return wallPhysics;
}
