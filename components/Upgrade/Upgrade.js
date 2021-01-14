import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import UpgradeButton from './UpgradeButton';

export default function Upgrade(props) {
  return (
    <Modal
      visible={props.visible}
      animationType="slide"
    >
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Become Pro!</Text>

          <TouchableOpacity onPress={() => props.setVisible(false)}>
            <Text style={styles.cancel}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.iap}>
            <Text style={styles.description}>
              Full access to all pro features
            </Text>

            <UpgradeButton onPress={() => {}}>
              <Text style={styles.buttonText}>
                {/* TODO: get this value from RevenueCat */}
                $1.29 per month
              </Text>
            </UpgradeButton>
          </View>

          <View style={styles.iap}>
            <Text style={styles.description}>
              Full access to all pro features - save annually!
            </Text>

            <UpgradeButton onPress={() => {}}>
              <Text style={styles.buttonText}>
                {/* TODO: get this value from RevenueCat */}
                $9.99 per year
              </Text>
            </UpgradeButton>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
  },

  cancel: {
    color: 'rgb(0, 122, 255)',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },

  content: {
    padding: 12,
  },

  iap: {
    margin: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  description: {
    textAlign: 'center',
    marginBottom: 12,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});