import {useIsFocused} from '@react-navigation/core';
import React, {useRef, useState} from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';

import CaptureButton from './captureButton';
import FindBugButton from './findBugButton';
import Toolbar from './toolbar';
import Note from './note';
import OpenImagePickerButton from './openImagePickerButton';

const {width, height} = Dimensions.get('window');

const Capture = ({navigation, route, ...props}) => {
  const camera = useRef(null);
  const [camIsReady, setCamReady] = useState(false);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [camTyoe, setCamType] = useState(RNCamera.Constants.Type.back);
  const [listImage, setListImage] = useState([]);

  const handleCamReady = () => {
    setCamReady(true);
  };

  const handleBack = () => navigation.goBack();

  const handlePreview = () => {
    navigation.navigate('PreviewImage', {
      listImage,
    });
    setListImage([]);
  };

  const handleChangeCamera = () => {
    const cam =
      camTyoe === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back;

    setCamType(cam);
  };

  const takePicture = () => {
    setCamReady(false);
    (async () => {
      const data = await camera.current.takePictureAsync();
      listImage.push(data);
      console.log(data.uri);
      setListImage(listImage);
      setCamReady(true);
    })();
  };

  const isFoucused = useIsFocused();

  if (!isFoucused) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.fullScreen]}>
      <View style={styles.container}>
        <View style={styles.cameraLayout}>
          <View style={styles.cameraBox}>
            <RNCamera
              ref={camera}
              style={styles.cameraPreview}
              type={camTyoe}
              useNativeZoom={true}
              flashMode={RNCamera.Constants.FlashMode.off}
              captureAudio={false}
              focusDepth={0.5}
              androidCameraPermissionOptions={{
                title: 'Cho ph??p ???ng d???ng n??y truy c???p v??o Camera c???a b???n?',
                message: '???ng d???ng c???n quy???n truy c???p v??o Camera ????? ch???p ???nh',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onCameraReady={handleCamReady}
            />
          </View>
          {!camIsReady && <View style={[styles.coverBlack]} />}
          <Toolbar
            style={styles.toolbar}
            onPressBack={handleBack}
            onPressChangeCameraType={handleChangeCamera}
            flash={flash}
            setFlash={setFlash}
          />
          <Note style={styles.note} />
          <OpenImagePickerButton size={60} style={styles.imagePickerButton} />
          <CaptureButton
            size={100}
            color="white"
            disabled={!camIsReady}
            style={styles.captureButton}
            onPress={takePicture}
          />
          <FindBugButton
            hide={listImage.length <= 0}
            size={70}
            style={styles.findbugButton}
            color="white"
            onPress={handlePreview}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  coverBlack: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
  },
  container: {position: 'relative'},
  cameraLayout: {
    position: 'relative',
  },
  cameraBox: {position: 'relative'},
  captureButton: {
    position: 'absolute',
    borderRadius: 50,
    overflow: 'hidden',
    bottom: 100,
    left: width / 2 - 50,
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
  },
  findbugButton: {
    position: 'absolute',
    bottom: 115,
    left: (width * 2.8) / 4,
  },
  toolbar: {
    height: 56,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: '#0000004d',
    zIndex: 999,
  },
  note: {
    overflow: 'visible',
    position: 'absolute',
    bottom: 230,
    width: '70%',
    left: width / 2 - (width * 0.7) / 2,
    backgroundColor: '#0000004d',
    borderRadius: 8,
  },
  imagePickerButton: {
    position: 'absolute',
    borderRadius: 50,
    bottom: 115,
    right: (width * 2.8) / 4,
  },
});

export default Capture;
