import React from 'react';
import { useDispatch } from 'react-redux';
import { Text, Alert } from 'react-native';
import Purchases from 'react-native-purchases';
import isEmpty from 'lodash/isEmpty';

import userModel from '../../data/store/user';

const Restore = () => {
  const { fetchSubscription } = userModel.actions;
  const dispatch = useDispatch();

  const restorePurchases = async () => {
    try {
      const { purchaserInfo } = await Purchases.restoreTransactions();
      // ... check restored purchaserInfo to see if entitlement is now active
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
  };

  return (
    <Text onPress={restorePurchases}>
      Restore Purchases
    </Text>
  );
}

export default Restore;