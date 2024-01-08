import { Image, Dimensions } from 'react-native';
import BigImg from "../../assets/parrot.jpg";
import MidImg from "../../assets/baby-parrot.jpg";
import TinyImg from "../../assets/really-baby-parrot.jpg";
import { useAtom } from 'jotai';
import { pointsAtom } from '../../globals';

const Parrot = ({ body }) => {
  const { size, top, left } = body
  const [ totalPoints ] = useAtom(pointsAtom)

  function pickImage(val) {
    if ( val < 200 ) return TinyImg
    if ( val < 300 ) return MidImg
    return BigImg
  }

  return (
    <Image
      style={{
        width:300,
        height:300,
        left,
        top,
        borderRadius:20,
        position: 'absolute',
        zIndex:-1,
      }}
      source={pickImage(totalPoints)}
    />
  );
};

export default () => {
  const size = Dimensions.get('window').width * 3 / 4

  return {
    body: {
      size,
      left: Dimensions.get('window').width / 2 - size/2,
      top: Dimensions.get("screen").height/3,
    },
    renderer: <Parrot />,
  };
};
