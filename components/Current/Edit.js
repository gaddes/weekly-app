import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../common';

export default function Edit(props) {
  if (!props.editing) return null;

  return (
    <TouchableOpacity
      onPress={() => console.log('edit item on create screen')}
      style={styles.button}
    >
      <Text style={styles.text}>
        Edit
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