import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const CafePage = ({route, navigation}) => {
  const cafeData = route.params.selectedCafe;
  return (
    <ImageBackground
      source={require('../assets/1551946-bigthumbnail.jpg')}
      style={styles.Image_Background_Style}>
      <View style={styles.container}>
        <View style={{marginVertical: 15}}>
          <Text
            style={[
              styles.text,
              {
                fontSize: 30,
                fontWeight: 'bold',
                marginVertical: 10,
                textAlign: 'center',
              },
            ]}>
            {cafeData.name}
          </Text>
          <Image style={styles.image} source={{uri: cafeData.image_url}} />
        </View>

        <TouchableOpacity style={styles.info}>
          <Icon
            style={[styles.text, {marginTop: 2}]}
            name="star"
            size={30}
            color="yellow"
          />
          <Text style={styles.text}> {cafeData.rating}</Text>

          <Text style={styles.text}>Review Count: {cafeData.review_count}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.info}>
          <Icon
            style={[styles.text, {marginTop: 2}]}
            name="map-signs"
            size={30}
            color="yellow"
          />
          <Text style={styles.text}>
            {(cafeData.distance / 1000).toFixed(2) + ' km'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.info}>
          <Icon
            style={[styles.text, {marginTop: 2}]}
            name="map-marker"
            size={30}
            color="yellow"
          />
          <Text style={styles.text}>
            {cafeData.location.address1} / {cafeData.location.city}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.info}>
          <Icon
            style={[styles.text, {marginTop: 2}]}
            name="phone"
            size={30}
            color="yellow"
          />
          <Text style={styles.text}> {cafeData.phone}</Text>
        </TouchableOpacity>

        <Button
          style={{borderRadius: 10, padding: 15, fontSize: 16}}
          title="Back"
          color="#008ba3"
          onPress={() => navigation.navigate('CafeListPage')}
        />
      </View>
    </ImageBackground>
  );
};

export default CafePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: WIDTH * 0.9,
    height: HEIGHT / 2,
  },
  Image_Background_Style: {
    height: '100%',
    width: '100%',
  },

  text: {
    color: 'white',
    fontSize: 22,
    marginLeft: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,.6)',
    borderRadius: 25,
    padding: 5,
    marginVertical: 5,
    width: WIDTH * 0.9,
  },
});
