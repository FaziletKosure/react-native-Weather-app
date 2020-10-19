import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import Config from 'react-native-config';
import Loader from './src/Loading';

// Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const App = () => {
  const [appState, setAppState] = useState({
    data: [],
    isLoading: true,
    temp: '',
    city: '',
    icon: '',
    city_display: '',
    desc: '',
    main: '',
    humidity: '',
    pressure: '',
    visibility: '',
    sunrise: '',
  });
  const fetch_weather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${appState.city}&appid=${Config.GOOGLE_MAPS_API_KEY}`,
    )
      // https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY
      // https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        let unix_timestamp = json.sys.sunrise;
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        const date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        const hours = date.getHours();
        // Minutes part from the timestamp
        const minutes = '0' + date.getMinutes();
        // Seconds part from the timestamp
        const seconds = '0' + date.getSeconds();
        // Will display time in 10:30:23 format
        const formattedTime =
          hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        setAppState({
          data: json,
          temp: (json.main.temp - 273.15).toFixed(2) + ' °C',
          city_display: json.name,
          icon: json.weather[0].icon,
          desc: json.weather[0].description,
          main: json.weather[0].main,
          humidity: json.main.humidity + ' %',
          pressure: json.main.pressure + ' hPa',
          visibility: (json.visibility / 1000).toFixed(2) + ' Km',
          sunrise: formattedTime,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setAppState({...appState, isLoading: false});
      });
  };

  useEffect(() => {
    setAppState({...appState});
  }, [appState.city]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#000" />
      <ImageBackground
        source={require('./src/assets/out.png')}
        style={styles.Image_Background_Style}>
        <View style={styles.Search_Box_View}>
          <TextInput
            keyboardAppearance="dark"
            placeholder="Search"
            placeholderTextColor="#FFF"
            style={styles.Search_Box}
            value={appState.city}
            onChangeText={(text) => setAppState({...appState, city: text})}
          />
          <TouchableOpacity style={styles.button_touch} onPress={fetch_weather}>
            <Icon name="search" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.Weather_Box_Main}>
          <View style={styles.Weather_Holder_View}>
            <Image
              tintColor="#FFF"
              source={{
                uri:
                  'http://openweathermap.org/img/wn/' +
                  appState.icon +
                  '@2x.png',
              }}
              style={styles.Weather_Image}
            />
            <View>
              <Text style={styles.temprature_text}>{appState.temp}</Text>
              <Text style={styles.city_text}>{appState.city_display}</Text>
              <Text style={styles.city_text}>Sunrise:{appState.sunrise}</Text>
            </View>
          </View>
        </View>

        {appState.isLoading ? (
          <Loader />
        ) : (
          <View style={styles.Info_Box_View}>
            <View style={styles.Info_Holder_Veiw}>
              <Text style={styles.Main_Weather_Text}>{appState.main}</Text>
              <Text style={styles.description_text}>{appState.desc}</Text>
              <Text style={styles.humidity_text}>
                Humidity : {appState.humidity}
              </Text>
              <Text style={styles.other_text}>
                Pressure : {appState.pressure}
              </Text>
              <Text style={styles.other_text}>
                Visibility : {appState.visibility}
              </Text>
            </View>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;

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
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Search_Box: {
    height: '35%',
    width: '80%',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 15,
    color: '#FFF',
    paddingHorizontal: 15,
  },
  button_touch: {
    marginLeft: '5%',
    height: '35%',
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Weather_Box_Main: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Weather_Holder_View: {
    height: '80%',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Weather_Image: {
    height: '80%',
    width: '50%',
  },
  temprature_text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: '5%',
  },
  city_text: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: '5%',
    marginTop: '3%',
  },
  Info_Box_View: {
    height: '45%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Info_Holder_Veiw: {
    height: '80%',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 15,
  },
  Main_Weather_Text: {
    fontSize: 28,
    color: '#464646',
    marginLeft: '8%',
    marginTop: '8%',
    fontWeight: 'bold',
  },
  description_text: {
    fontSize: 20,
    color: '#121212',
    marginLeft: '8%',
    marginTop: '3%',
  },
  humidity_text: {
    fontSize: 18,
    color: '#121212',
    marginLeft: '8%',
    marginTop: '5%',
  },
  other_text: {
    fontSize: 18,
    color: '#121212',
    marginLeft: '8%',
    marginTop: '2%',
  },
});
