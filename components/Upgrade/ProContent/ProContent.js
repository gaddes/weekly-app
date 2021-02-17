import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Thanks for supporting us - you're a pro! 🎉
      </Text>

      <Text style={styles.text}>
        You now have access to these exclusive pro features:
      </Text>

      <Text style={styles.bullets}>Add more than 7 tasks</Text>

      <Text style={styles.text}>
        You'll also be supporting your friendly neighbourhood developer 🙆🏼‍♂️
      </Text>

      <Text style={styles.text}>
        And remember, we promise no ads... ever!
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