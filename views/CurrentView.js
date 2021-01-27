import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import flatten from 'lodash/flatten';

import tasksModel from '../data/store/tasks';
import { days } from '../helpers';
import { CurrentItems, Day } from '../components';
import { useDayIndices } from '../hooks';
import { Text, Subtitle, PageContainer, Button } from '../components/common';

export default function CurrentView({ navigation }) {
  const { moveUncompletedTasksToArchive } = tasksModel.actions;
  const { selectCurrentTasks } = tasksModel.selectors;
  const tasks = useSelector(selectCurrentTasks);
  const dispatch = useDispatch();
  const tasksAreEmpty = isEmpty(flatten(tasks));

  const { currentDayIdx } = useDayIndices();

  // TODO: is the comment below correct?
  //  ...suspect logic in this file should be refactored for greater clarity
  // Required to handle initial loading case before tasks have been retrieved from store
  if (isEmpty(tasks)) return null;

  // Move uncompleted tasks to archive
  dispatch(moveUncompletedTasksToArchive(currentDayIdx));

  return (
    <PageContainer title="Tasks">
      {tasksAreEmpty && (
        <>
          <Text>Congratulations</Text>
          <Subtitle>You have nothing to do!</Subtitle>
          <Button
            text="Add task"
            onPress={() => navigation.navigate('New')}
            style={styles.button}
          />
        </>
      )}

      {tasks.map((items, idx) => (
        <View key={idx} style={styles.task}>
          <Day
            day={days[idx]}
            items={items}
          />
          <CurrentItems
            items={items}
            navigate={navigation.navigate}
          />
        </View>
      ))}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  task: {
    width: '100%',
  },
});