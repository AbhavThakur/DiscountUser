import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Animations from '../components/Animations';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainVerification({navigation}) {
  const {uid} = auth().currentUser;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      firestore()
        .collection('Discountusers')
        .doc(uid)
        .get()
        .then(async function (documentSnapshot) {
          if (documentSnapshot.exists === false) {
            navigation.navigate('register');
          }

          console.log('User exists: ', documentSnapshot.exists);

          if (documentSnapshot.exists === true) {
            await AsyncStorage.setItem('fname', documentSnapshot.data().fname);
            await AsyncStorage.setItem('lname', documentSnapshot.data().lname);
            await AsyncStorage.setItem('img', documentSnapshot.data().userImg);

            navigation.reset({
              index: 0,
              routes: [{name: 'Drawer'}],
            });
          }
        });
    }
  }, [uid, isFocused, navigation]);

  return (
    <View style={styles.container}>
      <Animations source={require('../assets/Animation/loader.json')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainVerification;
