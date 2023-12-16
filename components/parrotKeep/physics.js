const draggableBox=(entity, entities, touch)=>{
  const {body} = entity;
  const ParrotBody = entities.Parrot.body
  if (entity.body.isPressed) {
    if(touch?.event?.pageX){
      body.left=touch.event.pageX-body.size/2
      body.top=touch.event.pageY-body.size/2
    }
  }else if(
    body.left > ParrotBody.left &&
    body.left + body.size < ParrotBody.left + ParrotBody.size &&
    body.top > ParrotBody.top &&
    body.top + body.size < ParrotBody.top + ParrotBody.size
  ){
    entity.renderer=<></>
  }else{
    entity.body=JSON.parse(JSON.stringify(entity.initials))
  }
}

const Physics = (entities, { touches, }) => {
  const touch = touches.at(-1);
  const {Water, Food}=entities
  draggableBox(Water, entities, touch)
  draggableBox(Food, entities, touch)
  if(!touch){
    entities.UpCount++
    if(entities.UpCount>30){
      entities.UpCount=0
      Food.body.isPressed=false
      Water.body.isPressed=false
    }
  }
  //Update
  return entities;
};
export default Physics;
