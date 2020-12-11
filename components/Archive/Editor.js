import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import isNil from 'lodash/isNil';

import tasksModel from '../../data/store/tasks';
import { Text, Button } from '../common';
// TODO: place this component in common folder?
import Days from '../Create/Days';

export default function Editor(props) {
  const { addTask, deleteFromArchive } = tasksModel.actions;
  const [day, setDay] = useState(null);
  const dispatch = useDispatch();

  const taskData = { ...props.editedTask, day, };

  // Helper to determine if newly-created task has all required fields.
  // Returns true if any of the "invalid" conditions are met.
  const taskIsInvalid = () => isNil(day);

  const handleSave = () => {
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.title}>
        Editor
      </Text>

      <Text style={styles.subtitle}>
        Which day would you like to add this to?
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
  title: {
    fontSize: 32,
  },

  subtitle: {
    fontSize: 18,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});