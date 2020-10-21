import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Button,
} from 'react-native';
import imageGalleryData from '../image_gallery.json';
import {ImageCard} from './ImageCard';

const ImageGallery = (props) => {
  const [imageList, setImageList] = useState([]);
  const renderListItem = ({item}) => <ImageCard image={item} />;
  useEffect(() => {
    setImageList(imageGalleryData);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={styles.banner}>Image Gallery</Text>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={imageGalleryData}
          renderItem={renderListItem}
          numColumns={2}
        />
        <Button
          title="Go Weather!"
          onPress={() => props.navigation.navigate('WeatherPage')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  banner: {
    color: '#ec407a',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
});
