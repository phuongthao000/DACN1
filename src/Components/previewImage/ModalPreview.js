import React from 'react';
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

const scHeight = Dimensions.get('screen').height;
const scWidth = Dimensions.get('screen').width;

const ModalPreview = ({route, ...props}) => {
  const {isVisible, cancelPress, predictPress, onBackdropPress, imagePreview} =
    props;
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      customBackdrop={
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View>
            <View />
            <View style={styles.backDropModal} />
          </View>
        </TouchableWithoutFeedback>
      }>
      <View style={styles.viewModal}>
        <Image
          resizeMode="cover"
          style={styles.imageBigPreview}
          source={{uri: imagePreview}}
        />
        <View style={styles.bottomModal}>
          <TouchableOpacity onPress={predictPress}>
            <View style={styles.button}>
              <Text style={styles.text}>Chuẩn đoán</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelPress}>
            <View style={styles.button1}>
              <Text style={styles.text}>Thoát</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
  },
  backDropModal: {
    height: scHeight,
    width: scWidth,
    backgroundColor: '#F8F8F2',
  },
  viewModal: {
    height: scHeight * 0.5,
    width: scWidth * 0.95,
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: '8%',
    borderRadius: 15,
    margin: '5%',
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: '10%',
    borderRadius: 15,
    margin: '5%',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default ModalPreview;
