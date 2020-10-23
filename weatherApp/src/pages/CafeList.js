import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  FlatList,
} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Item from './Item';
// const apiKey = Config.YOUR_API_KEY
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const CafeList = ({route, navigation}) => {
  const [text, setText] = useState('');
  const [meal, setMeal] = useState('');

  const [appState, setAppState] = useState([]);

  const config = {
    headers: {
      Authorization: 'Bearer ' + Config.YOUR_API_KEY,
    },
  };

  const fetchCafes = (txt, ml) => {
    fetch(
      `https://api.yelp.com/v3/businesses/search?term=${meal}&location=${txt}`,
      config,
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json.businesses);
        const filtered = json.businesses.filter((x) => x.image_url);
        setAppState(filtered);
        console.log(appState);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        Keyboard.dismiss();
      });
  };

  // useEffect(() => {
  //     setAppState([...appState]);
  // }, [appState]);
  const renderItemList = ({item}) => (
    <Item
      cafe={item}
      onSelect={() => navigation.navigate('CafePage', {selectedCafe: item})}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: '#b2dfdb', flex: 1}}>
        <View>
          <Button
            title="Go to Image Gallery"
            color="#82ada9"
            onPress={() => navigation.navigate('FirstPage')}
          />
        </View>
        <View style={styles.Search_Box_View}>
          <TextInput
            placeholder="Search location"
            placeholderTextColor="black"
            style={styles.Search_Box}
            onChangeText={(t) => setText(t)}
            value={text}
          />
          <TouchableOpacity
            style={styles.button_touch}
            onPress={() => fetchCafes(text, meal)}>
            <Icon
              style={{marginLeft: 5}}
              name="search"
              size={25}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={appState}
          renderItem={renderItemList}
          horizontal={false}
          //   numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default CafeList;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
  },
  Image_Background_Style: {
    height: '100%',
    width: '100%',
  },
  Search_Box_View: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // marginVertical: 5,
  },
  Search_Box: {
    height: '35%',
    width: '85%',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 15,
    color: 'black',
    paddingHorizontal: 15,
    backgroundColor: '#fafafa',
  },
});
