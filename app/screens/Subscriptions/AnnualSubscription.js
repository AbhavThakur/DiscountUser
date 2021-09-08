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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../../components/FormButton';
import {ActivityIndicator, List, Paragraph} from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RazorpayApiKey} from '../../config/config';
import Animations from '../../components/Animations';

function AnnualSubscription({navigation}) {
  const [loading, setloading] = useState(false);

  const createOrder = async () => {
    const {data} = await axios.post(
      'https://discountaddapaymentserver.herokuapp.com/createOrder',
      {
        amount: 6000 * 100,
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

  const onPay = async () => {
    setloading(true);

    const order = await createOrder();
    var options = {
      name: 'Welocme to DiscountAdda',
      description: 'Payment to Discount Adda',
      order_id: order.id,
      key: RazorpayApiKey,
      prefill: {
        email: '',
        contact: '',
        name: '',
      },
      theme: {color: '#a29bfe'},
    };
    RazorpayCheckout.open(options)
      .then(async transaction => {
        const validSignature = await verifyPayment(order.id, transaction);
        const fname = await AsyncStorage.getItem('fname');
        const lname = await AsyncStorage.getItem('lname');
        console.log('Is Valid Payment: ' + validSignature);
        setloading(false);
        // alert('Successfully registered');
        var code = Math.floor(
          Math.pow(10, 12 - 1) +
            Math.random() * (Math.pow(10, 12) - Math.pow(10, 12 - 1) - 1),
        );
        var cardno = code
          .toString()
          .replace(/(\d{4})/g, '$1 ')
          .replace(/(^\s+|\s+$)/, '');

        firestore()
          .collection('Subscribed')
          .doc(auth().currentUser.uid)
          .set({
            subscribed: true,
            amount: 6000,
            cardno: cardno,
            fname: fname,
            lname: lname,
            subscription: 'Annual',
            createdAt: firestore.Timestamp.fromDate(new Date()),
          })
          .catch(() => alert('Regiration Failed'));
      })
      .then(() => navigation.replace('SubscriptionsCard'))
      .catch(() => {
        alert('Payment Failed.');
        navigation.navigate('SubscriptionsScreen');
        setloading(false);
      });
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
      <View flexDirection="row" style={styles.amount}>
        <Text style={styles.text}>{'\u20B9'} 6000</Text>
        <Text>/Annual</Text>
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
              title="50% off on 1st shop using the card"
              left={props => (
                <Image
                  {...props}
                  source={require('../../assets/checked.png')}
                  style={{width: 25, height: 25}}
                />
              )}
            />
          </List.Section>
          <FormButton
            buttonTitle="Subscribe"
            onPress={() => navigation.navigate('SubscriptionsCard')}
          />
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
    fontSize: 28,
  },
});

export default AnnualSubscription;
