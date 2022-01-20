import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../../components/FormButton';
import {ActivityIndicator, List, Paragraph} from 'react-native-paper';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  API_URL,
  API_VERSION,
  Endpoint,
  RazorpayApiKey,
} from '../../config/config';
import Animations from '../../components/Animations';
import cardno from '../../constants/Cardno';

function HalfYearlySubs({navigation}) {
  const [loading, setloading] = useState(false);
  const {uid} = auth().currentUser;

  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [contact, setContact] = useState('');
  const [mail, setEmail] = useState('');

  const [img, setImg] = useState();

  const isFocused = useIsFocused();

  const createOrder = async () => {
    const {data} = await axios.post(
      'https://discountaddapaymentserver.herokuapp.com/createOrder',
      {
        amount: 224.2 * 100,
        currency: 'INR',
      },
    );
    return data;
  };
  const verifyPayment = async (orderID, transaction) => {
    const {data} = await axios.post(
      'https://discountaddapaymentserver.herokuapp.com/verifySignature',
      {
        orderID: orderID,
        transaction: transaction,
      },
    );
    return data.validSignature;
  };

  useEffect(() => {
    if (isFocused) {
      firestore()
        .collection('Discountusers')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          const userData = documentSnapshot.data();
          setName(userData.fname);
          setLast(userData.lname);
          setContact(userData.contact);
          setEmail(userData.email);
          setImg(userData.userImg);
        });
      if (img === null) {
        Alert.alert('Please add an image to your Profile');
      }
    }
  }, [isFocused]);

  const onPay = async () => {
    if (img !== null) {
      setloading(true);
      const order = await createOrder();
      var options = {
        name: 'Welcome to DiscountAdda',
        description: 'Payment to Discount Adda',
        order_id: order.id,
        key: RazorpayApiKey,
        prefill: {
          email: mail,
          contact: contact,
          name: name + last,
        },
        theme: {color: '#a29bfe'},
      };
      RazorpayCheckout.open(options)
        .then(async transaction => {
          const validSignature = await verifyPayment(order.id, transaction);
          // console.log('Is Valid Payment: ' + validSignature);
          const createAt = await AsyncStorage.getItem('@createdAt');

          setloading(false);

          var currentDate = moment().format();
          var expirydate = moment(currentDate)
            .add(6, 'month')
            .format('DD/MM/YYYY');
          var expiryat = moment(currentDate).add(6, 'month').format();

          const value = {
            firstName: name,
            lastName: last,
            contactNumber: contact,
            cardNumber: cardno,
            image: img,
            expiryDate: expirydate,
            dateCreated: createAt,
            subscribed: true,
            amount: 195,
            subscription: 'Half yealy',
            expiryAt: expiryat,
          };

          let config = {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
          };
          axios
            .post(
              `${API_URL}/${API_VERSION}/${Endpoint.AddCardDetails}`,
              value,
              config,
            )
            .catch(err => console.error(err));
          firestore()
            .collection('Subscribed')
            .doc(uid)
            .set(value)
            .then(() => navigation.replace('SubscriptionsCard'))
            .catch(() => Alert.alert('Regiration Failed'));
        })
        .catch(() => {
          Alert.alert('Payment Failed.');
          navigation.navigate('SubscriptionsScreen');
        })
        .finally(() => {
          setloading(false);
        });
    } else if (img === null) {
      Alert.alert('Please add an image to your Profile');
    }
  };

  // const onPay = async () => {
  //   const createAt = await AsyncStorage.getItem('@createdAt');

  //   setloading(false);

  //   var currentDate = moment().format();
  //   var expirydate = moment(currentDate).add(6, 'month').format('DD MMM YYYY');
  //   var expiryat = moment(currentDate).add(6, 'month').format();

  //   const value = {
  //     firstName: name,
  //     lastName: last,
  //     contactNumber: contact,
  //     cardNumber: cardno,
  //     image: img,
  //     expiryDate: expirydate,
  //     dateCreated: createAt,
  //     subscribed: true,
  //     amount: 195,
  //     subscription: 'Half yealy',
  //     expiryAt: expiryat,
  //   };

  //   let config = {
  //     headers: {
  //       accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   axios
  //     .post('https://usercard.herokuapp.com/api/v1/AddDetails/', value, config)
  //     .catch(err => console.error(err));
  //   firestore()
  //     .collection('Subscribed')
  //     .doc(uid)
  //     .set(value)
  //     .then(() => navigation.replace('SubscriptionsCard'))
  //     .catch(() => Alert.alert('Regiration Failed'));
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/subscribed_card.png')}
        style={{
          width: '100%',
          height: '92%',
          maxHeight: Dimensions.get('window').height * 0.35,
        }}>
        <Image source={require('../../assets/subs.png')} />
      </ImageBackground>
      <View flexDirection="column" style={styles.amount}>
        <Text style={styles.text}>{'\u20B9'} 999</Text>
        <Text>190 / HalfYearly</Text>
      </View>
      {loading ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Animations source={require('../../assets/Animation/waiting.json')} />
        </View>
      ) : (
        <View style={{padding: 15}}>
          <List.Section>
            <Text style={{fontSize: 16, marginBottom: 10}}>
              In addition to all the features in Half Yearly, Annual also
              includes:
            </Text>
            <List.Item
              title="Access on all types of shops"
              left={props => (
                <Image
                  {...props}
                  source={require('../../assets/checked.png')}
                  style={{width: 25, height: 25}}
                />
              )}
            />
            <List.Item
              title="Special Discounts on shop above worth  rupee 5000"
              titleNumberOfLines={2}
              left={props => (
                <Image
                  {...props}
                  source={require('../../assets/checked.png')}
                  style={{width: 25, height: 25}}
                />
              )}
            />
            <List.Item
              title="Access more than 2000 + stores"
              left={props => (
                <Image
                  {...props}
                  source={require('../../assets/checked.png')}
                  style={{width: 25, height: 25}}
                />
              )}
            />
          </List.Section>
          <FormButton buttonTitle="Subscribe" onPress={() => onPay()} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  amount: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    color: '#000',
    fontSize: 22,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'dotted',
  },
});

export default HalfYearlySubs;
