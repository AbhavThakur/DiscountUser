import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? '#D02824' : '#F6D4D3';

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: 10,
        height: 10,
        marginHorizontal: 5,
        backgroundColor,
        borderRadius: 5,
        marginBottom: 20,
      }}
    />
  );
};

const Next = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={styles.text}>Next</Text>
  </TouchableOpacity>
);
const Skip = ({...props}) => (
  <TouchableOpacity {...props}>
    <Text style={styles.text}>Skip</Text>
  </TouchableOpacity>
);
const Done = ({...props}) => (
  <View style={styles.donebtn}>
    <TouchableHighlight {...props} style={styles.done}>
      <Text style={styles.donetext}>Get Started</Text>
    </TouchableHighlight>
  </View>
);

function OnBoardingScreen({navigation}) {
  return (
    // <SafeAreaView style={styles.container}>
    <Onboarding
      DotComponent={dots}
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      DoneButtonComponent={Done}
      bottomBarHighlight={false}
      containerStyles={{paddingBottom: 175}}
      titleStyles={styles.title}
      onDone={() => navigation.replace('SignUp')}
      onSkip={() => navigation.replace('SignUp')}
      pages={[
        {
          backgroundColor: 'white',
          image: (
            <View style={styles.img}>
              <Image
                source={require('../assets/screen1.png')}
                style={{width: '60%', height: '70%'}}
              />
            </View>
          ),
          title: 'Discounts from Local Stores',
          subtitle: (
            <View>
              <Text style={styles.subtitle}>
                All the discounts from local shops{'\n'}are at your finger tips
                now.
              </Text>
            </View>
          ),
        },
        {
          backgroundColor: 'white',
          image: (
            <View style={styles.img}>
              <Image
                source={require('../assets/screen2.png')}
                style={styles.imgstyle}
              />
            </View>
          ),
          title: 'Discounts Ranges from               5% to 70%',
          subtitle: (
            <View>
              <Text style={styles.subtitle}>
                Buy any product / service from our{'\n'}sellers and save from 5
                to 70%
              </Text>
            </View>
          ),
        },
        {
          backgroundColor: 'white',
          image: (
            <View style={styles.img}>
              <Image
                source={require('../assets/screen3.png')}
                style={{width: '50%', height: '80%'}}
              />
            </View>
          ),
          title: 'Save 20k per year',
          subtitle: (
            <View>
              <Text style={styles.subtitle}>
                People are saving on an average{'\n'}
                of 20k every year with us. Why not{'\n'}join them ?
              </Text>
            </View>
          ),
        },
        {
          backgroundColor: 'white',
          image: (
            <View style={styles.img}>
              <Image
                source={require('../assets/screen4.png')}
                style={{width: '80%', height: '70%'}}
              />
            </View>
          ),
          title: '5000+  registered  local         stores',
          subtitle: (
            <View>
              <Text style={styles.subtitle}>
                Shop on 5000+ registered local{'\n'}stores enjoy cash back every
                time{'\n'}you shop.
              </Text>
            </View>
          ),
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#DF6D6A',
    fontSize: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  img: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 9 / 9,
  },
  imgstyle: {
    width: '75%',
    height: '75%',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    color: '#D02824',
    bottom: 40,
  },
  subtitle: {
    color: '#666666',
    fontSize: 18,
    bottom: 30,
    marginRight: 10,
  },
  done: {
    backgroundColor: '#D02824',
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 55,
    borderRadius: 10,
  },
  donetext: {
    color: '#fff',
    fontSize: 22,
  },
  donebtn: {
    width: '250%',
    aspectRatio: 16 / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoardingScreen;
