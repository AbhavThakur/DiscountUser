import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

import FormButton from '../../components/FormButton';
import FormText from '../../components/FormText';
import {AuthContext} from '../../navigation/AuthProvider';

function Profile({navigation}) {
  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [mail, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [img, setImg] = useState(null);

  const {uid} = auth().currentUser;

  const [date, setdate] = useState('');
  const [joindate, setjoindate] = useState('');

  const [loading, setLoading] = useState(true);

  const {logout, signOut} = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      firestore()
        .collection('Discountusers')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          const userData = documentSnapshot.data();
          setName(userData.fname);
          setLast(userData.lname);
          setEmail(userData.email);
          setAddress(userData.address);
          setContact(userData.contact);
          setImg(userData.userImg);
          setdate(userData.dob);
          setjoindate(
            new Date(userData.createdAt.toDate())
              .toDateString()
              .split(' ')
              .slice(1)
              .join(' '),
          );

          setLoading(false);
        });
    }
  }, [isFocused, uid]);

  const DeleteDetails = () => {
    const data = {
      Name: name + ' ' + last,
      Email: mail,
      Contact: contact,
      Address: address,
      Joindate: joindate,
      DeletedAt: new Date().toLocaleString(),
    };
    console.log(
      '🚀😄 ~ file: Profile.js ~ line 74 ~ DeleteDetails ~ data',
      data,
    );
    firestore()
      .collection('DeleteDetailsUserApp')
      .doc(uid)
      .set(data)
      .finally(() => signOut());
  };

  const DeleteAccount = () => {
    Alert.alert(
      //title
      'Delete Account',
      //body
      'Are you sure you want to delete the Account ?',
      [
        {
          text: 'Yes',
          onPress: () => ConfirmDeleteAccount(),
        },
        {
          text: 'No',
        },
      ],
      {cancelable: true},
    );
  };
  const ConfirmDeleteAccount = () => {
    Alert.alert(
      //title
      'Confirm Delete Account',
      //body
      'It will delete all ypur exisiting data from account?',
      [
        {
          text: 'Yes',
          onPress: () => DeleteDetails(),
        },
        {
          text: 'No',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: '#2C3A4A',
          height: 38,
        }}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/left-arrow.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfileScreen')}
          style={{
            padding: 10,
            flexDirection: 'row',
            position: 'absolute',
            right: 10,
          }}>
          <Image source={require('../../assets/editprofile.png')} />
          <Text
            style={{
              color: '#fff',
              marginEnd: 10,
              marginStart: 10,
              fontSize: 16,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            size="large"
            color="#D02824"
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <View>
            <View style={styles.imgcontainer}>
              {/* <Image
              style={styles.image}
              source={require('../../assets/abhav.jpg')}
            /> */}

              <Image
                style={styles.image}
                source={{
                  uri:
                    img === null
                      ? 'https://static.thenounproject.com/png/363640-200.png'
                      : img,
                }}
              />

              <Text style={styles.imgtxt}>USER SINCE {joindate}</Text>
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <FormText
                    title="First Name"
                    value={name}
                    style={{width: '95%'}}
                  />
                </View>
                <View style={{width: '50%'}}>
                  <FormText title="Last Name" value={last} />
                </View>
              </View>

              <FormText title="Email" value={mail} />

              <FormText title="Address" value={address} />
              <FormText title="Date of birth" value={date} />
              <FormText title="Mobile Number" value={' +91' + ' ' + contact} />
            </View>
          </View>
        )}

        <FormButton buttonTitle="Logout" onPress={() => logout()} />
        <FormButton
          buttonTitle="Delete Account"
          onPress={() => DeleteAccount()}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2C3A4A',
    alignItems: 'center',
    padding: 15,
  },
  imgcontainer: {
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  imgtxt: {
    color: '#fff',
    paddingTop: 10,
    fontSize: 16,
  },
  dob: {
    color: '#fff',
    fontSize: 20,
  },
  spinnerTextStyle: {
    color: '#D02824',
  },
});

export default Profile;
