import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { priorities } from '../../helpers';
import { Text } from '../common';

export default function Priority({ activePriority, setActivePriority, idx }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        // Apply active styles if current 'active' value relates to this button
        activePriority === idx && styles.buttonActive
      ]}
      onPress={() => setActivePriority(idx)}
    >
      <Text style={styles.priority}>
        {priorities[idx]}
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