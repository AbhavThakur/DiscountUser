import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

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
            navigation.reset({
              index: 0,
              routes: [{name: 'Bottom'}],
            });
          }
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#D02824" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainVerification;
