import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import {RazorpayApiKey} from '../../config/config';
import Animations from '../../components/Animations';
import FormButton from '../../components/FormButton';
import cardno from '../../constants/Cardno';

function AnnualSubscription({navigation}) {
  const [loading, setloading] = useState(false);
  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [contact, setContact] = useState('');
  const [img, setImg] = useState();
  const [mail, setEmail] = useState('');
  const {uid} = auth().currentUser;

  const createOrder = async () => {
    const {data} = await axios.post(
      'https://discountaddapaymentserver.herokuapp.com/createOrder',
      {
        amount: 430.7 * 100,
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
  }, []);

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
          // alert('Successfully registered');

          var currentDate = moment().format();
          var expirydate = moment(currentDate)
            .add(12, 'month')
            .format('DD MMM YYYY');
          var expiryat = moment(currentDate).add(12, 'month').format();

          const value = {
            firstName: name,
            lastName: last,
            contactNumber: contact,
            cardNumber: cardno,
            email: mail,
            image: img,
            expiryDate: expirydate,
            dateCreated: createAt,
            subscribed: true,
            amount: 365,
            subscription: 'Annual',
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
              'https://usercard.herokuapp.com/api/v1/AddDetails/',
              value,
              config,
            )
            .catch(err => console.error(err));

          firestore()
            .collection('Subscribed')
            .doc(uid)
            .set(value)
            .then(() => navigation.replace('SubscriptionsCard'))
            .catch(() => Alert.alert('Registration Failed'));
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
        <Text style={styles.text}>{'\u20B9'} 1999</Text>
        <Text> 365/Annual</Text>
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
    textDecorationStyle: 'solid',
  },
});

export default AnnualSubscription;
