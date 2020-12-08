import React from 'react';
import { View, Text } from 'react-native';

export default function ArchiveItems(props) {
  if (!props.items.length) return null;

  return (
    props.items.map(task => (
      <View key={task.id}>
        <Text>{task.title}</Text>
      </View>
    ))
  );
}