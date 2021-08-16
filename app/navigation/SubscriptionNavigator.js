import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import Subscriptions from '../screens/Subscriptions/Subscriptions';
import SubscriptionTopNavigator from './SubscriptionTopNavigator';

const Stack = createStackNavigator();

const SubscriptionNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
      }}
      initialRouteName="SubscriptionScreen">
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
