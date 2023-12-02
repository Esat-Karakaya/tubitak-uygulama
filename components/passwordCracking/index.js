import { SafeAreaView, StyleSheet } from 'react-native';
import Options from './components/options/options';
import { useState } from 'react';

export default function Game() {
  const [answer] = useState('karakte'.toUpperCase());

  return (
    <SafeAreaView style={styles.container}>
      <Options answer={answer} />
    </SafeAreaView>
  );
}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
