import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const handlePress = () => {
  Alert.alert(
    'Coming soon!'
  );
};

export default function Header(props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePress}>
        <Feather
          style={{ marginLeft: 12 }}
          name="arrow-up-circle"
          size={22}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {props.title}
      </Text>

      <TouchableOpacity onPress={handlePress}>
        <Feather
          style={{ marginRight: 12 }}
          name="settings"
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});