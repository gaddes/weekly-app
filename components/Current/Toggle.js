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
      style={styles(props).button}
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

const styles = props => StyleSheet.create({
  button: {
    height: 48,
    width: 48,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors[props.priority],
    borderRadius: 24,

    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});