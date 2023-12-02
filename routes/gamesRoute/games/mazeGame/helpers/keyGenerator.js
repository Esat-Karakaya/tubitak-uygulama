import Key from '../entities/keys';
import { MAZE_POS, ROWS, COLUMNS, CELL_SIZE } from '../constants';

export default function generatedKeys(world, relativity) {
  const minX = MAZE_POS.x - ((COLUMNS - 1) * CELL_SIZE) / 2;
  const minY = MAZE_POS.y - ((ROWS - 1) * CELL_SIZE) / 2;
  const keyEntities = {
    Key1:Key(
      world,
      { x: minX+(COLUMNS-1)*CELL_SIZE, y: minY+(ROWS-1)*CELL_SIZE },
      relativity,
    ),
    Key2:Key(
      world,
      { x: minX, y: minY+(ROWS-1)*CELL_SIZE },
      relativity,
    ),
    Key3:Key(
      world,
      { x: minX+(COLUMNS-1)*CELL_SIZE, y: minY },
      relativity,
    ),
  };
  return keyEntities;
}
