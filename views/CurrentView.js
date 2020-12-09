import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import tasksModel from '../data/store/tasks';
import { days } from '../helpers';
import { CurrentItems, Day } from '../components';

export default function CurrentView() {
  // TODO: create helper function similar to easy-peasy that will
  //  allow us to pass a string param and it will look up the correct
  //  selector automatically from the store e.g.
  //  const currentTasks = useStore('currentTasks');
  const { selectCurrentTasks } = tasksModel.selectors;
  const tasks = useSelector(selectCurrentTasks);

  // TODO: add loading spinner and/or "no current tasks" screen
  if (isEmpty(tasks)) return null;

  return (
    <ScrollView>
      {tasks.map((items, idx) => (
        <View key={idx}>
          <Day
            day={days[idx]}
            items={items}
          />
          <CurrentItems
            dayIdx={idx}
            items={items}
          />
        </View>
      ))}
    </ScrollView>
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
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});