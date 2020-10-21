import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {WebView} from 'react-native-webview';
const WebPage = (props) => {
  return (
    <View style={{flex: 1}}>
      <WebView
        style={{margin: 10}}
        source={{uri: ' https://faziletkosure.github.io/Clarussoft_project/'}}
      />
      <Button
        title="Go Play HangMan!"
        onPress={() => props.navigation.navigate('HangMan')}
      />
    </View>
  );
};

export default WebPage;

const styles = StyleSheet.create({});
