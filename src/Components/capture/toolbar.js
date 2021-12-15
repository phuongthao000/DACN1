import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Toolbar = ({
  style = {},
  onPressBack,
  onPressChangeCameraType,
  disabled = false,
  hide = false,
  flash,
  setFlash,
  ...props
}) => {
  if (hide) {
    return null;
  }

  const onChangeFlashMode = value => {
    switch (value) {
      case 0:
        setFlash(1);
        break;
      case 1:
        setFlash(2);
        break;
      case 2:
        setFlash(0);
        break;
      default:
        break;
    }
  };

  return (
    <View style={style}>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={onPressBack}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeFlashMode(flash)}
          style={styles.btnFlashControl}>
          {flash === 0 ? (
            <Icon
              style={styles.flashIcon}
              name="flash"
              size={30}
              color="white"
            />
          ) : flash === 1 ? (
            <Icon
              style={styles.flashIcon}
              name="flash-off"
              size={30}
              color="white"
            />
          ) : (
            <Icon
              style={styles.flashIcon}
              name="flash-auto"
              size={30}
              color="white"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={onPressChangeCameraType}>
          <Icon name="sync" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarButton: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flashIcon: {
    height: 25,
    width: 25,
    marginBottom: 5,
  },
});

export default Toolbar;
