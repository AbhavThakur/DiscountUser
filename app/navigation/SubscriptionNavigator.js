import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {useIsFocused} from '@react-navigation/native';

import Subscriptions from '../screens/Subscriptions/Subscriptions';
import SubscriptionTopNavigator from './SubscriptionTopNavigator';
import Animations from '../components/Animations';

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
            setsubscribe(true);
          }
        });
    }
  }, [uid, isFocused]);

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
          // headerLeft: () => (
          //   <TouchableOpacity
          //     style={{marginStart: 10}}
          //     onPress={() => navigation.goBack()}>
          //     <Image source={require('../assets/left-arrow.png')} />
          //   </TouchableOpacity>
          // ),
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
