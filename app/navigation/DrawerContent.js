import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function DrawerContent(props) {
  const [name, setName] = useState('');
  const [last, setLast] = useState('');
  const [img, setImg] = useState(null);

  const {uid} = auth().currentUser;

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    firestore()
      .collection('Discountusers')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists === false) {
          null;
        }
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists === true) {
          // console.log('User data: ', documentSnapshot.data());
          const userData = documentSnapshot.data();
          setName(userData.fname);
          setLast(userData.lname);

          setImg(userData.userImg);
        }
      });
  }, [uid]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Avatar.Image
                source={{
                  uri:
                    img === null
                      ? 'https://static.thenounproject.com/png/363640-200.png'
                      : img,
                }}
                size={100}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>
                  {name}
                  {last}
                </Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Image
                  source={require('../assets/Home.png')}
                  style={{width: 15, height: 15, tintColor: '#c9c9c9'}}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('HomeScreen');
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  source={require('../assets/rss.png')}
                  style={{width: 15, height: 15, tintColor: '#c9c9c9'}}
                />
              )}
              label="Social Feeds"
              onPress={() => {
                props.navigation.navigate('Social_Feeds');
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  source={require('../assets/subscription.png')}
                  style={{width: 15, height: 15, tintColor: '#c9c9c9'}}
                />
              )}
              label="Subscriptions"
              onPress={() => {
                props.navigation.navigate('Subscriptions');
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  source={require('../assets/profile.png')}
                  style={{width: 15, height: 15, tintColor: '#c9c9c9'}}
                />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          onPress={() => logout()}
          icon={() => (
            <Image
              source={require('../assets/logout.png')}
              style={{width: 15, height: 15}}
            />
          )}
          label="Log Out"
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default DrawerContent;
