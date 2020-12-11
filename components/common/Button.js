import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';

export default function Button(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.button}
    >
      <Text style={styles.text}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderRadius: 6,
    padding: 8,
  },

  text: {
    fontSize: 16,
  },
});