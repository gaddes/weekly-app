import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Purchases from 'react-native-purchases';
import isEmpty from 'lodash/isEmpty';

import UpgradeButton from './UpgradeButton';

// Map to convert package duration into a more readable string
const packageTypeMap = {
  MONTHLY: 'month',
  ANNUAL: 'year',
};

const handlePurchase = async iap => {
  try {
    // TODO: test whether we need purchaserInfo and what exactly we do
    //  with it in the following IF statement...
    const { purchaserInfo } = await Purchases.purchasePackage(iap);

    if (!isEmpty(purchaserInfo.entitlements.active.pro)) {
      // TODO: Unlock that great "pro" content (set pro in global store!)
    }
  } catch (e) {
    if (!e.userCancelled) {
      Alert.alert(
        'Error',
        'Please try again',
      );
    }
  }
}

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

                <UpgradeButton onPress={() => handlePurchase(iap)}>
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