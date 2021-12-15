import React, {useEffect, useState} from 'react';
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';

const Data_History = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const getHistory5 = () => {
    fetch('http://192.168.35.1:8080/history3')
      .then(rs => rs.json())
      .then(rs => {
        console.log('Success:::', rs);
        setData(rs);
        setisLoading(true);
      })
      .catch(error => {
        console.log(error);
        setisLoading(false);
      });
    // .finally(() => setData([]));
  };

  useEffect(() => {
    setTimeout(() => {
      getHistory5();
      setisLoading(false);
    }, 1000);
  }, []);

  const Item = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.viName}</Text>
      <View style={styles.time}>
        <Text style={styles.subtitle}>{item.date}</Text>
        <Text style={styles.subtitle}>{item.time}</Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <FlatList
      style={styles.list}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.uid}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 8,
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
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 150,
  },
  wrapText: {
    flex: 1,
    marginTop: 16,
    marginLeft: 8,
    backgroundColor: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default Data_History;
