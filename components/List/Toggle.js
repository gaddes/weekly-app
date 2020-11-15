import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Toggle(props) {
  const toggle = () => {
    props.setCompleted(!props.completed);
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
    border: '2px solid gray',
    borderRadius: '50%',

    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});