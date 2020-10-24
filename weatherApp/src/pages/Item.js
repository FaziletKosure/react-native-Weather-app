import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const Item = ({cafe, onSelect}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelect}>
        <Image source={{uri: cafe.image_url}} style={styles.image} />
        <View style={styles.infoView}>
          <Text style={[styles.text, {fontSize: 22}]}> {cafe.name}</Text>
          <View style={styles.inner}>
            <Icon
              style={[styles.text, {marginTop: 2}]}
              name="star"
              size={30}
              color="yellow"
            />
            <Text style={[styles.text, {marginLeft: 5}]}>{cafe.rating}</Text>
            <Text style={[styles.text, {marginLeft: 20, fontSize: 14}]}>
              Review: {cafe.review_count}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: 'rgba(100,100,100,.6)',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#e0e0e0',
  },
  image: {
    height: HEIGHT / 2.5,
    width: WIDTH,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
