import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{
          backgroundColor: '#fff',
          width: windowWidth * 0.85,
          flex: 1,
          padding: 10,
        }}>
        <Image
          source={{uri: img}}
          style={{
            width: windowWidth * 0.8,
            height: '70%',
          }}
        />
        <View style={{position: 'absolute'}}>
          <Image
            source={require('../assets/tag.png')}
            style={{width: 47, height: 47}}
          />
          <Text style={{position: 'absolute', color: '#fff', right: 5, top: 2}}>
            {discount}% off
          </Text>
        </View>
        <Text style={{fontSize: 21, marginTop: 5}}>{Title}</Text>
        <StarRating ratings={ratings} views={views} ratingvalue={ratingvalue} />
      </TouchableOpacity>
      <View style={{padding: 10}}>
        <Text style={{}}>
          {distance} {location}
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text> {time} Now</Text>
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
    borderRadius: 10,
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
