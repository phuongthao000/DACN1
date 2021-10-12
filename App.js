import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconWeather from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "./Screens/HomeScreen";
import SearchScreen from './Screens/SearchScreen';
import WeatherScreen from './Screens/WeatherScreen';
import {HistoryScreen} from './Screens/HistoryScreen';
import camera from './Components/Camera/CaptureImages';
import History from './Components/Home/SeeMoreHistory';




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AnAn() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} 
                      options={{tabBarLabel:'',tabBarIcon:({color})=> <Icon name="home" color={color} size ={25}></Icon>}} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} 
                      options={{tabBarLabel:'',tabBarIcon:({color})=> <Icon name="search" color={color} size ={25}></Icon>}} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} 
                      options={{tabBarLabel:'',tabBarIcon:({color})=> <Icon name="history" color={color} size ={25}></Icon>}}/>
      <Tab.Screen name="WeatherScreen" component={WeatherScreen} 
                      options={{tabBarLabel:'',tabBarIcon:({color})=> <IconWeather name="weather-partly-rainy" color={color} size ={25}></IconWeather>}}/>
    </Tab.Navigator>
  );
}

const Demo_App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AnAn" component={AnAn} />
        <Stack.Screen name = "camera" component = {camera}/>
        <Stack.Screen name = "History" component = {History}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Demo_App