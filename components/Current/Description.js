import React from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '../common';

export default function Description(props) {
  if (!props.editing) return null;

  return (
    <Text style={styles.text}>
      {props.description}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginLeft: 64,
  },
});