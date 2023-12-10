import { SafeAreaView, StyleSheet } from 'react-native';
import Entry from './entry/entry';
import { useState } from 'react';

export default function Game() {
  const [answer] = useState(getRandomKey(QUESTIONS));

  return (
    <SafeAreaView style={styles.container}>
      <Entry prompt={QUESTIONS[answer]} answer={answer.replace('i', 'İ').toUpperCase()} />
    </SafeAreaView>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

// Helpers
function getRandomKey(obj) {
  // Get all object keys as an array
  const keys = Object.keys(obj);

  // Generate a random index within the keys length
  const randomIndex = Math.floor(Math.random() * keys.length);

  // Return the random key
  return keys[randomIndex];
}

// Q&A
const QUESTIONS={
  kar: [ "Kış" , "⚪" ],
  ışık: [ "Yaymak" , "🕯️" ],
  bal: [ "Yapmak" , "🐝" ],
  uyku: [ "Yorgunluk" , "🛏️" ],
  rüya: [ "Görmek" , "😴" ],
  köpük: [ "Su" , "🧼" ],
  yağmur: [ "Islak" , "☂️" ],
  toka: [ "Saç" , "🪢" ],
  deniz: [ "Yüzmek" , "🐟" ],
  okumak: [ "Görmek" , "📖" ],
  müzik: [ "Duymak" , "🎶" ],
  resim: [ "Çizmek" , "🖊️" ],
  futbol: [ "Ayak" , "⚽" ],
  buz: [ "soğuk" , "💧" ],
  ceviz: [ "Kuru yemiş" , "🧠" ],
  gün: [ "24" , "⏰" ],
  gül: [ "Diken" , "🌼" ],
  muz: [ "Yemek" , "🐒" ],
  barınak: [ "Hayvan" , "🏡" ],
  çorap: [ "Giymek" , "🦶" ],
}