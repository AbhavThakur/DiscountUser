import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';

const data1 = [
  {
    id: 1,
    title: 'App under maintenance',
    desc: 'Your card is about to expire.Please renew to enjoy the discounts.',
    date: '10 Feb 2021',
    img: require('../../assets/cardlogo.png'),
    card: 0,
  },
  {
    id: 2,
    title: 'App under maintenance',
    desc: 'Your card is about to expire.Please renew to enjoy the discounts.',
    date: '10 Feb 2021',
    img: require('../../assets/cardlogo.png'),
    card: 0,
  },
];

const data2 = [
  {
    id: 1,
    title: 'Card expiry status',
    desc: 'Your card is about to expire.Please renew to enjoy the discounts.',
    date: '10 Feb 2021',
    img: require('../../assets/cardlogo.png'),
    card: 1,
  },
  {
    id: 2,
    title: 'App under maintenance',
    desc: 'Your card is about to expire.Please renew to enjoy the discounts.',
    date: '10 Feb 2021',
    img: require('../../assets/cardlogo.png'),
    card: 0,
  },
  {
    id: 3,
    title: 'Card expiry status',
    desc: 'Your card is about to expire.Please renew to enjoy the discounts.',
    date: '10 Feb 2021',
    img: require('../../assets/cardlogo.png'),
    card: 1,
  },
];

const LineComp = () => {
  <View style={styles.line} />;
};

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Today</Text>
          <View style={styles.line} />
          <FlatList
            nestedScrollEnabled
            data={data1}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              item.card == 1 ? (
                <View style={styles.box}>
                  <Image source={item.img} style={styles.imgCont} />
                  <View style={styles.box1}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 16}}>{item.title}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <Text
                      style={{
                        marginRight: 80,
                        fontSize: 14,
                        marginVertical: 10,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.box}>
                  <Image source={item.img} style={styles.imgContSmall} />
                  <View style={styles.box1}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 16}}>{item.title}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <Text
                      style={{
                        marginRight: 80,
                        fontSize: 14,
                        marginVertical: 10,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              )
            }
            ListFooterComponent={() => {
              return (
                <View>
                  <View style={styles.line} />
                </View>
              );
            }}
            ItemSeparatorComponent={() => {
              return (
                <View>
                  <View style={styles.line} />
                </View>
              );
            }}
          />
        </View>

        <View>
          <Text style={styles.header2}>Yesterday</Text>
          <View style={styles.line} />
          <FlatList
            data={data2}
            nestedScrollEnabled
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              item.card == 1 ? (
                <View style={styles.box}>
                  <Image source={item.img} style={styles.imgCont} />
                  <View style={styles.box1}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 16}}>{item.title}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <Text
                      style={{
                        marginRight: 80,
                        fontSize: 14,
                        marginVertical: 10,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.box}>
                  <Image source={item.img} style={styles.imgContSmall} />
                  <View style={styles.box1}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 16}}>{item.title}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <Text
                      style={{
                        marginRight: 80,
                        fontSize: 14,
                        marginVertical: 10,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              )
            }
            ListFooterComponent={() => {
              return (
                <View>
                  <View style={styles.line} />
                </View>
              );
            }}
            ItemSeparatorComponent={() => {
              return (
                <View>
                  <View style={styles.line} />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 18,
  },
  header2: {
    marginLeft: 20,
    fontSize: 18,
  },
  line: {
    marginVertical: 13,
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
  },
  box: {
    height: 100,
    width: 100,
    padding: 10,
    flexDirection: 'row',
  },
  imgCont: {
    width: 20,
    height: 20,
  },
  imgContSmall: {
    width: 40,
    height: 40,
  },
  box1: {
    marginHorizontal: 20,
    width: 350,
  },
  date: {
    color: 'grey',
    position: 'absolute',
    right: 40,
  },
});

export default Notification;
