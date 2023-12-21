import Box from './box';
import Parrot from "./parrot";
import BottomTab from './bottomtab';

export default () => {

  return {
    UpCount:0,
    Food: Box("🫐", [1,2]),
    Water: Box("💧",[2,2]),
    Parrot: Parrot(),
    BottomTab: BottomTab()
  };
};
