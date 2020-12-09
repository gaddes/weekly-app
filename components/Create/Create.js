import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { saveTask } from '../../data/reducers/taskSlice';
import { Text, TextInput } from '../common';

import Days from './Days';
import Priority from './Priority';

export default function Create() {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register('title');
    register('description');
    register('day');
    register('priority');
  }, [register]);

  // Helper to determine if newly-created task has all required fields.
  // Returns true if any of the "invalid" conditions are met.
  const taskIsInvalid = data =>
    isNil(data.title) ||
    isEmpty(data.title) ||
    isNil(data.day) ||
    isNil(data.priority);

  const onSubmit = data => {
    if (taskIsInvalid(data)) {
      Alert.alert(
        'Error',
        'Please enter all required fields',
      );
      return;
    }
    dispatch(saveTask(data));
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setValue('title', text);
        }}
      />

      <Text>Description (optional)</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        numberOfLines={4} // This seems to have no effect...
        onChangeText={text => {
          setValue('description', text);
        }}
      />

      <Days setValue={setValue} />

      <Priority setValue={setValue} />

      <Button
        title="Create"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
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