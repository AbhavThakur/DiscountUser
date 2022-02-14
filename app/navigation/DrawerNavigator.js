import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import BottomNavigator from './BottomNavigator';
import ContactUs from '../screens/DrawerScreens/ContactUs';
import Feedback from '../screens/DrawerScreens/Feedback';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="main">
      <Drawer.Screen
        name="main"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
      <Drawer.Screen name="feedback" component={Feedback} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
