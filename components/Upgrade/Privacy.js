import React from 'react';
import { Text, Linking } from 'react-native';

const Privacy = () => (
  <Text onPress={() => Linking.openURL('https://weekly-privacy-policy.netlify.app')}>
    Privacy Policy
  </Text>
);

export default Privacy;