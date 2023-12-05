import Matter from 'matter-js';
import {
  PLAYER_R_X,
  PLAYER_R_Y,
  MAZE_LEFT,
  MAZE_WIDTH,
  MAZE_POS,
  MAZE_TOP,
  MAZE_HEIGHT,
  SHRINKED,
} from './constants';

const UpdateRenderer = (entities) => {
  const { Player } = entities;
  const { scale } = entities.relativity;

  entities.relativity.x = -(
    (Player.body.position.x - MAZE_LEFT) * scale +
    (MAZE_POS.x - (MAZE_WIDTH * scale) / 2) -
    PLAYER_R_X
  );
  entities.relativity.y = -(
    (Player.body.position.y - MAZE_TOP) * scale +
    (MAZE_POS.y - (MAZE_HEIGHT * scale) / 2) -
    PLAYER_R_Y
  );
};

const deleteKeyOnTouch=(KeyI, PlayerBody, entities, dispatch)=>{
  if(entities["Key"+KeyI].body&&Matter.Collision.collides(PlayerBody, entities["Key"+KeyI].body)){
    Matter.Composite.remove(entities.physics.world,entities["Key"+KeyI].body)
    dispatch({type:"NewKey"})
    entities["Key"+KeyI]={}
  }
}

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  const touch = touches.at(-1);

  if (touch) {
    let PlayerBody = entities.Player.body;

    //Rotates To Touched
    const mouse = Math.atan2(
      +touch.event.pageX - PLAYER_R_X,
      -touch.event.pageY + PLAYER_R_Y
    );
    Matter.Body.setAngle(PlayerBody, mouse);

    //Velocity
    let speed = 1;
    
    if (entities.relativity.scale===SHRINKED) {
      speed = 2
    }
    const angle = PlayerBody.angle;

    const newVelocity = {
      x: speed * Math.cos(angle - Math.PI / 2),
      y: speed * Math.sin(angle - Math.PI / 2),
    };
    Matter.Body.setVelocity(PlayerBody, newVelocity);
    
    deleteKeyOnTouch(1, PlayerBody, entities, dispatch)
    deleteKeyOnTouch(2, PlayerBody, entities, dispatch)
    deleteKeyOnTouch(3, PlayerBody, entities, dispatch)
  }
  //Update
  UpdateRenderer(entities);
  Matter.Engine.update(engine, time.delta);
  return entities;
};
export default Physics;
