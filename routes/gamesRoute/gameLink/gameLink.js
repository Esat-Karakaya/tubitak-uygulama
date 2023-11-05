import { View, Text } from 'react-native';
import CustomButton from "../../../components/customButton/customButton"
import styles from "./styles"

export default function GameLink({ GameIcon, GameTitle, onPress }) {
  return (
    <View style={styles.linkContainer}>
      <CustomButton onPress={onPress}>{GameIcon}</CustomButton>
      <Text style={{fontSize:20}}>{GameTitle}</Text>
    </View>
  );
}