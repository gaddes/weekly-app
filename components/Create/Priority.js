import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../common';

export default function Priority(props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        // Apply active styles if current 'active' value relates to this button
        props.activePriority === props.idx && styles.buttonActive
      ]}
      onPress={() => props.setActivePriority(props.idx)}
    >
      <Text style={styles.priority}>
        {props.priority}
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

  priority: {
    fontSize: 20,
    textAlign: 'center',
  },
});