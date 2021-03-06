import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Purchases from 'react-native-purchases';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import UpgradeButton from '../UpgradeButton';
import Privacy from '../Privacy';
import Terms from '../Terms';
import Restore from '../Restore';
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
    getOfferings().then(data => setProducts(data || []));
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
      <View style={styles.textWrapper}>
        <Text style={styles.text}>
          Choose a subscription to gain access to pro features:
        </Text>

        <Text style={styles.bullets}>Add more than 7 tasks</Text>

        <Text style={styles.text}>
          Our future roadmap contains many exciting updates... we'll keep you posted!
        </Text>
      </View>

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

      <Text style={styles.text}>
        You'll also be supporting your friendly neighbourhood developer 🙆🏼‍♂️
      </Text>

      <Text style={styles.text}>
        And remember, regardless of whether you go pro or stay free, we promise no ads... ever!
      </Text>

      <View style={styles.terms}>
        <Privacy />
        <Terms />
      </View>

      <View style={styles.restore}>
        <Restore />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 12,
  },

  bullets: {
    fontWeight: 'bold',
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

  terms: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },

  restore: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});