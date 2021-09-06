import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BottomNavigator from './BottomNavigator';
import Register from '../screens/Register/Register';
import VerifyCode from '../screens/Register/VerifyCode';
import MainVerification from '../screens/MainVerification';

const Stack = createStackNavigator();

const RegisterNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'modal'}}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MainVerification} />
      <Stack.Screen name="Bottom" component={BottomNavigator} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
