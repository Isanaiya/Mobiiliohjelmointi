import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [text, setText] = useState('Guess a number between 1-100');
  const [numberGuess, setNumberGuess] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [guessTarget, setGuessTarget] = useState(Math.floor(Math.random() * 100) + 1)

  const makeGuess = () => {
    setGuessCount(guessCount + 1);
    const guess = parseInt(numberGuess);

    if (guess == guessTarget) {
      Alert.alert('You guessed the correct number in ' + (guessCount) + ' guess(es)! The number will now be reset and you can try again.')

      setGuessCount(0)
      setGuessTarget(Math.floor(Math.random() * 100) + 1)
    } else if (guess < guessTarget) {
      setText('Your guess of ' + (guess) + ' was too low.')
    } else {
      setText('Your guess of ' + (guess) + ' was too high.')
    }
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={numberGuess => setNumberGuess(numberGuess)} 
        value={numberGuess}
        inputMode='decimal'
        />
        <View style={styles.button}>
          <Button onPress={makeGuess} title="Make a guess"/>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input : {
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
    padding: 2,
    textAlign: 'center'
  },
  button : {
    width: '15%',
    paddingVertical: 5
  }
});
