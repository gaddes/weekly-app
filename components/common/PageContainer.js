import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function PageContainer(props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {props.children}
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