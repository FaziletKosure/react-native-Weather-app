import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Button} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
// {
//     id: json.businesses[0].id,
//     name: json.businesses[0].name,
//     phone: json.businesses[0].phone,
//     rating: json.businesses[0].rating,
//     review_count: json.businesses[0].review_count,
//     image_url: json.businesses[0].image_url,
//     is_closed: json.businesses[0].is_closed
// }
const CafePage = ({route, navigation}) => {
  const cafeData = route.params.selectedCafe;
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {fontSize: 30, fontWeight: 'bold', marginVertical: 10},
        ]}>
        {cafeData.name}
      </Text>
      <Image style={styles.image} source={{uri: cafeData.image_url}} />

      <Text style={styles.text}>Phone: {cafeData.phone}</Text>
      <Text style={styles.text}>Rating: {cafeData.rating}</Text>
      <Text style={styles.text}>Review Count: {cafeData.review_count}</Text>
      <Text style={styles.text}>
        Distance:{(cafeData.distance / 1000).toFixed(2) + ' km'}
      </Text>
      <Text style={styles.text}>
        Address: {cafeData.location.address1} / {cafeData.location.city}
      </Text>

      <Text style={styles.text}>{cafeData.is_closed}</Text>
      <Button
        title="Back"
        color="#39796b"
        onPress={() => navigation.navigate('CafeListPage')}
      />
    </View>
  );
};

export default CafePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00838F',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f5b62',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#e0e0e0',
  },
  image: {
    width: WIDTH * 0.9,
    height: HEIGHT / 2,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
