import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { days } from '../../helpers';

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
          active === days[0] && styles.buttonActive
        ]}
        onPress={() => handlePress('day', days[0])}
      >
        <Text>{days[0]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === days[1] && styles.buttonActive
        ]}
        onPress={() => handlePress('day', days[1])}
      >
        <Text>{days[1]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === days[2] && styles.buttonActive
        ]}
        onPress={() => handlePress('day', days[2])}
      >
        <Text>{days[2]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === days[3] && styles.buttonActive
        ]}
        onPress={() => handlePress('day', days[3])}
      >
        <Text>{days[3]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === days[4] && styles.buttonActive
        ]}
        onPress={() => handlePress('day', days[4])}
      >
        <Text>{days[4]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === days[5] && styles.buttonActive
        ]}
        onPress={() => handlePress('day', days[5])}
      >
        <Text>{days[5]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === days[6] && styles.buttonActive
        ]}
        onPress={() => handlePress('day', days[6])}
      >
        <Text>{days[6]}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonActive: {
    backgroundColor: 'lightgrey',
  },
});