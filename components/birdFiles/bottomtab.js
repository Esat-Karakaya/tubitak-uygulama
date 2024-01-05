import { Dimensions, View, } from 'react-native';

const BottomTab = () => {
  const width = Dimensions.get("window").width*3/4;
  const left = Dimensions.get('window').width / 2 - width/2

  return (
    <View
      style={{
        borderRadius:15,
        borderWidth:3,
        height:110,
        position:"absolute",
        top:140,
        right:0,
        backgroundColor:"aqua",
        zIndex:-1,
        width,
        left,
      }}
    />
  );
};

export default () => {
  return {
    renderer: <BottomTab />,
  };
};
