import Matter from 'matter-js';
import Player from './player';
import Maze from './maze';
import MazeCorridor from './mazeCorridor';
import generatedKeys from '../helpers/keyGenerator';
import { PLAYER_X, PLAYER_Y, PLAYER_R_X, PLAYER_R_Y, MAZE_LEFT, MAZE_POS, MAZE_WIDTH, MAZE_TOP, MAZE_HEIGHT } from '../constants';

export default () => {
  const engine = Matter.Engine.create();
  const { world } = engine;
  engine.gravity.y = 0;

  //The distance between the rendered and the simulated Player
  const relativity = {
    x: -((PLAYER_X - MAZE_LEFT) * 2 + (MAZE_POS.x - MAZE_WIDTH * 2 / 2) - PLAYER_R_X),
    y: -((PLAYER_Y- MAZE_TOP) * 2 + (MAZE_POS.y - MAZE_HEIGHT * 2 / 2) - PLAYER_R_Y),
    scale:8,
  };
  return {
    physics: { engine, world },
    relativity,
    Player: Player(world, relativity),
    Maze: Maze(world, relativity),
    MazeCorridor: MazeCorridor(world, relativity),
    ...generatedKeys(world, relativity),
  };
};
