import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useForm } from 'react-hook-form';

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
  }, [register])

  const onSubmit = data => {
    console.log({ data });
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