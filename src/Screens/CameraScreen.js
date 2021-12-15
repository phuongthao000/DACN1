import * as React from 'react';
import {View} from 'react-native';
import CaptureImage from '../Components/Camera/CaptureImages';

const CameraScreen = navigation => {
  return (
    <View>
      <CaptureImage />
    </View>
  );
};

export default CameraScreen;
