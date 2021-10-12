import React from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import  EvilIcons  from 'react-native-vector-icons/FontAwesome';


export default function SearchScreen() {

  

    return (
        <View style={styles.searchBar}>
            <TextInput 
                style={{color:'black'}}
                placeholder='Nhập tên loại sâu bệnh'
                placeholderTextColor={'#BBBBBB'}/>
            <EvilIcons name="search" size={28} color="#00FF66" />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        // backgroundColor: 'lightgray',
        borderColor: '#00FF66'
    }
})