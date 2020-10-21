import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';

const ImageCard = ({image}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image
                id={image.id}
                style={styles.newSize}
                source={{
                  uri: image.imgURL,
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Image
          // id={image.id}
          style={styles.image}
          source={{
            uri: image.imgURL,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export {ImageCard};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginVertical: 2,
  },
  image: {
    height: Dimensions.get('window').height / 2.5,
    width: Dimensions.get('window').width / 2,
  },
  newSize: {
    flex: 1,
    height: Dimensions.get('window').height / 1,
    width: Dimensions.get('window').width / 1.2,
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 30,
    backgroundColor: 'rgba(120,100,100,.9)',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
