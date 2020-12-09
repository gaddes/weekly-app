import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../common';

export default function Delete(props) {
  if (!props.editing) return null;

  return (
    <TouchableOpacity
      onPress={() => console.log('delete item')}
      style={styles.button}
    >
      <Text style={styles.text}>
        Delete
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