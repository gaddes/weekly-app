import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Priority(props) {
  if (!props.items.length) return null;

  return (
    <Text style={styles.text}>
      {props.priority}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    marginHorizontal: 16,
  },
});