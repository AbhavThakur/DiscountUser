import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AnnualSubscription from '../screens/Subscriptions/AnnualSubscription';
import HalfYearlySubs from '../screens/Subscriptions/HalfYearlySubs';
import MonthlySubscription from '../screens/Subscriptions/MonthlySubscription';
import Animations from '../components/Animations';

const Tab = createMaterialTopTabNavigator();

function SubscriptionTopNavigator(props) {
  const [subscribe, setsubscribe] = useState(null);
  const {uid} = auth().currentUser;
  const isFocused = useIsFocused();

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

  return (
    <Tab.Navigator
      initialRouteName="Half Yearly"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      {subscribe ? null : (
        <Tab.Screen name="Monthly" component={MonthlySubscription} />
      )}
      <Tab.Screen name="Half Yearly" component={HalfYearlySubs} />
      <Tab.Screen name="Annual" component={AnnualSubscription} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SubscriptionTopNavigator;
