import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { selectCurrentTasks } from '../data/reducers/taskSlice';

import { ListItems } from '../components';
// TODO: where should this component live?
import Day from '../components/List/Day';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function ListView() {
  const currentTasks = useSelector(selectCurrentTasks);

  if (!currentTasks) return null;

  return (
    currentTasks.map((items, idx) => (
      <View key={idx}>
        <Day
          day={days[idx]}
          items={items}
        />
        <ListItems items={items} />
      </View>
    ))
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  greeting: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: 'blue',
    margin: 16,
    padding: 16,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});