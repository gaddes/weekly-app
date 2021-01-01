import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../common';

export default function Day(props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        // Apply active styles if current 'active' value relates to this button
        props.activeDay === props.idx && styles.buttonActive
      ]}
      onPress={() => props.setActiveDay(props.idx)}
    >
      <Text style={styles.day}>
        {props.day}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 6,
    textAlign: 'center',
  },

  buttonActive: {
    backgroundColor: 'lightgrey',
  },

  day: {
    fontSize: 20,
    textAlign: 'center',
  },
});