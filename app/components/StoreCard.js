import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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
}) {
  return (
    <View style={styles.card}>
      <Image source={{uri: img}} style={{margin: 5, width: 100, height: 100}} />
      <View style={{position: 'absolute'}}>
        <Image
          source={require('../assets/tag.png')}
          style={{width: 47, height: 47}}
        />
        <Text style={{position: 'absolute', color: '#fff', right: 5, top: 2}}>
          {discount}% off
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={onPress}
        style={{backgroundColor: '#fff', width: '65%', marginStart: 10}}>
        <Text style={{fontSize: 21, marginTop: 5}}>{Title}</Text>
        <StarRating ratings={ratings} views={views} ratingvalue={ratingvalue} />
        <Text style={{marginVertical: 5}}>
          {distance} m , {location}
        </Text>
        <Text style={{marginBottom: 10}}>Open . Closes {time} PM .</Text>
        <Text style={{marginBottom: 10}}>{contact}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingStart: 5,
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
