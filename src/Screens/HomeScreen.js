import React, { useState, useEffect } from 'react';
import { ActivityIndicator,TouchableOpacity,ScrollView,SafeAreaView,View,Text, Button,StyleSheet,Image } from "react-native";
import Data_History from "../Components/Home/DataHistory";
import Weather from "../Components/Home/WeatherHome";

const API_KEY = "bfc446cec4e928c67b41456d93976713";

const HomeScreen = ({ navigation }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
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
    }, [])
    
    if(weatherData === null) {
        return (
            <View style={styles.container}/>
        )
    }

    return (
        <SafeAreaView  style={styles.container}>
            {/* CHỤP ẢNH---------------------------------------------------------------------- */}
            <View style={styles.camera} >
                <View style={styles.viewimage}>
                    <Image 
                        source={require('../assets/recognition.png')}
                        style={{margin:40 ,width:60, height:60,}}/>
                    <Image 
                        source={require('../assets/next.png')}
                        style={{width:20, height:20}}/>
                    <Image 
                        source={require('../assets/mobile.png')}
                        style={styles.images_icon}/>
                    <Image 
                        source={require('../assets/next.png')}
                        style={{width:20, height:20}}/>
                    <Image 
                        source={require('../assets/medicine.png')}
                        style={styles.images_icon}/>
                </View>
                <Button title="Take a picture" onPress={() => navigation.navigate("Camera")}/>
            </View>
            
            {/* THỜI TIẾT--------------------------------------------------------------------- */}
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />

            {/* XEM THÊM LỊCH SỬ-------------------------------------------------------------- */}
            <SafeAreaView style={styles.his}>
                <View style={{flexDirection: 'row',marginTop:10}}>
                    <Text style={styles.texthis}>History</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('History')}>
                        <Image
                            style={{width:23,height:23}}
                            source={require('../assets/next.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}></View>
                <Data_History/>
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#FFFBF6',
    },
    viewimage: {
        flexDirection: 'row',
        marginLeft:10,
        marginRight:30,
        alignItems: 'center',
    },
    images_icon:{
        width:60, 
        height:60,
        margin:10,
    },
    camera:{
        marginTop:5,
        marginLeft:10,
        marginRight:10,
        elevation:1,
        borderRadius:10,
        backgroundColor:'white',
    },
    his:{
        flex:1,
        backgroundColor:'white',
        marginTop:0,
        elevation:2
    },
    line:{
        borderBottomColor: 'lime',
        borderBottomWidth: 1,
        marginTop:20,
        marginRight:20,
        marginLeft:20
    },
    texthis:{
        color:'black',
        marginLeft:20,
        marginRight:270,
        fontSize:20
    }
})

export default HomeScreen