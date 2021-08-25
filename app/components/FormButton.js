import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';

const FormButton = ({buttonTitle, btnstyle, ...rest}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, btnstyle]} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 16,
    backgroundColor: '#D02824',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#ffffff',
  },
});
