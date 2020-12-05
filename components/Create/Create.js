import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useForm } from 'react-hook-form';

import Days from './Days';

export default function Create() {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register('title');
    register('description');
    register('day');
  }, [register])

  const onSubmit = data => {
    console.log({ data });
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