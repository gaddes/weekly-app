import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Create } from '../components';
import { Title, HorizontalLine } from '../components/common';

export default function CreateView() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>Create</Title>
      <HorizontalLine />

      <Create />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginVertical: 24,
    marginHorizontal: 24,
  },
});