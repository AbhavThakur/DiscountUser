import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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

  const [loading, setLoading] = useState(false);
  const {uid} = auth().currentUser;

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('Subscribed')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const userData = documentSnapshot.data();
        setName(userData.fname);
        setLast(userData.lname);
        setcardno(userData.cardno);
        setexpirydate(userData.expiry);
        setexpiry(userData.expiryAt);

        console.log(
          'expiry time left',
          moment().diff(userData.expiryAt, 'days'),
        );
      });
    setLoading(false);

    return () => subscriber();
  }, [uid]);

  return (
    <View style={styles.container}>
      <Title>Hurray!! Get your products</Title>
      <Title>at max discount !!</Title>

      {loading ? (
        <ActivityIndicator animating={true} color="#D02824" />
      ) : (
        <View style={styles.imgContainer}>
          <Image source={require('../../assets/cardlogo.png')} />
          <View style={styles.detailsContainer}>
            <QRCode
              value={cardno.split(' ').join('')}
              logoSize={30}
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
});

export default Subscriptions;
