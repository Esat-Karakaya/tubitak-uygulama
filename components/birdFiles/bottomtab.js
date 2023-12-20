import { View, } from 'react-native';

const BottomTab = () => {

  return (
    <View
      style={{
        borderTopWidth:3,
        height:100,
        position:"absolute",
        bottom:0,
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
