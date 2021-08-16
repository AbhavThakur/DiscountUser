import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

function Subscriptions({navigation}) {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            padding: 10,
            marginEnd: Dimensions.get('window').width * 0.25,
          }}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/left-arrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscriptions value</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2C3A4A',
    height: 55,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
});

export default Subscriptions;
