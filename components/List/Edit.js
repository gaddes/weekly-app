import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Edit(props) {
  if (!props.editing) return null;

  return (
    <TouchableOpacity
      onPress={() => console.log('edit item on create screen')}
      style={styles.button}
    >
      <Text>Edit</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    border: '1px solid gray',
    padding: '0.5rem',
  },
});