import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch } from 'react-redux';

import tasksModel from '../../data/store/tasks';

export default function SwipeableRow(props) {
  const rowRef = useRef();
  const dispatch = useDispatch();
  const { deleteTask } = tasksModel.actions;

  const renderRightAction = (text, color) => {
    const pressHandler = () => {
      close();

      switch (text) {
        case 'Edit':
          // Navigate to EDIT screen with ID param
          props.navigate('New', { id: props.id });
          break;
        case 'Delete':
          dispatch(deleteTask(props.id));
          break;
        default:
          alert(text);
      }
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = () => (
    <View style={{ width: 160, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
      {renderRightAction('Edit', '#C8C7CD')}
      {renderRightAction('Delete', '#dd2c00')}
    </View>
  );

  const updateRef = ref => {
    rowRef.current = ref;
  };

  const close = () => {
    rowRef.current.close();
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {props.children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
