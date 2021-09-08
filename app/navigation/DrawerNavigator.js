import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import BottomNavigator from './BottomNavigator';
import HomeNavigation from './HomeNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="main">
      <Drawer.Screen
        name="main"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      {/* <Drawer.Screen
        name="Home"
        component={HomeNavigation}
        options={{headerShown: false}}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
