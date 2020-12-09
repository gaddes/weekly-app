import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Text } from '../common';

export default function Success({ setSuccess }) {
  return (
    <View style={styles.container}>
      <Text>Task added successfully!</Text>

      <View style={styles.button}>
        <Button
          title="Add new task"
          onPress={() => setSuccess(false)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 20,
  },
});