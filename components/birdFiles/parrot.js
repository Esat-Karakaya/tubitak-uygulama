import { Image, Dimensions } from 'react-native';
import Img from "../../assets/parrot.jpg";

const Parrot = () => {
  const size = Dimensions.get('window').width * 3 / 4
  return (
    <Image
      style={{
        width:size,
        height:size,
        left: Dimensions.get('window').width / 2 - size/2,
        top: Dimensions.get("screen").height/3,
        borderRadius:20,
        position: 'absolute',
        zIndex:-1,
      }}
      source={Img}
    />
  );
};

export default () => {

  return {
    renderer: <Parrot />,
  };
};
