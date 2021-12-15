import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  // Text,
  FlatList,
  Button,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/core';
import HTML from 'react-native-render-html';
import {NativeBaseProvider, Text, Box} from 'native-base';

const result = ({navigation, route, ...props}) => {
  console.log('PARAMS: ', route.params);
  const html = route.params.describe;

  const {width, height} = Dimensions.get('window');

  return (
    <SafeAreaView style={[styles.fullScreen]}>
      <NativeBaseProvider>
        <ScrollView>
          <Text>{route.params.accuracy}</Text>
          <Box style={styles.container}>
            <HTML contentWidth={width} source={{html}} />
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: '3%',
  },
});

export default result;
