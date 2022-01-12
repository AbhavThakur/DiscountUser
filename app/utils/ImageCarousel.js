import React, {Component, createRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {windowHeight, windowWidth} from './Dimentions';

let CurrentSlide = 0;
let IntervalTime = 2000;

export default class Slider extends Component {
  flatList = createRef();

  _goToNextPage = () => {
    if (CurrentSlide >= this.state.link.length - 1) CurrentSlide = -1;

    this.flatList.current.scrollToIndex({
      index: ++CurrentSlide,
      animated: true,
    });
  };

  _startAutoPlay = () => {
    this._timerId = setInterval(this._goToNextPage, IntervalTime);
  };

  _stopAutoPlay = () => {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  };

  componentDidMount() {
    this._stopAutoPlay();
    this._startAutoPlay();
  }

  componentWillUnmount() {
    this._stopAutoPlay();
  }

  // TODO _renderItem()
  _renderItem({item, index}) {
    return <Image source={item.image} style={styles.sliderItems} />;
  }

  // TODO _keyExtractor()
  _keyExtractor(item, index) {
    // console.log(item);
    return index.toString();
  }
  state = {
    link: [
      {
        id: 1,

        image: require('../assets/posters/userappbanner1.png'),
      },
      {
        id: 2,

        image: require('../assets/posters/userappbanner2.png'),
      },
      {
        id: 3,

        image: require('../assets/posters/userappbanner3.png'),
      },
      {
        id: 4,

        image: require('../assets/posters/userappbanner4.png'),
      },
    ],
  };

  render() {
    return (
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          height: windowHeight * 0.2,
          alignItems: 'center',
        }}>
        <FlatList
          style={{
            backgroundColor: '#fff',
          }}
          data={this.state.link}
          keyExtractor={this._keyExtractor.bind(this)}
          renderItem={this._renderItem.bind(this)}
          horizontal={true}
          flatListRef={React.createRef()}
          ref={this.flatList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderItems: {
    height: 150,
    width: windowWidth,
  },
});
