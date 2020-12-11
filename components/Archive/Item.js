import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ArchiveItem(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },

  title: {
    fontSize: 20,
  },
});