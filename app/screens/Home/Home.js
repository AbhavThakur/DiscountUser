import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import GetLocation from 'react-native-get-location';

import {Info} from '../../constants/Categories';
import Slider from '../../utils/ImageCarousel';
import {API_URL, API_VERSION, Endpoint} from '../../config/config';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Home(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount, setamount] = useState([]);
  const [Savedamount, setSavedamount] = useState([]);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };
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
            props.navigation.navigate('register');
          }

          console.log('User exists: ', documentSnapshot.exists);

          if (documentSnapshot.exists === true) {
            await AsyncStorage.setItem('fname', documentSnapshot.data().fname);
            await AsyncStorage.setItem('lname', documentSnapshot.data().lname);

            await AsyncStorage.setItem(
              'img',
              documentSnapshot.data().userImg === null
                ? 'https://static.thenounproject.com/png/363640-200.png'
                : documentSnapshot.data().userImg,
            );
            await AsyncStorage.setItem(
              '@createdAt',
              new Date(documentSnapshot.data().createdAt.toDate())
                .toDateString()
                .split(' ')
                .slice(1)
                .join(' '),
            );
          }
        });
      firestore()
        .collection('Subscribed')
        .doc(uid)
        .get()
        .then(async function (documentSnapshot) {
          if (documentSnapshot.exists === false) {
            setModalVisible(true);
          }
          // console.log('User subscribed: ', documentSnapshot.exists);

          if (documentSnapshot.exists) {
            UserDiscount(documentSnapshot.data().cardNumber);
            // console.log(documentSnapshot.data().subscribed);
            if (documentSnapshot.data().subscribed === true) {
              setModalVisible(false);
            } else if (documentSnapshot.data().subscribed === false) {
              setModalVisible(true);
            }
          }
        });
      UserLocation();
    }
  }, [isFocused]);

  const UserDiscount = card => {
    const Discountlist = `${API_URL}/${API_VERSION}/${Endpoint.discount}/${card}`;
    // eslint-disable-next-line no-undef
    fetch(Discountlist)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.success === true) {
          // console.log('array size', resJson.discountList.length);
          setSavedamount([]);
          setamount([]);
          for (let i = 0; i < resJson.discountList.length; i++) {
            setamount(amt => [...amt, resJson.discountList[i].amount]);
            setSavedamount(amt => [
              ...amt,
              resJson.discountList[i].amountsaved,
            ]);
          }
        } else {
          setamount([]);
          setSavedamount([]);
        }
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  const UserLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then(location => {
        console.log(
          '🚀👨🏻‍💻 ~ file: Home.js ~ line 127 ~ UserLocation ~ location',
          location,
        );
      })
      .catch(ex => {
        const {code} = ex;
        if (code === 'CANCELLED') {
          Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          Alert.alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }
      });
  };

  return (
    <>
      <View style={styles.header}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.txt}>Total Amount Spent</Text>
          <Text style={styles.txt}>
            {'\u20B9'} {amount.reduce((a, b) => a + b, 0)}
          </Text>
        </View>
        <View style={styles.verticleLine} />

        <View style={{alignItems: 'center'}}>
          <Text style={styles.txt}>Amount Saved</Text>
          <Text style={styles.txt}>
            {'\u20B9'} {Savedamount.reduce((a, b) => a + b, 0)}
          </Text>
        </View>
      </View>
      {/* Slider for image */}
      <Slider />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}>
        {isModalVisible ? (
          <View style={styles.category}>
            <TouchableOpacity
              activeOpacity="0.7"
              style={styles.modaelheader}
              onPress={() => props.navigation.navigate('Subscriptions')}>
              <Text style={{fontSize: 22, color: '#fff'}}>Subscribe</Text>
            </TouchableOpacity>
            <Card style={{height: 200}}>
              <Card.Content>
                <Title>Subscribe to discount adda </Title>
                <Paragraph>
                  Please subscribe to the discount adda to avail all the offer
                </Paragraph>
              </Card.Content>
              <Card.Actions
                style={{alignItems: 'center', justifyContent: 'space-around'}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: '#D02824', width: 100}}
                  onPress={() => props.navigation.navigate('Subscriptions')}>
                  Now
                </Button>
              </Card.Actions>
            </Card>
          </View>
        ) : (
          <View style={styles.category}>
            {Info.map((item, index) => {
              return (
                <View key={index} style={styles.subcategory}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() =>
                      props.navigation.navigate(item.screen, {
                        ShopName: item.name,
                        Categoryitem: item.category,
                        Type: item.type,
                      })
                    }>
                    <Image
                      source={item.img}
                      style={{width: item.width, height: item.height}}
                    />
                    <Text style={styles.subtxt}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* top categories */}
        <Title style={styles.title}>Discounts on Top Catogories</Title>
        <Image
          source={require('../../assets/sale.png')}
          style={{marginBottom: 10}}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#D02824',
    height: windowHeight / 12,
    width: windowWidth,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  verticleLine: {
    height: windowHeight / 10,
    width: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  txt: {
    color: '#fff',
    fontSize: 16,
  },
  category: {
    width: windowWidth,
    height: 420,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  subcategory: {
    margin: 10,
  },
  subtxt: {
    color: '#293645',
    fontSize: 12,
    alignSelf: 'center',
  },
  modelContaner: {
    backgroundColor: '#fff',
    width: windowWidth,
    height: windowHeight * 0.3,
  },

  modaelheader: {
    marginHorizontal: 10,
    backgroundColor: '#D02824',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  title: {
    marginVertical: 13,
    alignSelf: 'flex-start',
    marginStart: 30,
  },
});

export default Home;
