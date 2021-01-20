import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FreeContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Thanks for supporting us - you're a pro! 🎉
      </Text>
      <Text style={styles.text}>
        To view or make changes to your subscription, please visit your App Store account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 12,
  }
});