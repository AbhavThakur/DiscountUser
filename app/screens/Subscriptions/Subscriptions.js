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
      <View>
        <Image source={require('../../assets/cardlogo.png')} />
      </View>

      <FormButton
        buttonTitle="Card Renewal"
        onPress={() => console.log('card')}
      />

      <FormButton
        buttonTitle="QR Code"
        onPress={() => console.log('QR Code')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2C3A4A',
    height: 55,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
});

export default Subscriptions;
