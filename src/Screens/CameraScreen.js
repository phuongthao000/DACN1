import * as React from 'react';
import { View} from 'react-native';
import CaptureImage from '../src/Components/Camera/CaptureImages';

export function CameraScreen(navigation){
    return(
        <View>
            <CaptureImage />
        </View>
    );
}


