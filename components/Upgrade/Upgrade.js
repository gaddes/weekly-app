import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Modal, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Purchases from 'react-native-purchases';
import isEmpty from 'lodash/isEmpty';

import userModel from '../../data/store/user';
import UpgradeButton from './UpgradeButton';
import isNil from 'lodash/isNil';

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


export default function Upgrade(props) {
  const dispatch = useDispatch();
  const { fetchSubscription } = userModel.actions;
  const { selectIsPro } = userModel.selectors;

  const isPro = useSelector(selectIsPro);
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
          {/* TODO: show different type of modal without upgrade options */}
          {/*  e.g. "You already have the Pro subscription!" */}
          {/*  "To view or make changes, please visit your App Store account" */}
          {isPro && <Text>you're already pro!</Text>}

          {/* TODO: convert this to component*/}
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