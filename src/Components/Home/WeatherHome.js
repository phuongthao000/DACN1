import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, ScrollView, SafeAreaView} from 'react-native';

export default function WeatherHome({ weatherData, fetchWeatherData }) {
    const 
        {   
            weather,
            visibility,
            weather: [{description, icon}],
            name,
            main: { temp, humidity, feels_like },
            wind: { speed },
            sys: { sunrise, sunset },
            
        } = weatherData;
    const [{ main }] = weather;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ScrollView> 
                <View style={styles.current}>
                    <View style={{marginLeft:10}}>
                        <Text style={styles.currentTemp}>{name}</Text>
                        <Text style={styles.nhietdo}>{temp} °C</Text>
                        <Text style={styles.currentTemp}>{description}</Text>
                    </View>  
                    <Image
                        style={styles.largeIcon}
                        source={{
                        uri: `http://openweathermap.org/img/wn/${icon}@4x.png`}}/>   
                </View>       
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft:5,
        marginRight:10,
        marginBottom:-100
    },
    nhietdo:{
        marginLeft:15,
        fontSize:30,
    },
    largeIcon: {
        marginLeft:40,
        width: 170,
        height: 170,
    },
    current: {
        elevation:2,
        borderRadius:15,
        backgroundColor:"white",
        margin:10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentTemp: {
        marginLeft:15,
        color:'black',
        fontSize: 18,
    },
 
 
});


