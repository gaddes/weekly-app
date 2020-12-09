import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { days } from '../../helpers';
import { Text } from '../common';

export default function Days({ activeDay, setActiveDay }) {
  return (
    <View>
      <Text>Day</Text>

      <TouchableOpacity
        style={[
          styles.button,
          // Apply active styles if current 'active' value relates to this button
          activeDay === 0 && styles.buttonActive
        ]}
        onPress={() => setActiveDay(0)}
      >
        <Text style={styles.day}>
          {days[0]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeDay === 1 && styles.buttonActive
        ]}
        onPress={() => setActiveDay(1)}
      >
        <Text style={styles.day}>
          {days[1]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeDay === 2 && styles.buttonActive
        ]}
        onPress={() => setActiveDay(2)}
      >
        <Text style={styles.day}>
          {days[2]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeDay === 3 && styles.buttonActive
        ]}
        onPress={() => setActiveDay(3)}
      >
        <Text style={styles.day}>
          {days[3]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeDay === 4 && styles.buttonActive
        ]}
        onPress={() => setActiveDay(4)}
      >
        <Text style={styles.day}>
          {days[4]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeDay === 5 && styles.buttonActive
        ]}
        onPress={() => setActiveDay(5)}
      >
        <Text style={styles.day}>
          {days[5]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeDay === 6 && styles.buttonActive
        ]}
        onPress={() => setActiveDay(6)}
      >
        <Text style={styles.day}>
          {days[6]}
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

  day: {
    fontSize: 20,
    textAlign: 'center',
  },
});