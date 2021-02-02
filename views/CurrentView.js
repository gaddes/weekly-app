import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import flatten from 'lodash/flatten';

import userModel from '../data/store/user';
import tasksModel from '../data/store/tasks';
import { CurrentItems, Day } from '../components';
import { useDayIndices, useDaysSinceLastLogin } from '../hooks';
import { Text, Subtitle, PageContainer, Button } from '../components/common';

export default function CurrentView({ navigation }) {
  const { saveLastLogin } = userModel.actions;
  const { archiveIncompleteTasks } = tasksModel.actions;
  const { selectCurrentTasks } = tasksModel.selectors;
  const tasks = useSelector(selectCurrentTasks);
  const dispatch = useDispatch();
  const tasksAreEmpty = isEmpty(flatten(tasks));

  const { currentDayIdx } = useDayIndices();
  const daysSinceLastLogin = useDaysSinceLastLogin();

  useEffect(() => {
    // Both `daysSinceLastLogin` and `tasks` may be `undefined` on app first load,
    //  before values have been retrieved from core data and set in state.
    if (daysSinceLastLogin === undefined || tasks === undefined) return;

    if (daysSinceLastLogin === 0 || tasksAreEmpty) {
      dispatch(saveLastLogin()); return;
    }

    dispatch(archiveIncompleteTasks(currentDayIdx, daysSinceLastLogin))
      .then(dispatch(saveLastLogin()));
  }, [daysSinceLastLogin, currentDayIdx, tasksAreEmpty]);

  // TODO: is the comment below correct?
  //  ...suspect logic in this file should be refactored for greater clarity
  //  ...see tasksAreEmpty defined above
  // Required to handle initial loading case before tasks have been retrieved from store
  if (isEmpty(tasks)) return null;

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
            idx={idx}
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