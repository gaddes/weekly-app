import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';

import tasksModel from '../../data/store/tasks';
import { Button } from '../common';

export default function Delete(props) {
  if (!props.editing) return null;

  const dispatch = useDispatch();
  const { deleteTask } = tasksModel.actions;

  return (
    <Button
      text="Delete"
      onPress={() => dispatch(deleteTask(props.id))}
      style={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
});