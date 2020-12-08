import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { addTask } from '../../data/reducers/taskSlice';

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
    dispatch(addTask(data));
  };

  return (
    <View>
      <Text>Title</Text>
      <TextInput onChangeText={text => {
        setValue('title', text);
      }} />

      <Text>Description (optional)</Text>
      <TextInput onChangeText={text => {
        setValue('description', text);
      }} />

      <Days setValue={setValue} />

      <Priority setValue={setValue} />

      <View>
        <Text>Priority</Text>
      </View>

      <View>
        <Button
          title="Create"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}