import React, { useEffect, useState } from 'react';
import { StyleSheet,View, Text, SafeAreaView, FlatList, ActivityIndicator,Image } from 'react-native';

const App = ()=>{
  const [data,setdata] = useState([]);
  const [isLoading,setisLoading] = useState(true);
  console.log(data);
  useEffect(()=>{
    getListPhotos();
    return ()=>{
    }
  }, [])

  getListPhotos = ()=>{
    fetch("http://192.168.1.10:80/AdminReact/seemorehistory.php")
    .then((res)=>res.json())
    .then((resJson)=>{setdata(resJson)})
    .catch((error)=>{console.log(error);})
    .finally(()=>setisLoading(false))
  };

  renderItem = ({item,index})=>{
    return(
      <View style = {styles.item}>
        <Image 
          style = {styles.image}
          source={{uri:item.url}}
          resizeMode='contain'/>
        <View style={styles.wrapText}>
          <Text style={{color:'black'}}>{item.title}</Text>
        </View>
      </View>
    )
  }
  return(
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList 
          style={styles.list}
          data = {data}
          renderItem={renderItem}
          keyExtractor={item => item.id}>
        </FlatList>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  list:{
    flex:1,
    padding:8
  },
  item:{
    flexDirection:'row',
    marginTop:8,
    padding:5,
    shadowColor:'#000',
    shadowRadius:4,
    shadowOpacity:0.25
  },
  image:{
    width:100,
    height:150
  },
  wrapText:{
    flex:1,
    marginTop:16,
    marginLeft:8,
    backgroundColor:'white'
  }
});

export default App;


