import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Weather from '../Components/Weather/InfoWeather';
import Search from '../Components/Weather/Search';

const API_KEY = 'bfc446cec4e928c67b41456d93976713';

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData('Vinh');
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="gray" size={36} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View style={styles.container}>
        <Search fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>Không tìm thấy địa điểm</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 18,
  },
});

export default WeatherScreen;
