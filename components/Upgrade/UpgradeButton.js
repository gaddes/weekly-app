import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function UpgradeButton(props) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={props.onPress}
    >
      <View style={styles.button}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    height: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'orange',
  },

  button: {
    borderColor: 'orange',
    borderWidth: 1,
  },
});