import React from 'react';
import { Text as BaseText, StyleSheet } from 'react-native';

/*
  The primary purpose of this component is to provide
  a base global font size for all text in the app.

  This is not possible in the 'standard' HTML way,
  i.e. by defining a CSS style at the root level so,
  instead, we're following the recommendations made in
  the official React Native docs, which suggest to
  create a reusable common component.
 */
export default function Text({ style, ...props}) {
  return (
    <BaseText
      style={[styles.text, style]}
      {...props}
    >
      {props.children}
    </BaseText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
});