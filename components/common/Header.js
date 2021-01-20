import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';

import { Upgrade } from '../Upgrade';
import userModel from '../../data/store/user';

const handlePress = () => {
  Alert.alert(
    'Coming soon!'
  );
};

export default function Header(props) {
  const [upgradeVisible, setUpgradeVisible] = useState(false);

  const { selectIsPro } = userModel.selectors;
  const isPro = useSelector(selectIsPro);

  return (
    <View
      style={[
        styles.header,
        { paddingVertical: isPro ? 4 : 14 },
      ]}
    >
      <TouchableOpacity
        style={styles.upgradeIcon}
        onPress={() => setUpgradeVisible(true)}
      >
        <Feather
          style={{
            color: isPro ? 'darkgoldenrod' : 'black',
            marginTop: isPro ? 10 : 0,
          }}
          name="arrow-up-circle"
          size={22}
        />

        {isPro && (
          <Text style={styles.proText}>pro</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.title}>
        {props.title}
      </Text>

      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={handlePress}
      >
        <Feather
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

    paddingHorizontal: 12,
    marginBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },

  upgradeIcon: {
    marginLeft: 12,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  settingsIcon: {
    marginRight: 12,
  },

  proText: {
    fontSize: 12,
    color: 'darkgoldenrod',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});