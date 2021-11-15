import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Modal,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Rating, AirbnbRating} from 'react-native-ratings';

function RatingReview({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [value, setvalue] = useState([]);
  const [response, setresponse] = useState('');
  const [review, setReview] = useState('');
  const [ratingvalue, setrating] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modaledit, setModalEdit] = useState(false);
  const [editreview, setEditreview] = useState(null);

  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [contact, setContact] = useState('');
  const [img, setImg] = useState(null);

  const shopdetails = route.params;

  const {uid} = auth().currentUser;

  useEffect(() => {
    Info();
  }, []);

  const Info = async () => {
    const Feedbacklist = `https://usercard.herokuapp.com/api/v1/feedbacklist/${shopdetails.Shopid}`;
    fetch(Feedbacklist)
      .then(res => res.json())
      .then(resJson => {
        // console.log('data', resJson);
        if (resJson.success === true) {
          setvalue(resJson.feedbacklist);
          setresponse('');
        } else {
          setresponse('No Review  found');
        }
      })
      .catch(err => {
        console.log('Error: ', err);
      })
      .finally(() => setLoading(false));

    const cont = await AsyncStorage.getItem('contact');
    const userFeedback = `https://usercard.herokuapp.com/api/v1/feedbackuser/${cont}&${shopdetails.Shopid}`;
    fetch(userFeedback)
      .then(res => res.json())
      .then(resJson => {
        console.log('data', resJson);
        if (resJson.success === true) {
          setEditreview(true);
        } else if (resJson.success === false) {
          setEditreview(false);
        }
      })
      .catch(err => {
        console.log('Error: ', err);
      });
    firestore()
      .collection('Discountusers')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        const userData = documentSnapshot.data();
        setName(userData.fname);
        setLast(userData.lname);
        setContact(userData.contact);
        setImg(userData.userImg);
      });
  };

  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    setrating(rating);
  }

  const AddReview = async () => {
    var currentDate = moment().format('DD/MM/YYYY');

    const valueinfo = {
      merchantId: shopdetails.Shopid,
      contact: contact,
      userName: name + ' ' + last,
      comment: review,
      img:
        img === null
          ? 'https://static.thenounproject.com/png/363640-200.png'
          : img,
      rating: ratingvalue === undefined ? 3 : ratingvalue,
      dateCreated: currentDate,
    };
    console.log(
      '🚀😄 ~ file: RatingReview.js ~ line 80 ~ AddReview ~ valueinfo',
      valueinfo,
    );

    let config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(
        'https://usercard.herokuapp.com/api/v1/feedback/',
        valueinfo,
        config,
      )
      .then(() => {
        Alert.alert('Successfully added');
        Info();
        setModalVisible(false);
      })
      .catch(err => console.error(err));
  };
  const EditReview = async () => {
    var currentDate = moment().format('DD/MM/YYYY');

    const valueinfo = {
      userName: name + ' ' + last,
      comment: review,
      img:
        img === null
          ? 'https://static.thenounproject.com/png/363640-200.png'
          : img,
      rating: ratingvalue === undefined ? 3 : ratingvalue,
      dateCreated: currentDate,
    };
    console.log(
      '🚀😄 ~ file: RatingReview.js ~ line 118 ~ EditReview ~ valueinfo',
      valueinfo,
    );

    let config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    axios
      .put(
        `https://usercard.herokuapp.com/api/v1/editfeedback/${contact}&${shopdetails.Shopid}`,
        valueinfo,
        config,
      )
      .then(() => {
        Alert.alert('Successfully Updated');
        Info();
        setModalEdit(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/left-arrow.png')} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Ratings & Reviews</Text>
          <Text style={styles.description}>{shopdetails.ShpName} Stores</Text>
        </View>
      </View>
      {/* Rating section */}
      <View style={styles.ratingSection}>
        <View
          style={{
            // backgroundColor: 'yellow',
            width: 120,
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
            marginStart: 10,
          }}>
          <Text style={{fontSize: 27, color: 'green'}}>
            5 <Text style={{fontSize: 17, color: '#ccc'}}>/5</Text>
          </Text>
          <Text>20 ratings</Text>
        </View>
        <View style={styles.verticleLine} />
        <View style={{}}>
          <View style={styles.box1}>
            <Text>5</Text>
            <Image
              source={require('../../assets/star-filled.png')}
              style={styles.star}
            />
            <ProgressBar
              progress={0.5}
              color="#008B3E"
              style={styles.progress}
            />
            <Text>65%</Text>
          </View>
          <View style={styles.box1}>
            <Text>4</Text>
            <Image
              source={require('../../assets/star-filled.png')}
              style={styles.star}
            />
            <ProgressBar
              progress={0.8}
              color="#09C85E"
              style={styles.progress}
            />
            <Text>65%</Text>
          </View>
          <View style={styles.box1}>
            <Text>3</Text>
            <Image
              source={require('../../assets/star-filled.png')}
              style={styles.star}
            />
            <ProgressBar
              progress={0.3}
              color="#61F675"
              style={styles.progress}
            />
            <Text>65%</Text>
          </View>
          <View style={styles.box1}>
            <Text>2</Text>
            <Image
              source={require('../../assets/star-filled.png')}
              style={styles.star}
            />
            <ProgressBar
              progress={0.2}
              color="orange"
              style={styles.progress}
            />
            <Text>65%</Text>
          </View>
          <View style={styles.box1}>
            <Text>1</Text>
            <Image
              source={require('../../assets/star-filled.png')}
              style={styles.star}
            />
            <ProgressBar progress={0.1} color="red" style={styles.progress} />
            <Text>65%</Text>
          </View>
        </View>
      </View>
      {/* Add review */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Rating
              ratingCount={5}
              imageSize={30}
              showRating
              onFinishRating={ratingCompleted}
            />

            <TextInput
              value={review}
              placeholderTextColor="#eeee"
              placeholder="Add a review"
              onChangeText={txt => setReview(txt)}
              multiline={true}
              style={{
                width: '90%',
                backgroundColor: '#eee',
                color: '#000',
                marginTop: 10,
                borderRadius: 7,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'yellow',
                width: '70%',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 15,
              }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => AddReview()}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Edit modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modaledit}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalEdit(!modaledit);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Review</Text>
            <Rating
              ratingCount={5}
              imageSize={30}
              showRating
              onFinishRating={ratingCompleted}
            />

            <TextInput
              value={review}
              placeholderTextColor="#eeee"
              placeholder="Add a review"
              onChangeText={txt => setReview(txt)}
              multiline={true}
              style={{
                width: '90%',
                backgroundColor: '#eee',
                color: '#000',
                marginTop: 10,
                borderRadius: 7,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'yellow',
                width: '70%',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 15,
              }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => EditReview()}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalEdit(!modaledit)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {editreview ? (
        <TouchableOpacity
          onPress={() => setModalEdit(true)}
          activeOpacity={0.4}
          style={{
            // backgroundColor: 'yellow',
            alignSelf: 'flex-end',
            marginTop: 10,
            marginEnd: 15,
          }}>
          <Text style={{fontSize: 15, color: 'red'}}>Edit review</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          activeOpacity={0.4}
          style={{
            // backgroundColor: 'yellow',
            alignSelf: 'flex-end',
            marginTop: 10,
            marginEnd: 15,
          }}>
          <Text style={{fontSize: 15, color: 'red'}}>Write a review</Text>
        </TouchableOpacity>
      )}
      {/* feedback section */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <View style={{flex: 1, height: 1, backgroundColor: '#e8e8e8'}} />
      </View>
      {loading ? (
        <ActivityIndicator animating={true} color="#D02824" size="large" />
      ) : value.length === 0 ? (
        <Text>{response}</Text>
      ) : (
        <FlatList
          data={value}
          keyExtractor={item => item.id}
          style={{width: '100%'}}
          // ItemSeparatorComponent={() => (
          //   <View style={{height: 1, backgroundColor: 'lightgrey'}} />
          // )}
          renderItem={({item}) => (
            <View style={{padding: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'yellow',
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={{width: 50, height: 50, borderRadius: 25}}
                />
                <View style={{marginStart: 10}}>
                  <Text>{item.userName}</Text>
                  <Rating
                    ratingCount={5}
                    imageSize={20}
                    readonly
                    startingValue={item.rating}
                  />
                </View>
                <Text style={{position: 'absolute', right: 20}}>
                  {item.dateCreated}
                </Text>
              </View>
              <Text style={{marginTop: 5}}>{item.comment}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{flex: 1, height: 1, backgroundColor: '#e8e8e8'}}
                />
              </View>
            </View>
          )}
        />
      )}
      {/* Feedback user */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#D02824',
    width: '100%',
    flexDirection: 'row',
    padding: 7,
    alignItems: 'center',
  },
  title: {
    color: '#ffff',
    fontSize: 17,
  },
  description: {
    color: '#ffff',
    fontSize: 15,
  },
  ratingSection: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  verticleLine: {
    height: 160,
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
    width: '74%',
    padding: 7,
  },
  progress: {
    backgroundColor: '#eee',
    width: 150,
    height: 7,
    borderRadius: 5,
  },
  star: {
    tintColor: 'gold',
    width: 18,
    height: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: 270,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 7,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#D02824',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RatingReview;
