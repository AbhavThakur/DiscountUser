import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, Title} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';

import FormButton from '../../components/FormButton';

function Subscriptions({navigation}) {
  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [expirydate, setexpirydate] = useState('');
  const [expiry, setexpiry] = useState();
  const [cardno, setcardno] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const {uid} = auth().currentUser;

  useEffect(() => {
    firestore()
      .collection('Subscribed')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const userData = documentSnapshot.data();
        setName(userData.firstName);
        setLast(userData.lastName);
        setcardno(userData.cardNumber);
        setexpirydate(userData.expiryDate);
        setLoading(false);
      });
  }, [uid]);

  return (
    <View style={styles.container}>
      <Title>Hurray!! Get your products</Title>
      <Title>at max discount !!</Title>

      {loading ? (
        <ActivityIndicator animating={true} color="#D02824" size="large" />
      ) : (
        <View style={styles.imgContainer}>
          <Image source={require('../../assets/cardlogo.png')} />
          <View style={styles.detailsContainer}>
            <QRCode
              value={cardno}
              color="black"
              logoBackgroundColor="transparent"
            />
            <Text style={styles.cardno}>{cardno}</Text>
            <Text style={styles.username}>
              {name} {last}
            </Text>
            <Text style={styles.date}>Valid Date - {expirydate} </Text>
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>QR Code</Text>
            <QRCode
              value={cardno}
              color="black"
              logoBackgroundColor="transparent"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FormButton
        buttonTitle="Card Renewal"
        onPress={() => console.log('card')}
      />

      <FormButton
        buttonTitle="QR Code"
        btnstyle={{marginTop: 20}}
        onPress={() => setModalVisible(true)}
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
  detailsContainer: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    left: 150,
  },
  cardno: {
    color: 'white',
    fontSize: 20,
  },
  username: {
    color: 'white',
    fontSize: 16,
  },
  date: {
    color: 'white',
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Subscriptions;
