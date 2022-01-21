import React, {useContext, useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';

import {AuthContext} from './AuthProvider';
import AuthNavigation from './AuthNavigation';
import RegisterNavigator from './RegisterNavigator';
import FormButton from '../components/FormButton';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [message, setmessage] = useState(false);
  const [notification, setNotification] = useState({
    title: undefined,
    body: undefined,
    image: undefined,
  });

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  const getToken = async () => {
    await messaging().getToken();
  };

  useEffect(() => {
    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setmessage(true);
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
      setmessage(true);

      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
          setmessage(true);
          setNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: remoteMessage.notification.android.imageUrl,
          });
        }
      });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (message) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <Image
          source={{uri: notification?.image}}
          style={{width: '100%', height: '35%', borderRadius: 7}}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>{` ${notification?.title}`}</Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
          }}>{` ${notification?.body}`}</Text>
        <FormButton buttonTitle={'Close'} onPress={() => setmessage(false)} />
      </View>
    );
  }

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {user ? <RegisterNavigator /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Routes;
