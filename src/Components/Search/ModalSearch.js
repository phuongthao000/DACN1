import React, {useState} from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import HTML from 'react-native-render-html';
import {NativeBaseProvider, Box, ScrollView} from 'native-base';

const scHeight = Dimensions.get('window').height;
const scWidth = Dimensions.get('window').width;

const ModalSearch = ({route, ...props}) => {
  const {isVisible, cancelPress, onBackdropPress, rsData} = props;
  // console.log('PARAMS: ', rsData);
  const html = rsData;
  return (
    <Modal style={styles.modal} isVisible={isVisible}>
      <View style={[styles.fullScreen]}>
        <View style={styles.backbtn}>
          <TouchableOpacity onPress={onBackdropPress} style={styles.cancel}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <NativeBaseProvider>
          <ScrollView>
            <Box style={styles.container}>
              <HTML contentWidth={scWidth} source={{html}} />
            </Box>
          </ScrollView>
        </NativeBaseProvider>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backDropModal: {
    // height: scHeight * 0.5,
    // width: scWidth,
    // backgroundColor: 'rgba(112, 112, 112, 1)',
  },
  backbtn: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  cancel: {
    width: '5%',
    // justifyContent: 'flex-end',
    // alignContent: 'flex-end',
    // margin: '1%',
    // marginRight: '2%',
    backgroundColor: 'red',
    // padding: '1%',
  },
  viewModal: {
    // height: scHeight,
    // width: scWidth,
    backgroundColor: 'white',
    // borderRadius: 100,
  },
  imageBigPreview: {
    height: '100%',
    width: '100%',
    // borderRadius: 1,
  },
  bottomModal: {
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    width: '100%',
    // height: '20%',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  fullScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: '3%',
  },
});

export default ModalSearch;
