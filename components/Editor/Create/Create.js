import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Alert } from 'react-native';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import tasksModel from '../../../data/store/tasks';
import userModel from '../../../data/store/user';
import { Text, TextInput, Button, alertTaskLimit } from '../../common';
import { useDayIndices } from '../../../hooks';
import { taskLimitFree, taskLimitPro } from '../../../helpers';

import Days from '../Days';
import Priorities from '../Priorities';
import Success from '../Success';

export default function Create() {
  const dispatch = useDispatch();
  const { currentDayIdx } = useDayIndices();

  const { addTask } = tasksModel.actions;
  const { selectNumCurrentTasks } = tasksModel.selectors;
  const numCurrentTasks = useSelector(selectNumCurrentTasks);

  const { selectIsPro } = userModel.selectors;
  const isPro = useSelector(selectIsPro);

  const taskLimit = isPro ? taskLimitPro : taskLimitFree;
  const exceededLimit = numCurrentTasks >= taskLimit;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [day, setDay] = useState(null);
  const [priority, setPriority] = useState(null);

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
    if (exceededLimit) {
      return alertTaskLimit();
    }

    if (taskIsInvalid()) {
      return Alert.alert(
        'Error',
        'Please enter all required fields',
      );
    }

    const data = { title, description, day, priority, currentDayIdx };

    dispatch(addTask(data));
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
        text="Create"
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