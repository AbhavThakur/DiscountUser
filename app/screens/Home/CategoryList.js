import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import Share from 'react-native-share';
import StoreCard from '../../components/StoreCard';
import GetLocation from 'react-native-get-location';

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

  const [Location, setLocation] = useState(null);

  const CategoryName = route.params.ShopName;
  const Category = route.params.Categoryitem;
  const typecheck = route.params.Type;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    if (isFocused) {
      ShopData();
      UserLocation();
    }
  }, [isFocused]);

  const ShopData = () => {
    setloading(true);
    console.log(
      '🚀👨🏻‍💻 ~ file: CategoryList.js ~ line 54 ~ ShopData ~ typecheck',
      typecheck,
    );
    console.log(
      '🚀👨🏻‍💻 ~ file: CategoryList.js ~ line 56 ~ ShopData ~ Category',
      Category,
    );
    firestore()
      .collection('StoreName')
      .where('Category', typecheck, Category)
      .get()
      .then(snapshot => {
        let shops = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;

          return {id, ...data};
        });
        // console.log('shops ', shops);
        setinfo(shops);
        setfilterdData(shops);
        setloading(false);
      });
  };

  //serach functions
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

  const callNumber = contact => {
    let phoneNumber = `tel:${contact}`;
    Linking.openURL(phoneNumber);
  };

  const share = async item => {
    const shareOptions = {
      title: item.StoreName,
      message: `Welcome to 🛒${item.StoreName} which is now available on DiscountAdda User App (https://play.google.com/store/apps/details?id=com.discountuser).\n The store is providing discount of ${item.discount}%.\n Visit the Store on the address 📍${item.address} \n and You can also contact us at 📞 ${item.contactNumber}.`,
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const label = 'Shop address';

  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});

  const Maps = value => {
    if (value.coordinate === undefined) {
      Alert.alert('Shop address is not available on Maps');
    } else if (value.coordinate) {
      const latLng = `${value.coordinate.latitude},${value.coordinate.longitude}`;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      return Linking.openURL(url);
    }
  };

  const UserLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then(location => {
        setLocation(location);
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

  function GetDistanceFromLatLonInKm(lat1, lon1, shoplocation) {
    if (shoplocation === undefined) {
      console.log('shoplocation is undefined');
      return null;
    } else {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(shoplocation.latitude - lat1); // deg2rad below
      var dLon = deg2rad(shoplocation.longitude - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(shoplocation.latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      console.log(
        '🚀👨🏻‍💻 ~ file: CategoryList.js ~ line 177 ~ GetDistanceFromLatLonInKm ~ d',
        d,
      );
      return <Text>({d.toFixed(2)} km away)</Text>;
    }
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={{fontSize: 15, color: '#D02824', alignSelf: 'flex-start'}}>
          {CategoryName}
        </Text>
        {/* <TouchableOpacity onPress={toggleModal}>
          <Image source={require('../../assets/Filter2.png')} />
        </TouchableOpacity> */}
      </View>
      {/* Modal for filter */}
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
          placeholder="Search for stores here..."
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
          style={{
            backgroundColor: '#fff',
          }}
          contentContainerStyle={{alignItems: 'center'}}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => {
            return (
              <StoreCard
                Title={item.StoreName}
                img={item.shopimage}
                discount={item.discount}
                distance={
                  Location === null
                    ? '0'
                    : GetDistanceFromLatLonInKm(
                        Location.latitude,
                        Location.longitude,
                        item.coordinate,
                      )
                }
                location={item.address}
                time={item.status}
                contact={item.contactNumber}
                // ratings={'4'}
                // views={'140'}
                // ratingvalue={'4.4'}
                onPress={() => navigation.navigate('Shop', item.id)}
                onPressConatct={() => callNumber(item.contactNumber)}
                onPressShare={() => share(item)}
                onPressShop={() => navigation.navigate('Shop', item.id)}
                onPressMap={() => Maps(item)}
                shopStatus={item.status === 'Open' ? false : true}
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
