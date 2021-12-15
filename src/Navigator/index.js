import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconWeather from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import WeatherScreen from '../Screens/WeatherScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import Capture from '../Components/capture';
import PreviewImage from '../Components/previewImage';
import Results from '../Components/result';
import ImagePicker from '../Components/capture/openImagePickerButton';

StatusBar.setHidden(true, 'none');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AnAn = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Tìm kiếm',
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={25} />
          ),
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Lịch sử',
          tabBarIcon: ({color}) => (
            <Icon name="history" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="WeatherScreen"
        component={WeatherScreen}
        options={{
          tabBarLabel: 'Thời tiết',
          tabBarIcon: ({color}) => (
            <IconWeather name="weather-partly-rainy" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Camera = () => {
  return (
    <Stack.Navigator initialRouteName="Capture">
      <Stack.Screen
        name="Capture"
        component={Capture}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PreviewImage"
        component={PreviewImage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImagePicker"
        component={ImagePicker}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AnAn"
        component={AnAn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Navigator;
