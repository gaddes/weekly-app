import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import isEmpty from 'lodash/isEmpty';

export default {
  getSubscriptionStatus: async () => {
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();
      const activeProSubscription = purchaserInfo.entitlements.active.pro;
      if (!isEmpty(activeProSubscription)) {
        return activeProSubscription;
      }
    } catch (e) {
      console.error(e);
    }
  },

  getLastLogin: async () => {
    try {
      const lastLogin = await AsyncStorage.getItem('lastLogin');
      // HOLD: Use this to test different dates of last user login
      // const lastLogin = new Date('01-28-2021').getTime();

      // If no data exists (e.g. first app load), return current date in milliseconds
      return lastLogin !== null ? Number(lastLogin) : new Date().getTime();
    } catch (e) {
      console.log('error', e);
    }
  },

  setLastLogin: async lastLogin => {
    try {
      const lastLoginString = lastLogin.toString();
      await AsyncStorage.setItem('lastLogin', lastLoginString);
    } catch (e) {
      console.error(e);
    }
  },
};