import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnBoardingScreen from '../screens/OnBoardingScreen';

import SignUp from '../screens/Auth/SignUp';

const Stack = createStackNavigator();

function AuthNavigation() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
    console.log('authnavigation');
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'OnBoard';
  } else {
    routeName = 'SignUp';
  }
  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoard" component={OnBoardingScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
