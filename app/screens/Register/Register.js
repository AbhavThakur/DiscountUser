import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Button,
  Alert,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import * as yup from 'yup';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import FormInput from '../../components/FormInput';
import {AuthContext} from '../../navigation/AuthProvider';
import FormButton from '../../components/FormButton';

function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [contact, setcontact] = useState('');
  const [img, setImg] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  const logout = async () => {
    try {
      auth().signOut();

      // setuserInfo([]);
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
  }, []);

  const startLoading = db => {
    setLoading(true);
    firestore()
      .collection('Discountusers')
      .doc(auth().currentUser.uid)
      .set({
        fname: db.name,
        lname: db.last,
        email: db.email,
        address: db.address,
        contact: contact,
        createdAt: firestore.Timestamp.fromDate(new Date()),
        userImg: img,
      })
      .catch(() => alert('Details not submitted'));
    mail(db.email);
  };

  const mail = mailid => {
    const params = new URLSearchParams();
    params.append('To', mailid);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const url = 'https://discountadda.herokuapp.com/v1/send';
    axios
      .post(url, params, config)
      .then(result => {
        // console.log('result', result);
        setLoading(true);
      })
      .then(() => alert('OTP is sent to your mail check spam'))
      .catch(err => {
        console.log('error', err);
        alert('OTP is not sent to your mail check mail');
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
      .then(result => {
        alert('Successfully registered');
      })
      .then(() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Drawer'}],
        }),
      )
      .catch(err => {
        console.log('error', err);
        alert(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Register </Text>
      {loading ? (
        <View style={styles.screen}>
          <FormInput
            title="Enter OTP "
            autoFocus
            value={code}
            onChangeText={text => setCode(text)}
            placeholderText="Enter your OTP here"
            keyboardType="numeric"
          />
          <FormButton
            buttonTitle="Confirm OTP"
            onPress={() => confirmCode(code)}
          />
          <FormButton
            buttonTitle="Try another mail"
            onPress={() => setLoading(false)}
          />
        </View>
      ) : (
        <Formik
          initialValues={{
            name: '',
            last: '',
            address: '',
            email: '',
          }}
          onSubmit={values => startLoading(values)}
          validationSchema={yup.object().shape({
            name: yup.string().required('Please, provide your name!'),
            address: yup.string().required('Please, provide address!'),
            email: yup
              .string()
              .email('Invalid email format')
              .required('Required'),
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
              <FormInput
                title="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholderText="Email"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {touched.email && errors.email && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
                  {errors.email}
                </Text>
              )}
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
