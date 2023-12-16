import Food from './food';
import Water from "./water";
import Parrot from "./parrot";
import BottomTab from './bottomtab';

export default () => {

  return {
    UpCount:0,
    Food: Food(),
    Water: Water(),
    Parrot: Parrot(),
    BottomTab: BottomTab()
  };
};
