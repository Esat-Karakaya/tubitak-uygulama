const draggableBox = (entity, entities, touch, dispatch,) => {
  const { body } = entity;
  const ParrotBody = entities.Parrot.body;
  const { pageX, pageY } = touch?.event ?? {};
  if (body.fallUpdate) { // was the falling animation done
    body.fallUpdate=false
    dispatch({type:"used", box:entity.type})
    return
  }
  if (body.isPressed && pageX) { // if user is touching screen
    body.left = pageX - body.size / 2;
    body.top = pageY - body.size / 2;
  } else if ( // if inside the parrot image
    body.left > ParrotBody.left &&
    body.left + body.size < ParrotBody.left + ParrotBody.size &&
    body.top > ParrotBody.top &&
    body.top + body.size < ParrotBody.top + ParrotBody.size
  ) {
    entity.isDropped = true;
  } else { // if box is released
    entity.body = JSON.parse(JSON.stringify(entity.initials));
  }

  if ( // if user is touching box
    body.left < pageX &&
    body.left + body.size > pageX &&
    body.top < pageY &&
    body.top + body.size > pageY
  ) {
    entity.body.isPressed = true;
  }
};

const Physics = (entities, { touches, dispatch }) => {
  const touch = touches.at(-1);
  const { Water, Food } = entities;
  draggableBox(Water, entities, touch, dispatch);
  draggableBox(Food, entities, touch, dispatch);

  if (touch) { return entities; }
  entities.UpCount++;
  if (entities.UpCount > 20) {
    entities.UpCount = 0;
    Food.body.isPressed = false;
    Water.body.isPressed = false;
  }

  //Update
  return entities;
};
export default Physics;