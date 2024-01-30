import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [historyData, setHistoryData] = useState([]);

  const add = () => {
    setHistoryData([...historyData, { key: text }])
  }

  const clearHistory = () => {
    setHistoryData([])
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        onChangeText={text => setText(text)} 
        value={text}
        inputMode='text'
        />
        <View style={styles.button}>
          <Button onPress={add} title="ADD"/>
          <Button onPress={clearHistory} title="CLEAR"/>
        </View>
        <FlatList 
          style={styles.list}
          data={historyData}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>
          }
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<Text style={styles.header}>Shopping List:</Text>}
          ListEmptyComponent={<Text style={styles.empty}>Empty</Text>}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '25%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input : {
    width: 300,
    borderColor: 'black',
    borderWidth: 1,
    padding: 2,
    textAlign: 'center'
  },
  button : {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  header : {
    color: 'blue',
    fontSize: 25,
    padding: 2,
    borderBottomWidth: 1
  },
  empty : {
    fontSize: 15,
    padding: 2
  }
});
