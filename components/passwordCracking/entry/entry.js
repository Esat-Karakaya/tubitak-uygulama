import { useState, useMemo, useRef } from 'react';
import { View, Button, Text, TextInput, Pressable } from 'react-native';
import { useAtom } from 'jotai';
import { PASSWORD_LS, nextGame, updateStorage, gameStatistics } from '../../../globals';
import Character from '../character/character';
import styles from './styles';

export default function Entry({ answer, prompt, mistakes }) {
  // Atom hook for to select the next game
  const [ nextGameObj ] = useAtom(nextGame);
  const [ falseAndTotal ]=useAtom(gameStatistics)
  const [ typedStr, setTypedStr ] = useState('');
  // State to track if the answer was revealed, a guess was rejected or unsubmition
  const [ revealState, setRevealState ] = useState(null);
  const inputRef = useRef(null);

  // Generate an array of Character components based on the answer
  const characters = useMemo(
    () =>
      answer.split('').map((character, i) => (
        <Character
          key={i}
          isTyped={typedStr[i] || revealState}
          reveal={revealState}>
          {typedStr !== answer && revealState
            ? character
            : typedStr[i] ?? '*'}
        </Character>
      )),
    [revealState, typedStr, answer]
  );

  // Function to clear and re-ask the question
  const clearReAsk = () => {
    setRevealState(false);
    inputRef.current.clear();
    setTypedStr('');
  };

  // JSX for bottom elements (feedback and buttons)
  const bottomElements = () => {
    if (revealState) {
      return (
        <>
          <Text style={{ fontSize: 20 }}>
            {typedStr === answer ? 'Tebrikler 🥳' : 'Çalıştıkça Gelişir 😉'}
          </Text>
          <Button onPress={nextGameObj.get} title="Devam Et" />
        </>
      );
    }

    return (
      <>
        {
          revealState === false ? 
            <Text style={{ fontSize: 15 }}>
              {'Hatalı Şifre Yeniden Deneyiniz 🕵️'}
            </Text>:
            null
        }
        <Button
          onPress={() =>{
            //If player gave up or won
            if (typedStr === '' || answer === typedStr) {
              updateStorage({ // updating storage
                isSuccessful: answer === typedStr,
                mistakes,
                statistics: falseAndTotal,
                gameKey: PASSWORD_LS,
                gameName: "passwordCracking",
                gameToAdd: answer,
              })
              setRevealState(true)
              return;
            }

            // If rejected
            clearReAsk()
          }}
          title={typedStr === '' ? 'Cevabı Gör' : 'Kontrol Et'}
          disabled={0 < typedStr.length && typedStr.length < answer.length}
        />
      </>
    );
  };

  // JSX for the whole component
  return (
    <Pressable onPress={()=>{inputRef.current.focus();}} style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{ prompt[0] }</Text>
      <Text style={{ fontSize: 60 }}>{ prompt[1] }</Text>
      <View style={styles.innerContainer}>{characters}</View>
      <TextInput
        ref={inputRef}
        onChangeText={(str) => {
          setTypedStr(str.replaceAll('i', 'İ').toUpperCase());
        }}
        contextMenuHidden={true}
        autoFocus={true}
        maxLength={answer.length}
        editable={!revealState}
        autoComplete={'off'}
        autoCorrect={false}
        style={{
          position: 'absolute',
          top: 0,
          bottom:0,
          left:0,
          right:0,
          opacity:0,
        }}
      />

      {bottomElements()}
    </Pressable>
  );
}
