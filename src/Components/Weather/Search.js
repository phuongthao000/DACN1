import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import EvilIcons from 'react-native-vector-icons/FontAwesome';

const Search = ({fetchWeatherData}) => {
  const [cityName, setCityName] = useState('');

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={{color: 'black'}}
        placeholder="Nhập tên hoặc mã Code"
        placeholderTextColor={'#BBBBBB'}
        value={cityName}
        onChangeText={text => setCityName(text)}
      />
      {/* <TextInput
        style={styles.textInputStyle}
        onChangeText={text => setCityName(text)}
        value={cityName}
        underlineColorAndroid="transparent"
        placeholder="Nhập tên hoặc mã Code"
        placeholderTextColor="#272822"
        textAlign="center"
      /> */}
      <EvilIcons
        name="search"
        size={28}
        color="#00FF66"
        onPress={() => fetchWeatherData(cityName)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginTop: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width * 0.95,
    borderWidth: 1,
    paddingVertical: '1%',
    borderRadius: 25,
    marginHorizontal: '1%',
    paddingHorizontal: '3%',
    // backgroundColor: 'lightgray',
    borderColor: '#00FF66',
  },
  //   textInputStyle: {
  //     height: 40,
  //     borderWidth: 1,
  //     paddingLeft: 20,
  //     margin: 5,
  //     borderColor: '#00FF66',
  //     // backgroundColor: '#FFFFFF',
  //     borderRadius: 25,
  //     color: '#000',
  //   },
});

export default Search;
