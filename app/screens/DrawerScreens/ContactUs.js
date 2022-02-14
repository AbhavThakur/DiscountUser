import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Linking,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Paragraph} from 'react-native-paper';

function ContactUs() {
  const callNumber = () => {
    let phoneNumber = `tel:${8447726766}`;

    Linking.openURL(phoneNumber);
  };
  const email = () => {
    Linking.openURL('mailto:Discountsadda.com@gmail.com');
  };

  const lat = '16.502628';
  const long = '80.640869';
  const label =
    'Opposite :- Gateway Hotel,Beside Woodland Showroom, Bander Road , Vijayawada';

  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${lat},${long}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  const Maps = () => {
    return Linking.openURL(url);
  };

  const instagramUrl = 'https://www.instagram.com/discountsaddaofficial/';
  const facebookUrl = 'https://www.facebook.com/discountsaddaofficial';
  const YouTubeUrl = 'https://www.youtube.com/channel/UCjvkGKlY_g5VaEFhS1gkEWQ';

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{backgroundColor: '#D02824', height: '40%', width: '100%'}}
      />

      <View
        style={{
          backgroundColor: '#fff',
          width: '90%',
          height: '57%',
          position: 'absolute',
          top: '17%',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          paddingHorizontal: 20,
        }}>
        <Image
          source={require('../../assets/ContactUs.png')}
          style={{width: 150, height: 150, position: 'absolute', top: -70}}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#D02824',
            marginBottom: 10,
            marginTop: 50,
          }}>
          DISCOUNTS ADDA
        </Text>
        <Paragraph>
          Discount Adda is a platform formed to help all the local shops to come
          and grow together and at the same to help the users to shop more and
          save more within the same locality and no efforts.
        </Paragraph>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginTop: 20,
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/phone-call.png')}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={callNumber}>
            <Text style={{fontSize: 15, marginStart: 10}}> +918447726766</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginVertical: 20,
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/mail.png')}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={email}>
            <Text style={{fontSize: 15, marginStart: 10}}>
              DISCOUNTSADDA.COM@GAMIL.COM
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/pin.png')}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={Maps}>
            <Text style={{fontSize: 15, marginStart: 10, marginEnd: 60}}>
              Opposite : Gateway hotel, beside woodland showroom, Bander road,
              Vijayawada.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          position: 'absolute',
          bottom: 150,
        }}>
        Connect with us
      </Text>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 60,
          // backgroundColor: 'yellow',
          width: 250,
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <TouchableOpacity onPress={() => Linking.openURL(instagramUrl)}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../assets/instagram.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(facebookUrl)}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../assets/facebook.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(YouTubeUrl)}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../assets/YouTube.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
});

export default ContactUs;
