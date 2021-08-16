import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from '../screens/Profile/Profile';
import EditProfile from '../screens/Profile/EditProfile';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
      initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfile}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
