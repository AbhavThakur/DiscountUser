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
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

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

function CategoryList({navigation, route}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [info, setinfo] = useState([]);
  const [filterdData, setfilterdData] = useState([]);

  const [search, setsearch] = useState('');
  const [loading, setloading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  const CategoryName = route.params.ShopName;
  const Category = route.params.Categoryitem;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    if (isFocused) {
      ShopData();
    }
  }, [isFocused]);

  const ShopData = () => {
    setloading(true);
    // firestore()
    //   .collection('StoreName')
    //   .orderBy('createdAt', 'asc')
    //   .get()
    //   .then(snapshot => {
    //     let shops = snapshot.docs.map(doc => {
    //       const data = doc.data();
    //       const id = doc.id;

    //       return {id, ...data};
    //     });
    //     // console.log('shops ', shops);
    //     setinfo(shops);
    //     setfilterdData(shops);
    //     setloading(false);
    //   });
    firestore()
      .collection('StoreName')
      .where('Category', 'array-contains-any', Category)
      .get()
      .then(snapshot => {
        let shops = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;

          return {id, ...data};
        });
        console.log('shops ', shops);
        setinfo(shops);
        setfilterdData(shops);
        setloading(false);
      });
  };

  const searchFilter = text => {
    if (text) {
      const newData = info.filter(item => {
        const itemData = item.StoreName
          ? item.StoreName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setinfo(newData);
      setsearch(text);
    } else {
      setinfo(filterdData);
      setsearch(text);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    ShopData();
    setRefreshing(false);
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{fontSize: 15, color: '#D02824', alignSelf: 'flex-start'}}>
          CATEGORY {'>'} {'>'} SUBCATEGORY {'>'} {'>'} {CategoryName}
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
      <View style={styles.searchbox}>
        <TextInput
          value={search}
          placeholder="Search for shops here..."
          placeholderTextColor="#ccc"
          style={{
            color: '#000',
          }}
          onChangeText={txt => searchFilter(txt)}
        />

        <Image
          source={require('../../assets/find.png')}
          style={{width: 20, height: 20, tintColor: '#000'}}
        />
      </View>
      {loading ? (
        <ActivityIndicator size={'large'} color="#D02824" />
      ) : info.length === 0 ? (
        <Text style={{color: 'black', fontWeight: 'bold', marginTop: 20}}>
          No Shop found
        </Text>
      ) : (
        <FlatList
          data={info}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => {
            return (
              <StoreCard
                Title={item.StoreName}
                img={item.shopimage}
                discount={item.discount}
                distance={'400'}
                location={item.address}
                time={'10'}
                contact={item.contactNumber}
                ratings={'4'}
                views={'140'}
                ratingvalue={'4.4'}
                onPress={() => navigation.navigate('Shop', item.id)}
              />
            );
          }}
        />
      )}
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
  searchbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: '#ccc',
    width: WindowWidth * 0.9,
    height: 40,
    margin: 10,
  },
});

export default CategoryList;
