import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Title} from 'react-native-paper';
import FormButton from '../../components/FormButton';

function Subscriptions({navigation}) {
  return (
    <View style={styles.container}>
      <Title>Hurray!! Get your products</Title>
      <Title>at max discount !!</Title>
      <View style={styles.imgContainer}>
        <Image source={require('../../assets/cardlogo.png')} />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            padding: 10,
            left: 150,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            1334 2348 3482 2334
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
            }}>
            Abhav Thakur
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
            }}>
            Valid Date - 10/04/22
          </Text>
        </View>
      </View>

      <FormButton
        buttonTitle="Card Renewal"
        onPress={() => console.log('card')}
      />

      <FormButton
        buttonTitle="QR Code"
        btnstyle={{marginTop: 20}}
        onPress={() => console.log('QR Code')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 210,
    justifyContent: 'center',
    marginVertical: 50,
  },
});

export default Subscriptions;
