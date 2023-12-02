import { View, Button, Text, TextInput } from 'react-native';
import { useState, useMemo, useRef } from 'react';
import OptionButton from '../optionButton/optionButton';
import styles from './styles';

export default function Options({ answer }) {
  const [typedStr, setTypedStr] = useState('');
  const [isQuestionShown, setIsQuestionShown] = useState(null); // true when given the correct answer
  const inputRef=useRef(null)
  const characters = useMemo(
    () =>
      Array(answer.length)
        .fill(null)
        .map((_, i) => (
          <OptionButton
            key={i}
            isTyped={typedStr[i] || isQuestionShown}
            reveal={isQuestionShown}>
            {typedStr !== answer && isQuestionShown
              ? answer[i]
              : typedStr[i] ?? '*'}
          </OptionButton>
        )),
    [isQuestionShown, typedStr, answer]
  );
  const clearReAsk = () => {
    setIsQuestionShown(false);
    inputRef.current.clear()
    setTypedStr("")
  };

  const bottomElements = () => {
    if (isQuestionShown) {
      return (
        <>
          <Text style={{ fontSize: 20 }}>
            {typedStr === answer ? 'Tebrikler 🥳' : 'Çalıştıkça Gelişir 😉'}
          </Text>
          <Button title="Devam Et" />
        </>
      );
    }

    return (
      <>
        {isQuestionShown === null ? null : (
          <Text style={{ fontSize: 15 }}>
            {'Hatalı Şifre Yeniden Deneyiniz 🕵️'}
          </Text>
        )}
        {
          <Button
            onPress={() =>
              typedStr === ''
                ? setIsQuestionShown(true)
                : answer === typedStr
                ? setIsQuestionShown(true)
                : clearReAsk()
            }
            title={typedStr === '' ? 'Cevabı Gör' : 'Kontrol Et'}
            disabled={0 < typedStr.length && typedStr.length < answer.length}
          />
        }
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginVertical: 20 }}>
        {'Şifreyi Giriniz'}
      </Text>
      <View style={styles.innerContainer}>{characters}</View>
      <TextInput
        ref={inputRef}
        onChangeText={(str) =>{
          setTypedStr(str.replaceAll('i', 'İ').toUpperCase())
        }}
        contextMenuHidden={true}
        autoFocus={true}
        maxLength={answer.length}
        editable={!isQuestionShown}
        autoComplete={"off"}
        autoCorrect={false}
        style={{
          position: 'absolute',
          top: -350,
        }}
      />

      {bottomElements()}
    </View>
  );
}
