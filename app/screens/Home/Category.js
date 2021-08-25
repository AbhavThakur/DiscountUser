import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

const value = [
  {
    id: 1,
    img: require('../../assets/grocery.png'),
    screen: 'Grocery',
  },
  {
    id: 2,
    img: require('../../assets/milk.png'),
    screen: 'Grocery',
  },
  {
    id: 3,
    img: require('../../assets/electrician.png'),
    screen: 'Grocery',
  },
  {
    id: 4,
    img: require('../../assets/plumber.png'),
    screen: 'Grocery',
  },
  {
    id: 5,
    img: require('../../assets/water.png'),
    screen: 'Grocery',
  },
  {
    id: 6,
    img: require('../../assets/clean.png'),
    screen: 'Grocery',
  },
  {
    id: 7,
    img: require('../../assets/laundary.png'),
    screen: 'Grocery',
  },
  {
    id: 8,
    img: require('../../assets/foodCategory.png'),
    screen: 'Grocery',
  },
];

function Category(props) {
  const category = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => props.navigation.navigate(item.screen)}
      style={{backgroundColor: '#fff', marginTop: 15}}>
      <Image source={item.img} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, color: '#D02824', alignSelf: 'flex-start'}}>
        CATEGORY {'>'} {'>'} SUBCATEGORY
      </Text>
      <FlatList
        data={value}
        numColumns={2}
        keyExtractor={(item, index) => item.id}
        renderItem={category}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
});

export default Category;
