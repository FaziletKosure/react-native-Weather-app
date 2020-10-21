import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  mainheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Button,
} from 'react-native';

import {main} from './src/styles';
import Config from 'react-native-config';
import Loader from './src/Loading';

// Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const App = (props) => {
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
        Keyboard.dismiss();
      });
  };

  useEffect(() => {
    setAppState({...appState});
  }, [appState.city]);

  const renderSunRise = () => {
    if (appState.sunrise) {
      return <Text style={main.city_text}>Sunrise: {appState.sunrise}</Text>;
    }
  };

  return (
    <SafeAreaView style={main.container}>
      <KeyboardAvoidingView>
        <StatusBar translucent={true} backgroundColor="#000" />
        <ImageBackground
          source={require('./src/assets/out.png')}
          style={main.Image_Background_Style}>
          <View style={main.Search_Box_View}>
            <TextInput
              keyboardAppearance="dark"
              placeholder="Search a city"
              placeholderTextColor="#FFF"
              style={main.Search_Box}
              value={appState.city}
              onChangeText={(text) => setAppState({...appState, city: text})}
            />
            <TouchableOpacity style={main.button_touch} onPress={fetch_weather}>
              <Icon name="search" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={main.Weather_Box_Main}>
            <View style={main.Weather_Holder_View}>
              <Image
                tintColor="#FFF"
                source={{
                  uri:
                    'http://openweathermap.org/img/wn/' +
                    appState.icon +
                    '@2x.png',
                }}
                style={main.Weather_Image}
              />
              <View>
                <Text style={main.temprature_text}>{appState.temp}</Text>
                <Text style={main.city_text}>{appState.city_display}</Text>
                {renderSunRise()}
              </View>
            </View>
          </View>

          {appState.isLoading ? (
            <Loader />
          ) : (
            <View style={main.Info_Box_View}>
              <View style={main.Info_Holder_Veiw}>
                <Text style={main.Main_Weather_Text}>{appState.main}</Text>
                <Text style={main.description_text}>{appState.desc}</Text>
                <Text style={main.humidity_text}>
                  Humidity : {appState.humidity}
                </Text>
                <Text style={main.other_text}>
                  Pressure : {appState.pressure}
                </Text>
                <Text style={main.other_text}>
                  Visibility : {appState.visibility}
                </Text>
              </View>
            </View>
          )}
          <Button
            title="Go ClarusSoft!"
            onPress={() => props.navigation.navigate('WebPage')}
          />
          <Button
            style={{padding: 20}}
            title="Back to imageGalery"
            onPress={() => props.navigation.goBack()}
          />
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;
