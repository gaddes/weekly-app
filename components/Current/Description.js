import React from 'react';
import { StyleSheet, Text } from 'react-native';

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
    marginLeft: 64,
  },
});