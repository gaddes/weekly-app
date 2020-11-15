import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CreateIcon(props) {
  // TODO: pull these colors from global colors file
  const color = props.focused ? 'tomato' : 'gray';
  const name = props.focused ? 'ios-add-circle' : 'ios-add-circle-outline';

  return (
    <Ionicons
      style={styles.icon}
      name={name}
      size={72}
      color={color}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'relative',
    bottom: 18,
  },
});