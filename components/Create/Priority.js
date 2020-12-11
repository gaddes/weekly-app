import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { priorities } from '../../helpers';
import { Text } from '../common';

export default function Priority({ activePriority, setActivePriority }) {
  return (
    <View>
      <Text>Priority</Text>

      <TouchableOpacity
        style={[
          styles.button,
          // Apply active styles if current 'active' value relates to this button
          activePriority === 0 && styles.buttonActive
        ]}
        onPress={() => setActivePriority(0)}
      >
        <Text style={styles.priority}>
          {priorities[0]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activePriority === 1 && styles.buttonActive
        ]}
        onPress={() => setActivePriority(1)}
      >
        <Text style={styles.priority}>
          {priorities[1]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activePriority === 2 && styles.buttonActive
        ]}
        onPress={() => setActivePriority(2)}
      >
        <Text style={styles.priority}>
          {priorities[2]}
        </Text>
      </TouchableOpacity>
    </View>
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