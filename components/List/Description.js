import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Name(props) {
  if (!props.editing) return null;

  return (
    <Text style={styles.text}>
      This is a very interesting description...
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 64,
  },
});