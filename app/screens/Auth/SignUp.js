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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialButton from '../../components/SocialButton';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as yup from 'yup';
import {Formik} from 'formik';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function SignUp({navigation}) {
  // const [info, setInfo] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState('');

  // const googleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const {accessToken, idToken} = await GoogleSignin.signIn();

  //     const credential = auth.GoogleAuthProvider.credential(
  //       idToken,
  //       accessToken,
  //     );
  //     await auth().signInWithCredential(credential);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const startLoading = db => {
    signInWithPhoneNumber(db.contact);
    setLoading(true);
  };

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(
      '+91' + phoneNumber,
    );
    setConfirm(confirmation);
    await AsyncStorage.setItem('contact', phoneNumber);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.img}>
        <Image
          style={{width: windowWidth / 2.4, height: windowHeight / 4.5}}
          source={require('../../assets/Logo.png')}
        />
      </View>

      <View style={{marginTop: 30, marginBottom: 80}}>
        <Text style={styles.txt}>Welcome to Discounts Adda </Text>
        {/* <Text style={styles.txt}>DiscountAdda</Text> */}
      </View>
      {loading ? (
        <View style={styles.screen}>
          <FormInput
            title="Enter OTP"
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
            buttonTitle="Change Contact"
            onPress={() => setLoading(false)}
          />
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
                title="Contact Detail"
                value={values.contact}
                onChangeText={handleChange('contact')}
                onBlur={() => setFieldTouched('contact')}
                placeholderText="Enter your Phone Number here"
                keyboardType="phone-pad"
              />
              {touched.contact && errors.contact && (
                <Text style={{fontSize: 12, color: '#FF0D10'}}>
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
