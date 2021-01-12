import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import flatten from 'lodash/flatten';
import find from 'lodash/find';
import get from 'lodash/get';

import tasksModel from '../data/store/tasks';
import { Create, Edit } from '../components';
import { PageContainer } from '../components/common';

export default function EditorView({ navigation, route }) {
  const { params } = route;
  const { selectCurrentTasks } = tasksModel.selectors;
  const tasks = useSelector(selectCurrentTasks);

  useEffect(() => {
    return navigation.addListener('blur', () => {
      // Reset ID param onBlur to clear the cache
      navigation.setParams({ id: null });
    });
  }, [navigation]);

  // Flatten array of days for more efficient searching
  const allTasks = flatten(tasks);

  const task = get(params, 'id')
    // Use spread operator to prevent mutating original task
    ? {...find(allTasks, ['id', params.id])}
    : undefined;

  if (task) {
    tasks.forEach((day, idx) => {
      const taskFound = find(day, ['id', params.id]);
      // Add day to task object
      if (taskFound) { task.day = idx }
    });
  }

  const Component = task ? Edit : Create;

  return (
    <PageContainer>
      <Component task={task} />
    </PageContainer>
  );
}