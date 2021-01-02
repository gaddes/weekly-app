import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';

import tasksModel from '../../data/store/tasks';
import { colors } from '../../helpers';

export default function Toggle(props) {
  const { toggleCompleted } = tasksModel.actions;
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleCompleted(props.id));
  };

  return (
    <TouchableOpacity
      onPress={toggle}
      style={[styles.button, { borderColor: colors[props.priority] }]}
    >
      {props.completed && (
        <Feather
          name="check"
          size={32}
          color={colors[props.priority]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 48,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 24,

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});