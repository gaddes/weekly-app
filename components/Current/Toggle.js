import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

import { toggleCompleted } from '../../data/reducers/taskSlice';

export default function Toggle(props) {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleCompleted(props.id));
  };

  return (
    <TouchableOpacity
      onPress={toggle}
      style={styles.button}
    >
      {props.completed && (
        <Ionicons name="ios-checkmark" size={72} color="tomato" />
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
    borderColor: 'gray',
    borderRadius: 24,

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});