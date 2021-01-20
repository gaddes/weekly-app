import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Purchases from 'react-native-purchases';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import UpgradeButton from '../UpgradeButton';
import userModel from '../../../data/store/user';

// Map to convert package duration into a more readable string
const packageTypeMap = {
  MONTHLY: 'month',
  ANNUAL: 'year',
};

const getOfferings = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    if (isNil(offerings.current) || isEmpty(offerings.current.availablePackages)) {
      // Show error message and return early if offerings can't be retrieved
      Alert.alert('Upgrade options could not be retrieved');
      return;
    }
    return offerings.current.availablePackages;
  } catch (e) {
    console.error(e);
  }
};


export default function FreeContent() {
  const dispatch = useDispatch();
  const { fetchSubscription } = userModel.actions;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getOfferings().then(data => setProducts(data));
  }, []);

  const handlePurchase = async iap => {
    try {
      const { purchaserInfo } = await Purchases.purchasePackage(iap);
      if (!isEmpty(purchaserInfo.entitlements.active.pro)) {
        dispatch(fetchSubscription()); // Set subscription status in global store
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

  return (
    <View>
      {products.map(iap => {
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
  );
}

const styles = StyleSheet.create({
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