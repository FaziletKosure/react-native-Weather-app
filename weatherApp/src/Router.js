import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import ImageGallery from './pages/ImageGallery';
import App from '../App';

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen name="ImageGalleryPage" component={ImageGallery} />
        <Stack.Screen name="WeatherPage" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
