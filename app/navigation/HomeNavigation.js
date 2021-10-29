import React from 'react';
import {Image, View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Category from '../screens/Home/Category';
import GroceryList from '../screens/Home/GroceryList';
import ShopView from '../screens/Home/ShopView';
import Notification from '../screens/Notification/Notification';
import ViewImage from '../screens/Home/ViewImage';

const Stack = createStackNavigator();

const Headerleft = ({onPress}) => (
  <View style={styles.headerstyle}>
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/menu.png')}
        style={{width: 25, height: 25, marginEnd: 10}}
      />
    </TouchableOpacity>
    <Image
      source={require('../assets/discounticon.png')}
      style={{width: 50, height: 50}}
    />
  </View>
);

const Headerright = ({onPress, onPresscard}) => (
  <View style={styles.headerrightstyle}>
    <TouchableOpacity onPress={onPress} style={{marginEnd: 10}}>
      <Image
        source={require('../assets/notification.png')}
        style={{width: 25, height: 30}}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onPresscard}>
      <Image
        source={require('../assets/card.png')}
        style={{width: 50, height: 50}}
      />
    </TouchableOpacity>
  </View>
);

const HomeNavigation = ({navigation}) => {
  return (
    <Stack.Navigator presentation="card" initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerLeft: () => (
            <Headerleft onPress={() => navigation.openDrawer()} />
          ),
          headerTitle: ' ',
          headerRight: () => (
            <Headerright
              onPress={() => navigation.navigate('Notification')}
              onPresscard={() => navigation.navigate('Subscriptions')}
            />
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={Category}
        options={{
          headerLeft: () => (
            <Headerleft onPress={() => navigation.openDrawer()} />
          ),
          headerTitle: ' ',
          headerRight: () => (
            <Headerright onPress={() => navigation.navigate('Notification')} />
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Grocery"
        component={GroceryList}
        options={{
          headerLeft: () => (
            <Headerleft onPress={() => navigation.openDrawer()} />
          ),
          headerTitle: ' ',
          headerRight: () => (
            <Headerright onPress={() => navigation.navigate('Notification')} />
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Shop"
        component={ShopView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewImage"
        component={ViewImage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 10,
    justifyContent: 'center',
  },
  headerrightstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 10,
  },
});

export default HomeNavigation;
