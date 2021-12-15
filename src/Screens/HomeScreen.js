/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import Data_History from '../Components/Home/DataHistory';
import Weather from '../Components/Home/WeatherHome';

const API_KEY = 'bfc446cec4e928c67b41456d93976713';

const HomeScreen = ({navigation}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchWeatherData = cityName => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    fetch(API)
      .then(rs => rs.json())
      .then(rs => {
        setWeatherData(rs);
      })
      .catch(error => {
        console.log(error);
        setWeatherData(null);
        setLoaded(false);
      });
  };

  const getHistory5 = () => {
    fetch('http://192.168.35.1:8080/history3')
      .then(rs => rs.json())
      .then(rs => {
        console.log('Success:::', rs);
        setData(rs);
      })
      .catch(error => {
        console.log(error);
        setisLoading(false);
      });
    // .finally(() => setData([]));
  };

  useEffect(() => {
    setTimeout(() => {
      getHistory5();
      fetchWeatherData('Vinh');
      setisLoading(false);
    }, 1000);
  }, []);

  if (weatherData === null) {
    return <View style={styles.container} />;
  }

  const Item = ({item}) => (
    <View style={styles.item}>
      <View style={styles.time}>
        <Text style={styles.title}>{item.viName}</Text>
        <Text style={styles.title}>{item.accuracy}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.subtitle}>{item.date}</Text>
        <Text style={styles.subtitle}>{item.time}</Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* CHỤP ẢNH---------------------------------------------------------------------- */}
      <View style={styles.camera}>
        <View style={styles.viewimage}>
          <Image
            source={require('../assets/recognition.png')}
            style={{margin: 40, width: 60, height: 60}}
          />
          <Image
            source={require('../assets/next.png')}
            style={{width: 20, height: 20}}
          />
          <Image
            source={require('../assets/mobile.png')}
            style={styles.images_icon}
          />
          <Image
            source={require('../assets/next.png')}
            style={{width: 20, height: 20}}
          />
          <Image
            source={require('../assets/medicine.png')}
            style={styles.images_icon}
          />
        </View>
        <Button
          title="Chụp ảnh"
          onPress={() => navigation.navigate('Camera')}
        />
      </View>

      {/* THỜI TIẾT--------------------------------------------------------------------- */}
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />

      {/* XEM THÊM LỊCH SỬ-------------------------------------------------------------- */}
      <SafeAreaView style={styles.his}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.texthis}>Lịch sử</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Image
              style={{width: 23, height: 23}}
              source={require('../assets/next.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* <Data_History /> */}
        <FlatList
          style={styles.list}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF6',
  },
  viewimage: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 30,
    alignItems: 'center',
  },
  images_icon: {
    width: 60,
    height: 60,
    margin: 10,
  },
  camera: {
    marginTop: '3%',
    marginHorizontal: '3%',
    marginBottom: '4%',
    elevation: 1,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  his: {
    flex: 1,
    alignSelf: 'center',
    width: '93%',
    backgroundColor: 'white',
    marginTop: '-27%',
    elevation: 2,
    borderRadius: 20,
  },
  line: {
    borderBottomColor: 'lime',
    borderBottomWidth: 1,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  texthis: {
    color: 'black',
    marginLeft: 20,
    marginRight: 270,
    fontSize: 20,
  },
  list: {
    flex: 1,
    padding: 8,
  },
  item: {
    backgroundColor: '#009E41',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#FFF',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 150,
  },
  wrapText: {
    flex: 1,
    marginTop: 16,
    marginLeft: 8,
    backgroundColor: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default HomeScreen;
