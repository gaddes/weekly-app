import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';

import userModel from '../data/store/user';
import tasksModel from '../data/store/tasks';
import { priorities, archiveLimitFree, archiveLimitPro } from '../helpers';
import { ArchiveItems, Priority, Editor } from '../components';
import { Text, Title, Subtitle, HorizontalLine, PageContainer } from '../components/common';

export default function ArchiveView() {
  const { selectIsPro } = userModel.selectors;
  const isPro = useSelector(selectIsPro);
  const archiveLimit = isPro ? archiveLimitPro : archiveLimitFree;

  const { selectArchiveTasks } = tasksModel.selectors;
  const tasks = useSelector(selectArchiveTasks);
  const tasksAreEmpty = isEmpty(flatten(tasks));

  // This object will hold data for task currently being edited
  const [editedTask, setEditedTask] = useState(null);

  if (editedTask) return (
    <PageContainer title="Editor">
      <Editor
        editedTask={editedTask}
        setEditedTask={setEditedTask}
      />
    </PageContainer>
  );

  return (
    <PageContainer title="Archive">
      <Subtitle>This view shows uncompleted tasks from the previous week</Subtitle>

      {!isPro &&
        <>
          <Text style={styles.text}>
            Your archive is currently limited to your {archiveLimit} most recent tasks.
          </Text>

          <Text style={styles.text}>
            Upgrade to get an unlimited archive!
          </Text>
        </>
      }

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
  text: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },

  task: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});