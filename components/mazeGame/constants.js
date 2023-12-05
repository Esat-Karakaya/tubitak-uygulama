import { Dimensions } from 'react-native';

//Shrinking
const SHRINKED=1.5

//Maze Options
const MAZE_POS = {
  x: Dimensions.get('window').width / 2,
  y: Dimensions.get('window').height / 2,
};
const [ROWS, COLUMNS, THICKNESS, CELL_SIZE] = [5, 5, 4, 30];
const MAZE_WIDTH = COLUMNS * CELL_SIZE;
const MAZE_HEIGHT = ROWS * CELL_SIZE;
const MAZE_TOP = MAZE_POS.y - MAZE_HEIGHT / 2;
const MAZE_LEFT = MAZE_POS.x - MAZE_WIDTH / 2;

//Player Options
const PLAYER_SIZE = CELL_SIZE / 2;
const PLAYER_X = MAZE_LEFT + CELL_SIZE / 2;
const PLAYER_Y = MAZE_TOP + CELL_SIZE / 2;
const PLAYER_R_X = Dimensions.get('window').width / 2;
const PLAYER_R_Y = Dimensions.get('window').height / 2;

//Key Options
const KEY_SIZE = CELL_SIZE / 2;

export {
  MAZE_POS,
  ROWS,
  COLUMNS,
  THICKNESS,
  CELL_SIZE,
  MAZE_WIDTH,
  MAZE_HEIGHT,
  PLAYER_SIZE,
  PLAYER_X,
  PLAYER_Y,
  PLAYER_R_X,
  PLAYER_R_Y,
  KEY_SIZE,
  MAZE_TOP,
  MAZE_LEFT,
  SHRINKED,
};
