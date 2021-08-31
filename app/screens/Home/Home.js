import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useIsFocused} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {Card, Title, Paragraph, Button} from 'react-native-paper';

import Discount from '../../utils/Discount';
import ImageCarousel from '../../utils/ImageCarousel';
import {Info} from '../../constants/Categories';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Home(props) {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {uid} = auth().currentUser;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      firestore()
        .collection('Subscribed')
        .doc(uid)
        .get()
        .then(async function (documentSnapshot) {
          if (documentSnapshot.exists === false) {
            setModalVisible(true);
          }

          console.log('User subscribed: ', documentSnapshot.exists);

          if (documentSnapshot.exists === true) {
            console.log('subscribed');
            setModalVisible(false);
          }
        });
    }
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.txt}>Amount Spent</Text>
          <Text style={styles.txt}>{'\u20B9'} 10,000</Text>
        </View>
        <View style={styles.verticleLine}></View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.txt}>Amount Saved</Text>
          <Text style={styles.txt}>{'\u20B9'} 2,000</Text>
        </View>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}>
        <ImageCarousel />
        <View style={styles.category}>
          <FlatList
            data={Info}
            numColumns={4}
            nestedScrollEnabled={true}
            horizontal={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.subcategory}
                onPress={() => props.navigation.navigate(item.screen)}>
                <Image
                  source={item.img}
                  style={{width: item.width, height: item.height}}
                />
                <Text style={styles.subtxt}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* top categories */}
        <Discount />
        <Modal
          style={{justifyContent: 'flex-end', alignSelf: 'center', margin: 0}}
          isVisible={isModalVisible}>
          <View style={styles.modelContaner}>
            {/* header */}
            <View style={styles.modaelheader}>
              <Text style={{fontSize: 22, color: '#fff'}}>Subscribe</Text>
            </View>
            <Card>
              <Card.Content>
                <Title>Subscribe to discount adda </Title>
                <Paragraph>
                  Please subscribe to the discount adda to avail all the offer
                </Paragraph>
              </Card.Content>
              <Card.Actions
                style={{alignItems: 'center', justifyContent: 'space-around'}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: '#D02824'}}
                  onPress={() => props.navigation.navigate('Subscriptions')}>
                  Now
                </Button>
                <Button
                  mode="contained"
                  style={{backgroundColor: '#D02824'}}
                  onPress={toggleModal}>
                  Not Now
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#D02824',
    height: windowHeight / 12,
    width: windowWidth,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  verticleLine: {
    height: windowHeight / 10,
    width: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  txt: {
    color: '#fff',
    fontSize: 16,
  },
  category: {
    width: windowWidth,
    height: 290,
    backgroundColor: '#fff',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  subcategory: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  subtxt: {
    color: '#293645',
  },
  modelContaner: {
    backgroundColor: '#fff',
    width: windowWidth,
    height: windowHeight * 0.3,
  },

  modaelheader: {
    flexDirection: 'row',
    backgroundColor: '#D02824',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default Home;
