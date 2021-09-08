import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import {List, Card} from 'react-native-paper';

import StoreCard from '../../components/StoreCard';

const value = [
  {
    Title: 'New Norvay Trading',
    img: require('../../assets/shop1.png'),
    discount: '26',
    distance: '200',
    location: '1 - 44 building number,4,Jn',
    time: '10',
    contact: '123 455 7890',
    ratings: '4',
    views: '400',
    ratingvalue: '4.4',
  },
  {
    Title: 'Roshan Store',
    img: require('../../assets/shop2.png'),
    discount: '25',
    distance: '250',
    location: '1 - 44 building number,4,Jn',
    time: '11',
    contact: '123 455 7890',
    ratings: '2',
    views: '230',
    ratingvalue: '4.4',
  },
  {
    Title: 'Harish Stores',
    img: require('../../assets/shop3.png'),
    discount: '26',
    distance: '200',
    location: '1 - 44 building number,4,Jn',
    time: '10',
    contact: '123 455 7890',
    ratings: '3',
    views: '150',
    ratingvalue: '4.4',
  },
  {
    Title: 'Sai Stores',
    img: require('../../assets/shop3.png'),
    discount: '26',
    distance: '270',
    location: '1 - 44 building number,4,Jn',
    time: '10',
    contact: '123 455 7890',
    ratings: '4',
    views: '400',
    ratingvalue: '4.4',
  },
  {
    Title: 'Agraj Stores',
    img: require('../../assets/shop4.png'),
    discount: '26',
    distance: '200',
    location: '1 - 44 building number,4,Jn',
    time: '10',
    contact: '123 455 7890',
    ratings: '4',
    views: '400',
    ratingvalue: '4.4',
  },
  {
    Title: 'Garry Stores',
    img: require('../../assets/shop2.png'),
    discount: '26',
    distance: '200',
    location: '1 - 44 building number,4,Jn',
    time: '10',
    contact: '123 455 7890',
    ratings: '4',
    views: '400',
    ratingvalue: '4.4',
  },
  {
    Title: 'Harish Stores',
    img: require('../../assets/shop4.png'),
    discount: '26',
    distance: '200',
    location: '1 - 44 building number,4,Jn',
    time: '10',
    contact: '123 455 7890',
    ratings: '4',
    views: '140',
    ratingvalue: '4.4',
  },
];

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

function GroceryList({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    firestore()
      .collection('StoreName')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
      });
  });
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{fontSize: 15, color: '#D02824', alignSelf: 'flex-start'}}>
          CATEGORY {'>'} {'>'} SUBCATEGORY {'>'} {'>'} GROCERY
        </Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={require('../../assets/Filter2.png')} />
        </TouchableOpacity>
      </View>

      <Modal
        style={{justifyContent: 'flex-end', alignSelf: 'center', margin: 0}}
        isVisible={isModalVisible}>
        <View style={styles.modelContaner}>
          {/* header */}
          <View style={styles.modaelheader}>
            <Text style={{fontSize: 22, color: '#fff'}}>Filters</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 20}}
              onPress={toggleModal}>
              <Text
                style={{
                  fontSize: 25,
                  color: 'white',
                }}>
                X
              </Text>
            </TouchableOpacity>
          </View>
          {/* customer rating */}
        </View>
      </Modal>
      <FlatList
        data={value}
        renderItem={({item}) => {
          return (
            <StoreCard
              Title={item.Title}
              img={item.img}
              discount={item.discount}
              distance={item.distance}
              location={item.location}
              time={item.time}
              contact={item.contact}
              ratings={item.ratings}
              views={item.views}
              ratingvalue={item.ratingvalue}
              onPress={() => navigation.navigate('Shop')}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    paddingStart: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modelContaner: {
    backgroundColor: '#fff',
    width: WindowWidth,
    height: WindowHeight * 0.8,
  },

  modaelheader: {
    flexDirection: 'row',
    backgroundColor: '#D02824',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default GroceryList;
