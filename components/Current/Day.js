import React from 'react';
import { StyleSheet } from 'react-native';
import isEmpty from 'lodash/isEmpty';

import { Text } from '../common';

export default function Day(props) {
  if (isEmpty(props.items)) return null;

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