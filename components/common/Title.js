import React from 'react';
import { StyleSheet } from 'react-native';

import Text from './Text';

export default function Title(props) {
  return (
    <Text style={styles.title}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
});