import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { days } from '../../helpers';
import { Text } from '../common';

export default function Days({ setValue }) {
  const [active, setActive] = useState();

  const handlePress = (key, value) => {
    setValue(key, value);
    setActive(value);
  };

  return (
    <View>
      <Text>Day</Text>

      <TouchableOpacity
        style={[
          styles.button,
          // Apply active styles if current 'active' value relates to this button
          active === 0 && styles.buttonActive
        ]}
        onPress={() => handlePress('day', 0)}
      >
        <Text style={styles.day}>
          {days[0]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === 1 && styles.buttonActive
        ]}
        onPress={() => handlePress('day', 1)}
      >
        <Text style={styles.day}>
          {days[1]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === 2 && styles.buttonActive
        ]}
        onPress={() => handlePress('day', 2)}
      >
        <Text style={styles.day}>
          {days[2]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === 3 && styles.buttonActive
        ]}
        onPress={() => handlePress('day', 3)}
      >
        <Text style={styles.day}>
          {days[3]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === 4 && styles.buttonActive
        ]}
        onPress={() => handlePress('day', 4)}
      >
        <Text style={styles.day}>
          {days[4]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === 5 && styles.buttonActive
        ]}
        onPress={() => handlePress('day', 5)}
      >
        <Text style={styles.day}>
          {days[5]}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === 6 && styles.buttonActive
        ]}
        onPress={() => handlePress('day', 6)}
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