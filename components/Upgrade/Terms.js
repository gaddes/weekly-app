import React from 'react';
import { Text, Linking } from 'react-native';

const Terms = () => (
  <Text onPress={() => Linking.openURL('https://weekly-privacy-policy.netlify.app')}>
    Terms of Use
  </Text>
);

export default Terms;