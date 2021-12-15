import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import DATA from '../utils/datas.json';
import ModalSearch from '../Components/Search/ModalSearch';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const SearchScreen = () => {
  const [isLoading, setisLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [rsView, setrsView] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  // const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getDiseases();
  }, []);

  const getDiseases = () => {
    fetch('http://192.168.35.1:8080/list')
      .then(rs => rs.json())
      .then(rs => {
        console.log('Success:::', rs);
        // setisLoading(false);
        setFilteredDataSource(rs);
        setMasterDataSource(rs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDiseases();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const viewRS = datas => {
    setrsView(datas);
    setisVisibleModal(true);
  };

  const Item = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => viewRS(item.describe)}>
        <Text style={styles.title}>{item.viName}</Text>
      </TouchableOpacity>
      <ModalSearch
        isVisible={isVisibleModal}
        onBackdropPress={() => {
          setisVisibleModal(false);
        }}
        rsData={rsView}
      />
    </View>
  );

  const renderItem = ({item}) => <Item item={item} />;

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(item => {
        const itemData = item.viName
          ? item.viName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Tìm kiếm"
        placeholderTextColor="#272822"
        textAlign="center"
      />
      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // searchBar: {
  //   // marginTop: '2%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   width: Dimensions.get('screen').width * 0.98,
  //   height: Dimensions.get('screen').height * 0.07,
  //   borderWidth: 1.5,
  //   paddingVertical: '2%',
  //   borderRadius: 25,
  //   marginHorizontal: '1%',
  //   paddingHorizontal: '1%',
  //   // backgroundColor: 'lightgray',
  //   borderColor: '#00FF66',
  // },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    marginTop: '1%',
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#00FF66',
    // backgroundColor: '#FFFFFF',
    borderRadius: 25,
    color: '#000',
  },
  item: {
    backgroundColor: '#009E41',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
  },
});

export default SearchScreen;
