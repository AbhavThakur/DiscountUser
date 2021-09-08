import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Register from '../screens/Register/Register';
import MainVerification from '../screens/MainVerification';

import DrawerNavigator from './DrawerNavigator';
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();

const RegisterNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'modal'}}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MainVerification} />
      <Stack.Screen name="Bottom" component={BottomNavigator} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
