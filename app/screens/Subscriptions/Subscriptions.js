import React, {useState, useEffect} from 'react';
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Title, ActivityIndicator} from 'react-native-paper';
import FormButton from '../../components/FormButton';

function Subscriptions({navigation}) {
  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [joindate, setjoindate] = useState();
  const [cardno, setcardno] = useState();

  const [loading, setLoading] = useState(true);
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
        setjoindate(
          new Date(userData.createdAt.toDate())
            .toDateString()
            .split(' ')
            .slice(1)
            .join(' '),
        );
      });

    setLoading(false);

    return () => subscriber();
  }, []);
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
            <Text style={styles.cardno}>{cardno}</Text>
            <Text style={styles.username}>
              {name} {last}
            </Text>
            <Text style={styles.date}>Valid Date - 10/04/22</Text>
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
