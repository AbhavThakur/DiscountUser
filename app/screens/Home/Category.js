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
import {value} from '../../constants/Categories';

const windowHeight = Dimensions.get('window').height;

function Category(props) {
  const category = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() =>
        props.navigation.navigate(item.screen, {
          ShopName: item.name,
          Categoryitem: item.category,
        })
      }
      style={{backgroundColor: '#fff', margin: 5, marginVertical: 10}}>
      <Image source={item.img} style={{width: 180, height: 100}} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        CATEGORY {'>'} {'>'} SUBCATEGORY
      </Text>
      <FlatList
        data={value}
        contentContainerStyle={styles.CategoryContainer}
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
  header: {
    fontSize: 18,
    color: '#D02824',
    alignSelf: 'flex-start',
  },
  CategoryContainer: {
    // backgroundColor: 'yellow',
    height: windowHeight * 0.7,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Category;
