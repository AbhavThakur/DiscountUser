import React, {useEffect, useState, useContext} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import * as yup from 'yup';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';

function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [contact, setcontact] = useState('');
  const [img, setImg] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [email, setEmail] = useState('');

  const [code, setCode] = useState('');

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      // Add Event Listener for hardwareBackPress
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  const isFocused = useIsFocused();
  const UserID = auth().currentUser.uid;

  useEffect(() => {
    if (isFocused) {
      const CurrentUserInfo = async () => {
        const phone = await AsyncStorage.getItem('contact');
        setcontact(phone);
        console.log('phone', phone);
      };
      CurrentUserInfo();
    }

    console.log('Register SCreen');
  }, [isFocused]);

  const startLoading = db => {
    firestore()
      .collection('Discountusers')
      .doc(UserID)
      .set({
        fname: db.name,
        lname: db.last,
        email: email,
        address: db.address,
        contact: contact,
        createdAt: firestore.Timestamp.fromDate(new Date()),
        userImg: 'https://static.thenounproject.com/png/363640-200.png',
      })
      .then(async () => {
        await AsyncStorage.setItem('fname', db.name);
        await AsyncStorage.setItem('lname', db.last);
        await AsyncStorage.setItem(
          '@createdAt',
          JSON.stringify(firestore.Timestamp.fromDate(new Date())),
        );
      })
      .then(() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Drawer'}],
        }),
      )
      .catch(() => alert('Details not submitted'));
  };

  const mail = () => {
    const params = new URLSearchParams();
    params.append('To', email);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const url = 'https://discountadda.herokuapp.com/v1/send';
    axios
      .post(url, params, config)
      .then(() => Alert.alert('OTP is sent to your mail check spam folder'))
      .catch(err => {
        console.log('error', err);
        Alert.alert('OTP is not sent to your mail check mail');
      });
  };

  const confirmCode = () => {
    const params = new URLSearchParams();
    params.append('otpnumber', code);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const url = 'https://discountadda.herokuapp.com/v1/verify';
    axios
      .post(url, params, config)
      .then(() => {
        Alert.alert('Successfully registered');
      })
      .then(() => setLoading(true))
      .catch(err => {
        console.log('error', err);
        Alert.alert(err);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Register </Text>
      {loading ? (
        <Formik
          initialValues={{
            name: '',
            last: '',
            address: '',
          }}
          onSubmit={values => startLoading(values)}
          validationSchema={yup.object().shape({
            name: yup.string().required('Please, provide your name!'),
            address: yup.string().required('Please, provide address!'),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <FormInput
                    title="First Name"
                    value={values.name}
                    style={{width: '95%'}}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    placeholderText="First Name"
                    autoCorrect={false}
                  />
                </View>
                <View style={{width: '50%'}}>
                  <FormInput
                    title="Last Name"
                    value={values.last}
                    onChangeText={handleChange('last')}
                    onBlur={() => setFieldTouched('last')}
                    placeholderText="Last Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
              {touched.name && errors.name && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.name}
                </Text>
              )}
              <FormInput title="Email" value={email} />

              <FormInput
                title="Address"
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={() => setFieldTouched('address')}
                placeholderText="Enter your Address here"
              />
              {touched.address && errors.address && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.address}
                </Text>
              )}
              <FormInput title="Contact Details" value={contact} />

              <View style={{marginTop: 30}}>
                <Button
                  color="#D02824"
                  title="Register"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      ) : (
        <View style={styles.screen}>
          <FormInput
            title="Email"
            autoFocus
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderText="Enter your Mail"
          />
          <FormButton buttonTitle="  Send  " onPress={() => mail()} />
          <FormInput
            title="Enter OTP Sent to the Mail"
            autoFocus
            value={code}
            onChangeText={text => setCode(text)}
            placeholderText="Enter your OTP here"
            keyboardType="numeric"
          />
          <FormButton
            buttonTitle="  Confirm OTP  "
            onPress={() => confirmCode()}
          />
        </View>
      )}
      <Text
        style={{
          color: '#ccc',
          fontSize: 22,
          marginTop: 30,
        }}>
        Try another account
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <View style={{flex: 1, height: 1, backgroundColor: '#E4E4E4'}} />
      </View>
      <FormButton buttonTitle="Log Out" onPress={() => logout()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#2C3A4A',
    alignItems: 'center',
    padding: 20,
    paddingTop: 5,
    flexGrow: 1,
  },
  title: {
    color: '#fff',
    marginVertical: 20,
    fontSize: 30,
  },

  spinnerTextStyle: {
    color: '#D02824',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3A4A',
    padding: 20,
  },
});

export default Register;
