import React from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '../common';

export default function Day(props) {
  if (!props.items.length) return null;

  return (
    <Text style={styles.text}>
      {props.day}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 16,
  },
});