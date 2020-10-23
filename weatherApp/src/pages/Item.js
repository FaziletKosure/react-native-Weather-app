import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Item = ({cafe, onSelect}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelect}>
        <Image source={{uri: cafe.image_url}} style={styles.image} />
        <Text style={styles.text}> {cafe.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#82ada9',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#e0e0e0',
    // alignItems: 'center',
  },

  image: {
    height: HEIGHT / 2.5,
    width: WIDTH / 2,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  },
});
