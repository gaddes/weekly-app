import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '../common';

export default function ArchiveItems(props) {
  if (!props.items.length) return null;

  return (
    props.items.map(task => (
      <View key={task.id}>
        <Text style={styles.title}>
          {task.title}
        </Text>
      </View>
    ))
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});