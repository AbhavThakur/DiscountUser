import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

function StarRating({ratings, views, ratingvalue}) {
  // Recieve the ratings object from the props

  // This array will contain our star tags. We will include this
  // array between the view tag.
  let stars = [];
  // Loop 5 times
  for (var i = 1; i <= 5; i++) {
    // set the path to filled stars
    let path = require('../assets/star-filled.png');
    // If ratings is lower, set the path to unfilled stars
    if (i > ratings) {
      path = require('../assets/star-unfilled.png');
    }

    stars.push(<Image style={styles.image} source={path} />);
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {marginLeft: 0}]}>{ratingvalue}</Text>
      {stars}
      <Text style={styles.text}>({views})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  image: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default StarRating;
