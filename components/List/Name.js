import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Name(props) {
  const toggleEdit = () => {
    props.setEditing(!props.editing);
  };

  return (
    <TouchableOpacity onPress={toggleEdit}>
      <Text style={styles(props).text}>
        Lorem ipsum
      </Text>
    </TouchableOpacity>
  );
}

const styles = props => StyleSheet.create({
  text: {
    fontSize: 20,
    marginHorizontal: '1rem',
    textDecorationLine: props.completed && 'line-through',
  },
});