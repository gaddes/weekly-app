import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';

import tasksModel from '../data/store/tasks';
import { priorities } from '../helpers';
import { ArchiveItems, Priority, Editor } from '../components';
import { Text, Title, Subtitle, HorizontalLine, PageContainer } from '../components/common';

export default function ArchiveView() {
  const { selectArchiveTasks } = tasksModel.selectors;
  const tasks = useSelector(selectArchiveTasks);
  const tasksAreEmpty = isEmpty(flatten(tasks));

  // This object will hold data for task currently being edited
  const [editedTask, setEditedTask] = useState(null);

  if (editedTask) return (
    <Editor
      editedTask={editedTask}
      setEditedTask={setEditedTask}
    />
  );

  return (
    <PageContainer title="Archive">
      <Subtitle>This view shows uncompleted tasks from the previous week</Subtitle>

      {tasksAreEmpty && (
        <>
          <Text>Congratulations!</Text>
          <Subtitle>You have no uncompleted tasks</Subtitle>
        </>
      )}

      {tasks.map((items, idx) => (
        <View key={idx} style={styles.task}>
          <Priority
            priority={priorities[idx]}
            items={items}
          />

          <ArchiveItems
            items={items}
            setEditedTask={setEditedTask}
          />
        </View>
      ))}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  task: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});