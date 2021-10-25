import React, {createContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {
  const [user, setUser] = useState(null);
  const [confirm, setConfirm] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        googleLogin: async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();

            const credential = auth.GoogleAuthProvider.credential(
              idToken,
              accessToken,
            );
            await auth().signInWithCredential(credential);
          } catch (error) {
            console.log(error);
          }
        },

        phone: async phoneNumber => {
          try {
            const confirmation = await auth().signInWithPhoneNumber(
              '+91' + phoneNumber,
            );

            setConfirm(confirmation);
          } catch (error) {
            console.log(error);
          }
        },
        confirmCode: async (code, screen) => {
          try {
            await confirm.confirm(code);
          } catch (error) {
            console.log('Invalid code.');
          }
        },
        logout: async () => {
          try {
            auth().signOut();
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
