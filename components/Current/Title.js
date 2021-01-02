import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { Text } from '../common';

export default function Title(props) {
  const toggleEdit = () => {
    props.setEditing(!props.editing);
  };

  return (
    <TouchableOpacity
      onPress={toggleEdit}
      style={{ display: 'inline' }}
    >
      <Text style={styles(props).text}>
        {props.title}
      </Text>

      {/* Show icon when item contains a description */}
      {props.description && (
        <Feather
          style={{ marginRight: 16 }}
          name="align-left"
          size={18}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = props => StyleSheet.create({
  text: {
    fontSize: 20,
    marginHorizontal: 16,
    textDecorationLine: props.completed ? 'line-through' : 'none',
  },
});