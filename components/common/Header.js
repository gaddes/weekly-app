import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { Upgrade } from '../Upgrade';

const handlePress = () => {
  Alert.alert(
    'Coming soon!'
  );
};

export default function Header(props) {
  const [upgradeVisible, setUpgradeVisible] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setUpgradeVisible(true)}>
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

      <Upgrade
        visible={upgradeVisible}
        setVisible={setUpgradeVisible}
      />
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