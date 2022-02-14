import React, {useEffect, useState} from 'react';
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

import * as yup from 'yup';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';

function Register({navigation}) {
  const [contact, setcontact] = useState('');

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
        email: db.email,
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
      .catch(() => Alert.alert('Details not submitted'));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Register </Text>

      <Formik
        initialValues={{
          name: '',
          last: '',
          email: '',
          address: '',
        }}
        onSubmit={values => startLoading(values)}
        validationSchema={yup.object().shape({
          name: yup.string().required('Please, provide your name!'),
          email: yup
            .string()
            .required('Please, provide your email address!')
            .email(),
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

            <FormInput
              title="Email ID"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholderText="Enter your Email Address"
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
