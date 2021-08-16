import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import FormButton from '../../components/FormButton';
import {List, Paragraph} from 'react-native-paper';

function AnnualSubscription({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/subscribed_card.png')}
        style={{
          width: '100%',
          height: '92%',
          maxHeight: Dimensions.get('window').height * 0.35,
        }}>
        <Image source={require('../../assets/subs.png')} />
      </ImageBackground>
      <View flexDirection="row" style={styles.amount}>
        <Text style={styles.text}>{'\u20B9'} 6000</Text>
        <Text>/Annual</Text>
      </View>
      <View style={{padding: 15}}>
        <List.Section>
          <Text style={{fontSize: 16, marginBottom: 10}}>
            In addition to all the features in Half Yearly, Annual also
            includes:
          </Text>
          <List.Item
            title="Access on all types of shops"
            left={props => (
              <Image
                {...props}
                source={require('../../assets/checked.png')}
                style={{width: 25, height: 25}}
              />
            )}
          />
          <List.Item
            title="Special Discounts on shop above worth  rupee 5000"
            titleNumberOfLines={2}
            left={props => (
              <Image
                {...props}
                source={require('../../assets/checked.png')}
                style={{width: 25, height: 25}}
              />
            )}
          />
          <List.Item
            title="50% off on 1st shop using the card"
            left={props => (
              <Image
                {...props}
                source={require('../../assets/checked.png')}
                style={{width: 25, height: 25}}
              />
            )}
          />
        </List.Section>
        <FormButton
          buttonTitle="Subscribe"
          onPress={() => navigation.navigate('SubscriptionsCard')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  amount: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    color: '#000',
    fontSize: 28,
  },
});

export default AnnualSubscription;
