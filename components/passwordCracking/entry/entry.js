import { useState, useMemo, useRef } from 'react';
import { View, Button, Text, TextInput, Pressable } from 'react-native';
import { useAtom, } from 'jotai';
import { PASSWORD_LS, gameData, updateStorage, gameStatistics, pointsAtom, setPointTo } from '../../../globals';
import Character from '../character/character';
import styles from './styles';

export default function Entry({ answer, prompt, mistakes, answerLower }) {
  const [ gameDataObj ] = useAtom(gameData);
  const [ falseAndTotal ]=useAtom(gameStatistics)
  const [ typedStr, setTypedStr ] = useState('');
  const [ pointsVal, setPoints ] = useAtom(pointsAtom)
  // State to track if the answer was revealed, a rejection or unsubmition
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
          <Text style={{fontSize:15}}>{`${gameDataObj.addPoint} Puan Aldınız 🪙`}</Text>
          <Button onPress={gameDataObj.get} title="Devam Et" />
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
                gameToAdd: answerLower,
              })
              setRevealState(true)
              setPointTo({
                value: pointsVal + gameDataObj.addPoint,
                updateAtomWith: setPoints
              })
              return;
            }

            // If rejected
            clearReAsk()
          }}
          title={typedStr === '' ? 'Cevabı Gör' : 'Kontrol Et'}
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
      <View style={styles.inputHider}/>
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
          height:250,
          left:0,
          right:0,
          color:"white",
        }}
      />

      {bottomElements()}
    </Pressable>
  );
}
