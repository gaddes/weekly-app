import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import isNil from 'lodash/isNil';

import tasksModel from '../../data/store/tasks';
import userModel from '../../data/store/user';
import { Text, Button, alertTaskLimit } from '../common';
// TODO: place this component in common folder?
import Days from '../Editor/Days';

import { taskLimitFree, taskLimitPro } from '../../helpers';

export default function Editor(props) {
  const dispatch = useDispatch();

  const { addTask, deleteFromArchive } = tasksModel.actions;
  const { selectNumCurrentTasks } = tasksModel.selectors;
  const numCurrentTasks = useSelector(selectNumCurrentTasks);

  const { selectIsPro } = userModel.selectors;
  const isPro = useSelector(selectIsPro);

  const taskLimit = isPro ? taskLimitPro : taskLimitFree;
  const exceededLimit = numCurrentTasks >= taskLimit;

  const [day, setDay] = useState(null);

  const taskData = { ...props.editedTask, day, };

  // Helper to determine if newly-created task has all required fields.
  // Returns true if any of the "invalid" conditions are met.
  const taskIsInvalid = () => isNil(day);

  const handleSave = () => {
    if (exceededLimit) {
      return alertTaskLimit();
    }

    if (taskIsInvalid()) {
      Alert.alert(
        'Error',
        'Please enter all required fields',
      );
      return;
    }

    // Add task to current
    dispatch(addTask(taskData));
    // Remove task from archive
    dispatch(deleteFromArchive(taskData));
    // Close Editor screen
    props.setEditedTask(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.subtitle}>
        When will you do this?
      </Text>

      <Days
        activeDay={day}
        setActiveDay={setDay}
      />

      <View style={styles.buttonContainer}>
        <Button
          text="Cancel"
          onPress={() => props.setEditedTask(null)}
        />

        <Button
          text="Save"
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});