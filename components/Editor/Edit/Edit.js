import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Alert } from 'react-native';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import tasksModel from '../../../data/store/tasks';
import { Text, TextInput, Button, Title, HorizontalLine } from '../../common';

import Days from '../Days';
import Priorities from '../Priorities';
import Success from '../Success';

export default function Edit(props) {
  const { updateTask } = tasksModel.actions;
  const dispatch = useDispatch();

  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.description);
  const [day, setDay] = useState(props.task.day);
  const [priority, setPriority] = useState(props.task.priority);

  const [success, setSuccess] = useState(false);

  const resetValues = () => {
    setTitle('');
    setDescription('');
    setDay(null);
    setPriority(null);
  };

  // Helper to determine if newly-created task has all required fields.
  // Returns true if any of the "invalid" conditions are met.
  const taskIsInvalid = () =>
    isNil(title) ||
    isEmpty(title) ||
    isNil(day) ||
    isNil(priority);

  const submit = () => {
    if (taskIsInvalid()) {
      Alert.alert(
        'Error',
        'Please enter all required fields',
      );
      return;
    }

    const data = { id: props.task.id, title, description, day, priority };

    dispatch(updateTask(data));
    setSuccess(true);
    resetValues();
  };

  if (success) return <Success setSuccess={setSuccess} />;

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />

      <Text>Description (optional)</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        numberOfLines={4} // This seems to have no effect...
        value={description}
        onChangeText={text => setDescription(text)}
      />

      <Days
        activeDay={day}
        setActiveDay={setDay}
      />

      <Priorities
        activePriority={priority}
        setActivePriority={setPriority}
      />

      <Button
        text="Update"
        onPress={submit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    paddingBottom: 32,
    alignSelf: 'stretch',
  },

  input: {
    margin: 12,
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'darkgrey',
    fontSize: 18,
  },

  multiline: {
    minHeight: 100,
    height: 'auto',
  },
});