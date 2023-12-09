import { SafeAreaView, StyleSheet } from 'react-native';
import Entry from './entry/entry';
import { useState } from 'react';

export default function Game() {
  const [answer] = useState('barınak'.toUpperCase());

  return (
    <SafeAreaView style={styles.container}>
      <Entry answer={answer} />
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
