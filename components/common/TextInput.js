import React from 'react';
import { TextInput as BaseTextInput, StyleSheet } from 'react-native';

// See notes on common Text component
export default function Text({ style, ...props}) {
  return (
    <BaseTextInput
      style={[styles.input, style]}
      {...props}
    >
      {props.children}
    </BaseTextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 24,
  },
});