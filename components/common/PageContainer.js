import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Header from './Header';

export default function PageContainer(props) {
  return (
    <>
      <Header title={props.title} />
      <ScrollView contentContainerStyle={styles.container}>
        {props.children}
      </ScrollView>
    </>
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

    marginBottom: 24,
  },
});