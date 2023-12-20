import { Image, Dimensions } from 'react-native';
import Img from "../assets/mature-parrot.png";

const Parrot = ({ body, }) => {
  const {left, top, size} = body

  return (
    <Image
      style={{
        justifyContent:'center',
        alignItems:'center',
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
  const size=Dimensions.get('window').width * 3 / 4;
  const left=Dimensions.get('window').width / 2 - size/2;
  const top=Dimensions.get('window').height / 3 - size/2;

  return {
    body: { top, left, size, },
    initials : { top, left, size, },
    renderer: <Parrot />,
  };
};
