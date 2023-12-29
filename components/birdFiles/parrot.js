import { Image, Dimensions } from 'react-native';
import Img from "../../assets/parrot.jpg";

const Parrot = ({ body }) => {
  const { size, top, left } = body
  
  return (
    <Image
      style={{
        width:size,
        height:size,
        left,
        top,
        borderRadius:20,
        position: 'absolute',
        zIndex:-1,
      }}
      source={Img}
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
