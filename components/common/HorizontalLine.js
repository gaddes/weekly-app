import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function HorizontalLine() {
  return (
    <View style={styles.line} />
  );
}

const styles = StyleSheet.create({
  line: {
    height: 3,
    width: '80%',
    backgroundColor: 'black',
    marginVertical: 16,
  },
});