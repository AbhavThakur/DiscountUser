import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AnnualSubscription from '../screens/Subscriptions/AnnualSubscription';
import HalfYearlySubs from '../screens/Subscriptions/HalfYearlySubs';

const Tab = createMaterialTopTabNavigator();

function SubscriptionTopNavigator(props) {
  return (
    <Tab.Navigator
      initialRouteName="Annual"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      <Tab.Screen name="Annual" component={AnnualSubscription} />
      <Tab.Screen name="Half Yearly" component={HalfYearlySubs} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SubscriptionTopNavigator;
