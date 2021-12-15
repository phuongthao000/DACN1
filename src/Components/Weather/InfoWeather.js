/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Search from './Search';

const InfoWeather = ({weatherData, fetchWeatherData}) => {
  const {
    weather,
    visibility,
    weather: [{description, icon}],
    name,
    main: {temp, humidity, feels_like},
    wind: {speed},
    sys: {sunrise, sunset},
  } = weatherData;
  const [{main}] = weather;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <Search fetchWeatherData={fetchWeatherData} />
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{name}</Text>
        </View>

        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>{temp} °C</Text>
        </View>
        <Text style={styles.currentDescription}>{description}</Text>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../../assets/temp.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
              {feels_like} °C
            </Text>
            <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
              Cảm giác
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../../assets/humidity.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
              {humidity}%
            </Text>
            <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
              Độ ẩm
            </Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../../assets/visibility.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
              {visibility}
            </Text>
            <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
              Tầm nhìn
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../../assets/windspeed.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
              {speed} m/s
            </Text>
            <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
              Gió
            </Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../../assets/sunrise.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
              {new Date(sunrise * 1000).toLocaleString()}
            </Text>
            <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
              Bình minh
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../../assets/sunset.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
              {new Date(sunset * 1000).toLocaleString()}
            </Text>
            <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
              Hoàng hôn
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF6',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },

  extraInfo: {
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    elevation: 1,
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 14,
    justifyContent: 'center',
  },
  largeIcon: {
    width: 250,
    height: 200,
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  currentTemp: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },
  currentDescription: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
    color: '#666666',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 36,
    color: 'black',
  },
});

export default InfoWeather;
