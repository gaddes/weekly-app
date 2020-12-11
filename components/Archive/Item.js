import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from '../common';

export default function ArchiveItem(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.task.title}
      </Text>

      <Button
        onPress={() => props.setEditedTask(props.task)}
        text="Add"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    width: '100%',
    paddingHorizontal: 36,

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
  },
});