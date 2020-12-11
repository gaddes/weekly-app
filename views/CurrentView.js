import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import tasksModel from '../data/store/tasks';
import { days } from '../helpers';
import { CurrentItems, Day } from '../components';
import { useDayIndices } from '../hooks';

export default function CurrentView() {
  const { addToArchive, saveArchivedDays, deleteAllTasks } = tasksModel.actions;
  const { selectCurrentTasks, selectArchivedDays } = tasksModel.selectors;
  const tasks = useSelector(selectCurrentTasks);
  const archivedDays = useSelector(selectArchivedDays);
  const dispatch = useDispatch();

  const { currentDayIdx, previousDayIdx } = useDayIndices();

  // TODO: add loading spinner and/or "no current tasks" screen
  if (isEmpty(tasks)) return null;

  /*
    NOTES on archivedDays:

    This array contains a boolean value for each day,
    representing whether items from this day have
    already been archived for this particular week.

    Set value = TRUE the first time user accesses Current View
    on that particular day, e.g. I check my tasks on Tues morn
    and the incomplete tasks from Monday move into the archive.

    This boolean flag avoids a situation where:
     - It's Tuesday, and user adds a new task for NEXT Monday
     - These tasks are immediately archived, simply because
       the index is one less than the current day (Tues)

    The flags for each day should be reset when the next week begins
    i.e. user accesses Current View and the day's index is 0.
   */

  // If the previous day has NOT been archived, do it now
  if (!archivedDays[previousDayIdx]) {
    // Get incomplete tasks from previous day
    const incompleteTasks = tasks[previousDayIdx]
      .filter(task => !task.completed);

    // Copy incomplete tasks to archive
    dispatch(addToArchive(incompleteTasks));
    // Delete all tasks from previous day
    dispatch(deleteAllTasks(previousDayIdx));
    // Set flag in state so we don't archive twice
    dispatch(saveArchivedDays(previousDayIdx));
  }

  // If we're on the first day of the week, set all archived flags to FALSE
  if (currentDayIdx === 0) {
    dispatch(saveArchivedDays(null));
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {tasks.map((items, idx) => (
        <View key={idx}>
          <Day
            day={days[idx]}
            items={items}
          />
          <CurrentItems items={items} />
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