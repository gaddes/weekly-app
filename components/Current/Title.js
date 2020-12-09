import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../common';

export default function Title(props) {
  const toggleEdit = () => {
    props.setEditing(!props.editing);
  };

  return (
    <TouchableOpacity onPress={toggleEdit}>
      <Text style={styles(props).text}>
        {props.title}
      </Text>
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