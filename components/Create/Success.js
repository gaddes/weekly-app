import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '../common';

export default function Success({ setSuccess }) {
  return (
    <View style={styles.container}>
      <Text>Task created!</Text>

      <View style={styles.button}>
        <Button
          text="Add new task"
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