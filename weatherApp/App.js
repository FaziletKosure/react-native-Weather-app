import React, { Component } from 'react'
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
  ActivityIndicator
} from "react-native"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const HEIGHT = Dimensions.get("window").height
const WIDTH = Dimensions.get("window").width

export class App extends Component {
  constructor(props){
    super(props);
      this.state ={
        data: [],
        isLoading: true,
        temp:"",
        city:"Chennai",
        icon:"",
        city_display:"",
        desc: "",
        main:"",
        humidity:"",
        pressure:"",
        visiblity:"",
    }
    this.fetch_weather()
  }
  
  fetch_weather=()=> {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Istanbul,tr&APPID=3a1c2c64d91ed788211566315dae0928')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        this.setState({ temp : (json.main.temp-273.15).toFixed(2)+" °C" })
        this.setState({ city_display : json.name })
        this.setState({ icon: json.weather[0].icon})
        this.setState({ desc : json.weather[0].description})
        this.setState({ main : json.weather[0].main})
        this.setState({ humidity : json.main.humidity+" %"})
        this.setState({ pressure : json.main.pressure+" hPa"})
        this.setState({ visibility : (json.visibility/1000).toFixed(2)+" Km"})
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
         <StatusBar translucent={true} backgroundColor="#000"/>
        {/* <Text> textInComponent  <Icon name="rocket" size={30} color="#900" />;</Text> */}
        <ImageBackground source={{uri:"https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png"}} 
      style={styles.Image_Background_Style}>
           </ImageBackground>

      </View>
    )
  }
}

export default App
const styles=StyleSheet.create({
  container:{
    height:HEIGHT,
    width:WIDTH,
  },
  Image_Background_Style:{
    height:"100%",
    width:"100%"
  },
})
