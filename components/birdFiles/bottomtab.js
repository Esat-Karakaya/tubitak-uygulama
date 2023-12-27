import { View, } from 'react-native';

const BottomTab = () => {

  return (
    <View
      style={{
        borderBottomWidth:3,
        height:90,
        position:"absolute",
        top:55,
        left:0,
        right:0,
        backgroundColor:"aqua",
        zIndex:-2,
      }}
    />
  );
};

export default () => {
  return {
    renderer: <BottomTab />,
  };
};
