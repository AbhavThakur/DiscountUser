import React, {useCallback, memo, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

// const slideList = Array.from({length: 3}).map((_, i) => {
//   return {
//     id: i,
//     image: `https://picsum.photos/1440/2842?random=${i}`,
//     title: `This is the title ${i + 1}!`,
//     subtitle: `This is the subtitle ${i + 1}!`,
//   };
// });

const slideList = [
  {
    id: 1,
    title: 'Host multiple charging points',
    subtitle:
      'Increase footfall to your establishment by enabling EV charging.We provide free installation veCharge point.',
    image: require('../assets/park.png'),
  },
  {
    id: 2,
    title: 'Host and earn income',
    subtitle:
      'Earn additional income by setting up your own prices for the charging. Withdraw the money to your account easily. We will also provide branding for your brand in future.',
    image: require('../assets/dmart.png'),
  },
  {
    id: 3,
    title: 'Complete automated solution',
    subtitle:
      'Monitor and analyze the charging status of all your devices in realtime via veCharge dashboard. The device is a zero maintenance product requiring no human intervention.',
    image: require('../assets/park.png'),
  },
  {
    id: 4,
    title: 'Complete automated solution',
    subtitle:
      'Monitor and analyze the charging status of all your devices in realtime via veCharge dashboard. The device is a zero maintenance product requiring no human intervention.',
    image: require('../assets/dmart.png'),
  },
];

function Pagination({index}) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function Discount() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const Slide = memo(function Slide({data}) {
    return (
      <View
        style={{
          width: windowWidth * 0.55,
          padding: 10,
        }}>
        <Image
          source={data.image}
          style={{
            width: windowWidth * 0.5,
            height: windowHeight * 0.15,
          }}
        />
      </View>
    );
  });

  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = distance > 0.4;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  const renderItem = useCallback(function renderItem({item}) {
    return <Slide data={item} />;
  }, []);

  return (
    <View
      style={{
        height: windowHeight * 0.22,
        paddingTop: 5,
        alignItems: 'center',
      }}>
      <FlatList
        data={slideList}
        // style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />

      <Pagination index={index} />
    </View>
  );
}
const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 20,
    borderColor: '#7c7c7c',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    height: '27%',
    width: '87%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  slideImage: {width: 190, height: 158},

  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  paginationDotActive: {backgroundColor: '#fff', width: 20},
  paginationDotInactive: {backgroundColor: 'white'},
});
