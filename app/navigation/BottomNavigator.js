import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeNavigation from './HomeNavigation';
import SocialNavigator from './SocialNavigator';
import SubscriptionNavigator from './SubscriptionNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: '#D02824',
      tabBarActiveTintColor: 'white',
      tabBarInactiveBackgroundColor: '#D02824',
      tabBarInactiveTintColor: '#ccc',
      headerShown: false,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeNavigation}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/Home.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 20,
                tintColor: focused ? '#fff' : '#ccc',
              }}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Social Feeds"
      component={SocialNavigator}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/rss.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 20,
                tintColor: focused ? '#fff' : '#ccc',
              }}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Subscriptions"
      component={SubscriptionNavigator}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/subscription.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 20,
                tintColor: focused ? '#fff' : '#ccc',
              }}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/profile.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 20,
                tintColor: focused ? '#fff' : '#ccc',
              }}
            />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomNavigator;
