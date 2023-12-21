import { Pressable, Text, Dimensions } from 'react-native';

const Box = ({ body, type }) => {
  const {left} = body
  const {top} = body
  const width = body.size;

  return (
    <Pressable
      onPressIn={()=>body.isPressed=true}
      style={{
        justifyContent:'center',
        alignItems:'center',
        width,
        aspectRatio:1,
        left,
        top,
        borderWidth: 3,
        position: 'absolute',
        backgroundColor:'white',
    }}>
      <Text 
      style={{
        fontSize:width * 0.6,
      }}>
        {type}
      </Text>
    </Pressable>
  );
};

export default (type, arr) => {
  const size=70;
  const left=Dimensions.get('window').width*arr[0]/(arr[1]+1) - size/2;
  const top=Dimensions.get('window').height - size/2 -50;

  return {
    body: { top, left, size, isPressed:false, },
    initials : { top, left, size, },
    type,
    renderer: <Box />,
  };
};