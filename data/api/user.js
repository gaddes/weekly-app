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
};