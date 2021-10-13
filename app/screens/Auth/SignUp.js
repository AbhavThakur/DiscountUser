import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialButton from '../../components/SocialButton';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as yup from 'yup';
import {Formik} from 'formik';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import Animations from '../../components/Animations';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function SignUp({navigation}) {
  // const [info, setInfo] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [number, setnumber] = useState('');
  const [timerCount, setTimer] = useState(30);

  const [code, setCode] = useState('');

  const startLoading = db => {
    signInWithPhoneNumber(db.contact);
    setnumber(db.contact);
    setLoading(true);
  };

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(
      '+91' + phoneNumber,
    );
    setConfirm(confirmation);
    await AsyncStorage.setItem('contact', phoneNumber);
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
      Alert.alert('Invalid otp check again!');
    }
  }

  return (
    <SafeAreaView style={styles.scrollView}>
      {loading ? null : (
        <View style={styles.img}>
          <Image
            style={{width: windowWidth / 2.4, height: windowHeight / 4.5}}
            source={require('../../assets/Logo.png')}
          />
        </View>
      )}

      <View style={{marginTop: 30, marginBottom: loading ? 50 : 70}}>
        {loading ? null : (
          <Text style={styles.txt}>Welcome to Discounts Adda </Text>
        )}
      </View>
      {loading ? (
        <View style={styles.screen}>
          <View style={styles.animation}>
            <Animations source={require('../../assets/Animation/otp.json')} />
          </View>

          <FormInput
            title="Enter OTP"
            autoFocus
            value={code}
            onChangeText={text => setCode(text)}
            placeholderText="Enter your 6 digits OTP here"
            keyboardType="numeric"
          />
          <Text style={{color: '#fff', fontSize: 15}}>
            Get otp in {timerCount}
          </Text>
          <FormButton
            buttonTitle="Confirm OTP"
            btnstyle={{width: 150}}
            onPress={() => confirmCode(code)}
          />
          <View style={{flexDirection: 'row'}}>
            {timerCount === 0 ? (
              <FormButton
                buttonTitle="Resend OTP"
                btnstyle={{width: 140, marginEnd: 20}}
                onPress={() => signInWithPhoneNumber(number)}
              />
            ) : null}
            <FormButton
              buttonTitle="Change Contact"
              btnstyle={{width: 160}}
              onPress={() => setLoading(false)}
            />
          </View>
        </View>
      ) : (
        <Formik
          initialValues={{
            contact: '',
          }}
          onSubmit={values => startLoading(values)}
          validationSchema={yup.object().shape({
            contact: yup
              .string()
              .required()
              .matches(/^[0-9]+$/, 'Must be only digits')
              .min(10, 'Must be exactly 10 digits')
              .max(10, 'Must be exactly 10 digits'),
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
              <FormInput
                title="Login \ Register"
                value={values.contact}
                onChangeText={handleChange('contact')}
                onBlur={() => setFieldTouched('contact')}
                placeholderText="Enter your Phone Number here"
                keyboardType="phone-pad"
              />
              {touched.contact && errors.contact && (
                <Text style={{fontSize: 15, color: '#FF0D10'}}>
                  {errors.contact}
                </Text>
              )}

              <View style={{marginTop: 30}}>
                <Button
                  color="#D02824"
                  title="Login"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#2C3A4A',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  img: {
    width: windowWidth / 2.2,
    height: windowHeight / 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginTop: 30,
  },
  animation: {
    width: windowWidth,
    height: windowHeight / 3.5,
  },
  txt: {
    color: '#ccc',
    fontSize: 22,
    marginTop: 5,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ccc',
    fontFamily: 'Lato-Regular',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3A4A',
    padding: 10,
  },
});

export default SignUp;
