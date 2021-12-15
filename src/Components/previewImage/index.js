import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {hasReadExternalStoragePermission} from '../../utils/permission';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import CloseDuotone from '../../assets/svgs/close-duotone.svg';
import {SvgXml} from 'react-native-svg';
import ModalPreview from './ModalPreview';

const send = (
  image,
  url = 'http://192.168.35.1:8080/predict',
  options = {method: 'POST', sheaders: {}},
) => {
  const {method, headers} = options;

  const img = {
    uri: image,
    type: 'image/jpeg',
    name: 'disease.jpg',
  };

  const body = new FormData();
  body.append('img', img);
  console.log(body, image);

  return (
    axios({
      url: url,
      data: body,
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
    })
      // .then(rs => rs.json())
      .then(rs => rs.data)
      .catch(e => console.error(e))
      .finally(rs => [])
  );
};

const PreviewImage = ({navigation, route, ...props}) => {
  const [listImage, setListImage] = useState(route.params.listImage || []);
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [imagePreview, setimagePreview] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  hasReadExternalStoragePermission()
    // .then(() => console.log('hasReadExternalStoragePermission'))
    .catch(e => console.warn(e));

  const predictImage = image => {
    if (image.length <= 0) {
      return ToastAndroid.show('Không có ảnh nào', ToastAndroid.SHORT);
    }

    send(image.uri)
      .then(rs => {
        console.log('Success:::', rs);
        navigateToResultScreen(rs);
        setisLoading(false);
      })
      .catch(rs => navigateToResultScreen(rs))
      .finally(() => setisLoading(false));
  };

  const navigateToResultScreen = rs => {
    navigation.navigate('Results', rs);
  };

  const handleBack = () => navigation.goBack();

  const previewImage = image => {
    setimagePreview(image);
    setisVisibleModal(true);
  };

  const removeImageAt = index => {
    listImage.splice(index, 1);
    if (listImage.length <= 0) {
      return navigation.goBack();
    }
    setListImage([...listImage]);
  };

  const renderImageItem = ({item, index, separators}) => {
    return (
      <View key={item.uri} style={styles.boudingBox}>
        <TouchableOpacity onPress={() => previewImage(item.uri)}>
          <Image
            style={[styles.image, {aspectRatio: item.width / item.height}]}
            source={{uri: item.uri}}
          />
        </TouchableOpacity>
        <View style={styles.removeButton}>
          <TouchableOpacity onPress={() => removeImageAt(index)}>
            <View>
              <SvgXml width={40} height={40} color="white" xml={CloseDuotone} />
            </View>
          </TouchableOpacity>
        </View>
        <ModalPreview
          isVisible={isVisibleModal}
          onBackdropPress={() => {
            setisVisibleModal(false);
          }}
          cancelPress={() => {
            setisVisibleModal(false);
          }}
          predictPress={() => predictImage(item)}
          imagePreview={imagePreview}
        />
      </View>
    );
  };

  console.log('render...........................................');
  return (
    <SafeAreaView style={[styles.fullScreen]}>
      <View style={styles.fullScreen}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="chevron-left" size={30} color="#484848" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={listImage}
          renderItem={renderImageItem}
          keyExtractor={item => item.uri}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  navbar: {
    width: '100%',
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
  },
  image: {
    width: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  backButton: {
    width: 50,
    height: '100%',
    // borderColor: 'red',
    // borderWidth: 2,
    // borderStyle: 'solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boudingBox: {
    position: 'relative',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  bottomActions: {
    width: '100%',
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
  },
  scanButton: {
    width: '50%',
    height: '90%',
    // borderColor: '#d2ffd0',
    // borderWidth: 1,
    // borderStyle: 'solid',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#28a745',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default PreviewImage;
