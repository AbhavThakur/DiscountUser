import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import RNBootSplash from 'react-native-bootsplash';

import {AuthContext} from './AuthProvider';
import AuthNavigation from './AuthNavigation';
import RegisterNavigator from './RegisterNavigator';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {user ? <RegisterNavigator /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Routes;
