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
import {RadioButton} from 'react-native-paper';

const WindowWidth = Dimensions.get('window').width;

function CategoryList({navigation, route}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [info, setinfo] = useState([]);
  const [filterdData, setfilterdData] = useState([]);

  const [search, setsearch] = useState('');
  const [loading, setloading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  const [Location, setLocation] = useState(null);

  const [filterOn, setfilter] = useState(false);

  const [value, setValue] = React.useState('first');

  const CategoryName = route.params.ShopName;
  const Category = route.params.Categoryitem;
  const typecheck = route.params.Type;

  useEffect(() => {
    if (isFocused) {
      ShopData();
      UserLocation();
    }
  }, [isFocused]);

  const ShopData = () => {
    setloading(true);
    setfilter(false);
    setValue('');

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
      const url = Platform.select({
        ios: scheme + `${value.address}`,
        android: scheme + `${value.address}`,
      });
      return Linking.openURL(url);
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

      return <Text>({d.toFixed(2)} km away)</Text>;
    }
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const DistanceFilter = () => {
    setfilter(true);
    setValue('Distance');
    setModalVisible(false);
    const newData = info
      .filter(item => {
        return item.coordinate;
      })
      .sort(function (item, value) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(item.coordinate.latitude - Location.latitude); // deg2rad below
        var dLon = deg2rad(item.coordinate.longitude - Location.longitude);
        var dLatValue = deg2rad(value.coordinate.latitude - Location.latitude); // deg2rad below
        var dLonValue = deg2rad(
          value.coordinate.longitude - Location.longitude,
        );

        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(Location.latitude)) *
            Math.cos(deg2rad(item.coordinate.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        var aValue =
          Math.sin(dLatValue / 2) * Math.sin(dLatValue / 2) +
          Math.cos(deg2rad(Location.latitude)) *
            Math.cos(deg2rad(value.coordinate.latitude)) *
            Math.sin(dLonValue / 2) *
            Math.sin(dLonValue / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var cValue = 2 * Math.atan2(Math.sqrt(aValue), Math.sqrt(1 - aValue));

        var d = R * c; // Distance in km
        var dValue = R * cValue; // Distance in km
        return d - dValue;
      });
    setinfo(newData);
  };

  const DiscountFilter = (discountvalue, discounttype) => {
    setfilter(true);
    setValue(discounttype);
    setModalVisible(false);

    const newData = info.filter(item => {
      return item.discount < discountvalue;
    });
    setinfo(newData);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={{fontSize: 17, color: '#D02824'}}>{CategoryName}</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            filterOn ? ShopData() : null;
          }}>
          <Image source={require('../../assets/Filter2.png')} />
        </TouchableOpacity>
      </View>
      {/* Modal for filter */}
      <Modal
        style={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isModalVisible}>
        <View style={styles.modelContaner}>
          {/* header */}
          <View style={styles.modalheader}>
            <Text style={{fontSize: 22, color: '#fff'}}>Filters</Text>
          </View>
          {/* customer rating */}
          {loading ? (
            <ActivityIndicator size={'large'} color="#D02824" />
          ) : (
            <View>
              <RadioButton.Item
                label="Distance (km)"
                value="Distance"
                status={value === 'Distance' ? 'checked' : 'unchecked'}
                onPress={() => DistanceFilter()}
              />
              <RadioButton.Item
                label="Discount upto 10%"
                value="10% Discount"
                status={value === '10% Discount' ? 'checked' : 'unchecked'}
                onPress={() => DiscountFilter(10, '10% Discount')}
              />
              <RadioButton.Item
                label="Discount upto 20%"
                value="20% Discount"
                status={value === '20% Discount' ? 'checked' : 'unchecked'}
                onPress={() => DiscountFilter(20, '20% Discount')}
              />
              <RadioButton.Item
                label="Discount upto 40%"
                value="40% Discount"
                status={value === '40% Discount' ? 'checked' : 'unchecked'}
                onPress={() => DiscountFilter(40, '40% Discount')}
              />
              <RadioButton.Item
                label="Discount upto 60%"
                value="60% Discount"
                status={value === '60% Discount' ? 'checked' : 'unchecked'}
                onPress={() => DiscountFilter(60, '60% Discount')}
              />
            </View>
          )}

          <TouchableOpacity
            style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}
            onPress={() => setModalVisible(false)}>
            <Text
              style={{
                fontSize: 20,
                color: '#000',
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {filterOn ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#D02824',
            borderRadius: 20,
            width: 150,
            alignItems: 'center',
            padding: 5,
            marginStart: 10,
          }}
          onPress={() => ShopData()}>
          <Text style={{fontSize: 15, color: '#fff'}}>
            {value} {'  '} X
          </Text>
        </TouchableOpacity>
      ) : null}

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
    height: 370,
  },

  modalheader: {
    flexDirection: 'row',
    backgroundColor: '#D02824',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginBottom: 20,
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
