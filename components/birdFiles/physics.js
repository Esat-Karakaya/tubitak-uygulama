const draggableBox = (entity, entities, touch) => {
  const { body } = entity;
  const ParrotBody = entities.Parrot.body;
  const { pageX, pageY } = touch?.event ?? {};

  if (body.isPressed && pageX) {
    body.left = pageX - body.size / 2;
    body.top = pageY - body.size / 2;
  } else if (
    body.left > ParrotBody.left &&
    body.left + body.size < ParrotBody.left + ParrotBody.size &&
    body.top > ParrotBody.top &&
    body.top + body.size < ParrotBody.top + ParrotBody.size
  ) {
    entity.isDropped = true;
  } else {
    entity.body = JSON.parse(JSON.stringify(entity.initials));
  }

  if (
    body.left < pageX &&
    body.left + body.size > pageX &&
    body.top < pageY &&
    body.top + body.size > pageY
  ) {
    entity.body.isPressed = true;
  }
};

const Physics = (entities, { touches }) => {
  const touch = touches.at(-1);
  const { Water, Food } = entities;

  draggableBox(Water, entities, touch);
  draggableBox(Food, entities, touch);
  if (touch) {
    return entities;
  }
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