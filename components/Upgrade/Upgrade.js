import React  from 'react';
import { useSelector } from 'react-redux';
import { View, Modal, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import userModel from '../../data/store/user';
import ProContent from './ProContent';
import FreeContent from './FreeContent';

export default function Upgrade(props) {
  const { selectIsPro } = userModel.selectors;
  const isPro = useSelector(selectIsPro);
  const Content = isPro ? ProContent : FreeContent;

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
    >
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Upgrade</Text>

          <TouchableOpacity onPress={() => props.setVisible(false)}>
            <Text style={styles.cancel}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Content />
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
    paddingVertical: 16,
    paddingHorizontal: 24,
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
});