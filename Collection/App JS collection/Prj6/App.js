import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [mealRequests, setMealRequests] = useState([]);
 
  const getMealRequests = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setMealRequests(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
          marginRight: "5%",
          marginLeft: "5%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{flex: 1}}>
        <TextInput 
          style={{fontSize: 18, width: 200}} 
          placeholder='Type keyword' 
          value={keyword}
          onChangeText={text => setKeyword(text)} 
        />
        <Button title="Find" onPress={getMealRequests} />
      </View>
      <View style={{flex: 6}}>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({item}) => 
            <View style={{margin: 5}}>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
              <Image source={{uri: item.strMealThumb}} style={{ width: 200, height: 200 }}/>
            </View>}
          data={mealRequests} 
          ItemSeparatorComponent={listSeparator} /> 
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});