import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { priorities } from '../../helpers';

export default function Priority({ setValue }) {
  const [active, setActive] = useState();

  const handlePress = (key, value) => {
    setValue(key, value);
    setActive(value);
  };

  return (
    <View>
      <Text>Priority</Text>

      <TouchableOpacity
        style={[
          styles.button,
          // Apply active styles if current 'active' value relates to this button
          active === priorities[0] && styles.buttonActive
        ]}
        onPress={() => handlePress('priority', priorities[0])}
      >
        <Text>{priorities[0]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === priorities[1] && styles.buttonActive
        ]}
        onPress={() => handlePress('priority', priorities[1])}
      >
        <Text>{priorities[1]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          active === priorities[2] && styles.buttonActive
        ]}
        onPress={() => handlePress('priority', priorities[2])}
      >
        <Text>{priorities[2]}</Text>
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