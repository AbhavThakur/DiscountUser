import React from 'react';
import LottieView from 'lottie-react-native';

function Animations({source}) {
  return <LottieView autoPlay loop source={source} />;
}

export default Animations;
