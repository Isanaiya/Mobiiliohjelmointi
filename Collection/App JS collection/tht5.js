import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CalculatorScreen({ navigation }){

  const [num1, setNum1] = useState('0');
  const [num2, setNum2] = useState('0');
  const [result, setResult] = useState('');
  const [historyData, setHistoryData] = useState([]);

  const addsum = () => {
    const value1 = parseInt(num1);
    const value2 = parseInt(num2);
    setNum1('')
    setNum2('')
    setResult((value1 + value2).toString());
    const datatext = `${value1} + ${value2} = ${value1 + value2}`;
    setHistoryData([...historyData, { key: datatext}]);
  }

  const subtractsum = () => {
    const value1 = parseInt(num1);
    const value2= parseInt(num2);
    setNum1('')
    setNum2('')
    setResult((value1 - value2).toString());
    const datatext = `${value1} - ${value2} = ${value1 - value2}`;
    setHistoryData([...historyData, { key: datatext}]);
  }
  
  const clearHistory = () => {
    setHistoryData([])
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={num1 => setNum1(num1)} 
        value={num1}
        inputMode='decimal'
        />
      <TextInput
        style={styles.input}
        onChangeText={num2 => setNum2(num2)}
        value={num2}
        inputMode='decimal'
        />
        <View style={styles.button}>
          <Button onPress={addsum} title="+"/>
          <Button onPress={subtractsum} title="-"/>
          <Button title="History" onPress={() => navigation.navigate('History', {historyData})}/>
          <Button onPress={clearHistory} title="CLEAR"/>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

function HistoryScreen({ route, navigation }) {
  const {historyData} = route.params;

  return (
    <View style={styles.container}>
        <Text>History screen</Text>
        <FlatList 
          style={styles.list}
          data={historyData}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>
          }
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text>No History</Text>}
        />
      <StatusBar style="auto"/>
    </View>
    );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});