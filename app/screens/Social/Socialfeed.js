import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  List,
  RadioButton,
  Appbar,
} from 'react-native-paper';
import Modal from 'react-native-modal';

const info = [
  {
    img: require('../../assets/avatar.png'),
    name: 'Anaya Patil',
    time: 'a mins ago',
    info: 'Shopped at Harish Grocery Store. Got amazing 50% off on purchase of worth 4000.',
    storename: 'Harish Stores',
    saved: '2000',
    off: '50',
  },
  {
    img: require('../../assets/avatar.png'),
    name: 'Aana Roy',
    time: '10 mins ago',
    info: 'Shopped at Raj Trades. Got amazing 40% off on purchase of worth 3600.',
    storename: 'Raj Trades',
    saved: '1000',
    off: '40',
  },
  {
    img: require('../../assets/avatar.png'),
    name: 'Shruti Patil',
    time: '30 mins ago',
    info: 'Shopped at Harry Sales Grocery Store. Got amazing 50% off on purchase of worth 2940.',
    storename: 'Harish Stores',
    saved: '800',
    off: '45',
  },
  {
    img: require('../../assets/avatar.png'),
    name: 'Samar Patil',
    time: 'a mins ago',
    info: 'Shopped at Harish Grocery Store. Got amazing 50% off on purchase of worth 4000.',
    storename: 'Harish Stores',
    saved: '400',
    off: '20',
  },
  {
    img: require('../../assets/avatar.png'),
    name: 'Anaya Patil',
    time: 'a mins ago',
    info: 'Shopped at Harish Grocery Store. Got amazing 50% off on purchase of worth 4000.',
    storename: 'Harish Stores',
    saved: '2000',
    off: '50',
  },
];

const filter = [
  {
    id: 1,
    value: 'Essentials',
  },
  {
    id: 2,
    value: 'Doctors',
  },
  {
    id: 3,
    value: 'Restaurants',
  },
  {
    id: 4,
    value: 'Shopping',
  },
  {
    id: 5,
    value: 'Hospitals',
  },
  {
    id: 6,
    value: 'Education',
  },
];

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function Socialfeed({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState([]);
  const [selected, setselected] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setdata(filter);
  }, []);

  const onChangeValue = (itemSelected, index) => {
    const newData = data.map(item => {
      if (item.id === itemSelected.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return {
        ...item,
        selected: item.selected,
      };
    });
    setdata(newData);
  };
  const submit = () => {
    const listSelected = data.filter(item => item.selected === true);

    console.log('list selecteds value', listSelected);

    setselected(listSelected);
    toggleModal();
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <RadioButton.Item
          label={item.value}
          value={item.selected}
          status={item.selected ? 'checked' : 'unchecked'}
          onPress={() => onChangeValue(item, index)}
        />
      </View>
    );
  };

  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
          onChangeValue(item, index);
          submit();
        }}
        style={{
          backgroundColor: '#D02824',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
          marginStart: 7,
          padding: 5,
          height: 30,
          paddingHorizontal: 10,
          borderRadius: 8,
          borderWidth: 0.2,
        }}>
        <Text style={{color: '#fff', fontSize: 15}}>{item.value}</Text>
        <Text style={{color: '#fff', fontSize: 15, marginStart: 15}}>X</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/left-arrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Social Feeds</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.filter}>
          <Image
            source={require('../../assets/Filter.png')}
            style={{width: 27, height: 25}}
          />
        </TouchableOpacity>
      </View>
      {/* fliter list */}
      <View style={{width: '100%', backgroundColor: '#2C3A4A'}}>
        {selected && (
          <FlatList
            keyExtractor={item => item.id}
            numColumns={3}
            horizontal={false}
            data={selected}
            renderItem={renderItems}
          />
        )}
      </View>

      {/* Modal for filter */}
      <Modal
        isVisible={isModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}>
        <View style={styles.modalView}>
          <Card.Title
            style={{backgroundColor: '#D02824', padding: 10, paddingEnd: 20}}
            titleStyle={{color: 'white'}}
            title="Filter by Category"
            right={props => (
              <TouchableOpacity {...props} onPress={toggleModal}>
                <Text style={{fontSize: 25, color: 'white'}}>X</Text>
              </TouchableOpacity>
            )}
          />
          <FlatList data={data} renderItem={renderItem} />
          <Button
            color="#D02824"
            mode="contained"
            style={{marginBottom: 10, width: 100, alignSelf: 'center'}}
            onPress={submit}>
            submit
          </Button>
        </View>
      </Modal>

      <View style={{backgroundColor: '#2C3A4A', flex: 1}}>
        <FlatList
          data={info}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Card style={styles.cardcontainer}>
              <Card.Title
                title={item.name}
                subtitle={item.time}
                left={props => (
                  <Avatar.Image
                    {...props}
                    size={60}
                    source={item.img}
                    style={{backgroundColor: '#fff'}}
                  />
                )}
                right={props => (
                  <View>
                    <Image
                      {...props}
                      source={require('../../assets/socialdiscount.png')}
                      style={{height: 50, width: 145}}
                    />
                    <View style={{position: 'absolute', left: 40}}>
                      <Text style={{color: '#fff'}}>Saved {item.saved}</Text>
                      <Text>Got {item.off}%</Text>
                    </View>
                  </View>
                )}
              />
              <Card.Content>
                <Paragraph>{item.info}</Paragraph>
              </Card.Content>

              <Card.Content style={{flexDirection: 'row', marginTop: 10}}>
                <Text>Click here to view the shop </Text>
                <Text
                  style={{
                    color: '#266AD1',
                    textDecorationLine: 'underline',
                    marginStart: 20,
                  }}>
                  {item.storename}
                </Text>
              </Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
              </View>
            </Card>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#2C3A4A',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  filter: {
    padding: 10,
    flexDirection: 'row',
  },
  cardcontainer: {
    width: Dimensions.get('window').width * 0.97,
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Socialfeed;
