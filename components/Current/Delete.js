import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import tasksModel from '../../data/store/tasks';
import { Text } from '../common';

export default function Delete(props) {
  if (!props.editing) return null;

  const dispatch = useDispatch();
  const { deleteTask } = tasksModel.actions;

  return (
    <TouchableOpacity
      onPress={() => dispatch(deleteTask(props.id))}
      style={styles.button}
    >
      <Text style={styles.text}>
        Delete
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderRadius: 6,
    padding: 8,
  },

  text: {
    fontSize: 16,
  },
});