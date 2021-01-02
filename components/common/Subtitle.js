import React from 'react';
import { StyleSheet } from 'react-native';

import Text from './Text';

export default function Subtitle(props) {
  return (
    <Text style={styles.subtitle}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
});