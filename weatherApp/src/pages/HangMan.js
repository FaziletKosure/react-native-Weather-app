import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {WebView} from 'react-native-webview';

const HangMan = (props) => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: ' https://faziletkosure.github.io/js_hangman_game/'}}
      />
      <Button
        title="Go to Cafe Page"
        onPress={() => props.navigation.navigate('CafeListPage')}
      />
      <Button
        style={{padding: 20}}
        title="Back to imageGalery"
        onPress={() => props.navigation.goBack()}
      />
    </View>
  );
};

export default HangMan;

const styles = StyleSheet.create({});
