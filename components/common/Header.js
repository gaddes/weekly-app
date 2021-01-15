import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Purchases from 'react-native-purchases';
import Feather from '@expo/vector-icons/Feather';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { Upgrade } from '../Upgrade';

const handlePress = () => {
  Alert.alert(
    'Coming soon!'
  );
};

export default function Header(props) {
  const [upgradeVisible, setUpgradeVisible] = useState(false);
  const [products, setProducts] = useState([]);

  const handlePressUpgrade = async () => {
    try {
      const offerings = await Purchases.getOfferings();

      if (isNil(offerings.current) || isEmpty(offerings.current.availablePackages)) {
        // Show error message and return early if offerings can't be retrieved
        Alert.alert('Upgrade options could not be retrieved');
        return;
      }

      // Set products in state so modal has access to them
      setProducts(offerings.current.availablePackages);

      // Show modal
      setUpgradeVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePressUpgrade}>
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
        products={products}
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