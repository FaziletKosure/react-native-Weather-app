import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import ImageGallery from './pages/ImageGallery';
import WebPape from './pages/WebPage';
import HangMan from './pages/HangMan';
import CafePage from './pages/CafePage';
import CafeList from './pages/CafeList';
import App from '../App';

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'CafeListPage'}
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
        }}>
        <Stack.Screen name="ImageGalleryPage" component={ImageGallery} />
        <Stack.Screen name="WeatherPage" component={App} />
        <Stack.Screen name="WebPage" component={WebPape} />
        <Stack.Screen name="HangMan" component={HangMan} />
        <Stack.Screen name="CafePage" component={CafePage} />
        <Stack.Screen name="CafeListPage" component={CafeList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
