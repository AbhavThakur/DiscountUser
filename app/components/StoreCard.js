import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Divider} from 'react-native-paper';

import {windowWidth} from '../utils/Dimentions';
import StarRating from './StarRating';

function StoreCard({
  Title,
  img,
  discount,
  distance,
  location,
  time,
  contact,
  ratings,
  views,
  ratingvalue,
  onPress,
  onPressConatct,
  onPressShare,
  onPressShop,
  shopStatus,
  onPressMap,
}) {
  return (
    <View style={styles.card}>
      <Image
        source={{uri: img}}
        style={{
          width: windowWidth * 0.85,
          height: 140,
        }}
      />
      <View style={{position: 'absolute'}}>
        <Image
          source={require('../assets/tag.png')}
          style={{width: 47, height: 47}}
        />
        <Text
          style={{
            position: 'absolute',
            color: '#fff',
            right: 5,
            top: 5,
            fontSize: 14,
          }}>
          {discount < 10 ? '  ' + discount : discount}% off
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPressShare}
        activeOpacity={0.5}
        style={{position: 'absolute', right: 4}}>
        <Image
          source={require('../assets/sharestore.png')}
          style={{width: 47, height: 47}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{
          // backgroundColor: 'yellow',
          width: windowWidth * 0.85,
          padding: 10,
        }}>
        <Text style={{fontSize: 21, marginTop: 5}}>
          {Title.slice(0, 20) + (Title.length > 20 ? '...' : '')}
        </Text>
        {/* <StarRating ratings={ratings} views={views} ratingvalue={ratingvalue} /> */}
      </TouchableOpacity>
      <View style={{padding: 5, flex: 2}}>
        <TouchableOpacity activeOpacity={0.5} onPress={onPressMap}>
          <Text style={{}}>
            📍 {distance} {location}
          </Text>
        </TouchableOpacity>

        <Divider style={{marginTop: 5, backgroundColor: '#ccc'}} />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#f9f9f9',
        }}>
        <Pressable onPress={onPressShop} disabled={shopStatus}>
          <Text> 🛒 {time} Now</Text>
        </Pressable>
        <TouchableOpacity onPress={onPressConatct}>
          <Text>📞 {contact}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.85,
    height: 320,
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

export default StoreCard;
