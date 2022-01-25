import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Socialfeed from '../screens/Social/Socialfeed';
import StoreView from '../screens/Social/StoreView';

const Stack = createStackNavigator();

const SocialNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
      initialRouteName="Social">
      <Stack.Screen name="Social" component={Socialfeed} />
      <Stack.Screen name="Store" component={StoreView} />
    </Stack.Navigator>
  );
};

export default SocialNavigator;
