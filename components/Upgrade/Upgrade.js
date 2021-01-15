import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import UpgradeButton from './UpgradeButton';

// Map to convert package duration into a more readable string
const packageTypeMap = {
  MONTHLY: 'month',
  ANNUAL: 'year',
};

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
          {/* TODO: convert this to component*/}
          {props.products.map(iap => {
            const { title, description, currency_code, price_string } = iap.product;
            const duration = packageTypeMap[iap.packageType];

            return (
              <View
                key={title}
                style={styles.iapWrapper}
              >
                <Text style={styles.iapTitle}>
                  {title}
                </Text>

                <Text style={styles.iapDescription}>
                  {description}
                </Text>

                {/* TODO: allow user to purchase on click */}
                <UpgradeButton onPress={() => {}}>
                  <Text style={styles.buttonText}>
                    {currency_code} {price_string} per {duration}
                  </Text>
                </UpgradeButton>
              </View>
            );
          })}
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

  iapWrapper: {
    margin: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iapTitle: {
    fontSize: 20,
    marginBottom: 8,
  },

  iapDescription: {
    textAlign: 'center',
    marginBottom: 12,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});