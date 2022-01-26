import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, Text, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useIsFocused} from '@react-navigation/native';

import Subscriptions from '../screens/Subscriptions/Subscriptions';
import SubscriptionTopNavigator from './SubscriptionTopNavigator';
import Animations from '../components/Animations';
import {API_URL, API_VERSION, Endpoint} from '../config/config';

const Stack = createStackNavigator();

const SubscriptionNavigator = ({navigation}) => {
  const [subscribe, setsubscribe] = useState(null);
  const {uid} = auth().currentUser;
  const isFocused = useIsFocused();

  let routeName;

  useEffect(() => {
    if (isFocused) {
      firestore()
        .collection('Subscribed')
        .doc(uid)
        .get()
        .then(async function (documentSnapshot) {
          if (documentSnapshot.exists === false) {
            setsubscribe(false);
          }

          console.log('User subscribed: ', documentSnapshot.exists);

          if (documentSnapshot.exists === true) {
            let currentdate = moment().format();
            let daysCount = moment(documentSnapshot.data().expiryAt).diff(
              currentdate,
              'days',
            );
            if (daysCount > 0) {
              setsubscribe(true);
            } else if (daysCount < 3 && daysCount > 0) {
              Alert.alert(
                `Subscriptions is going to Expire in ${daysCount} days`,
              );
            }
            if (daysCount <= 0) {
              setsubscribe(false);
              Alert.alert(
                `Your Subscriptions is already Expired  ${-daysCount} days back`,
              );
              DeleteCard();
              firestore().collection('Subscribed').doc(uid).update({
                subscribed: false,
              });
            }
          }
        });
    }
  }, [uid, isFocused]);

  const DeleteCard = async () => {
    const cont = await AsyncStorage.getItem('contact');
    axios.delete(`${API_URL}/${API_VERSION}/${Endpoint.DeleteCard}/${cont}`);
  };

  if (subscribe === null) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Animations source={require('../assets/Animation/waiting.json')} />
      </View>
    );
  } else if (subscribe === true) {
    routeName = 'SubscriptionsCard';
  } else {
    routeName = 'SubscriptionsScreen';
  }
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
      }}
      initialRouteName={routeName}>
      <Stack.Screen
        name="SubscriptionsScreen"
        component={SubscriptionTopNavigator}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{marginStart: 10}}
              onPress={() => navigation.goBack()}>
              <Image source={require('../assets/left-arrow.png')} />
            </TouchableOpacity>
          ),
          headerTitle: 'Subscription',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#2C3A4A'},
          headerTitleStyle: {color: '#fff'},
        }}
      />
      <Stack.Screen
        name="SubscriptionsCard"
        component={Subscriptions}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{marginStart: 10}}
              onPress={() => navigation.goBack()}>
              <Image source={require('../assets/left-arrow.png')} />
            </TouchableOpacity>
          ),
          headerTitle: 'Scan your Card here !!',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#2C3A4A'},
          headerTitleStyle: {color: '#fff'},
        }}
      />
    </Stack.Navigator>
  );
};

export default SubscriptionNavigator;
