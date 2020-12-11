import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import tasksModel from '../data/store/tasks';
import { priorities } from '../helpers';
import { ArchiveItems, Priority, Editor } from '../components';
import { Text } from '../components/common';

export default function ArchiveView() {
  const { selectArchiveTasks } = tasksModel.selectors;
  const tasks = useSelector(selectArchiveTasks);

  // This object will hold data for task currently being edited
  const [editedTask, setEditedTask] = useState(null);

  // TODO: add loading spinner and/or "no archive tasks" screen
  if (!tasks) return null;

  if (editedTask) return (
    <Editor
      editedTask={editedTask}
      setEditedTask={setEditedTask}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Archive
      </Text>

      <View style={styles.line} />

      <Text style={styles.subtitle}>
        This view shows uncompleted tasks from last week
      </Text>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginVertical: 24,
    marginHorizontal: 24,
  },

  line: {
    height: 3,
    width: '90%',
    backgroundColor: 'black',
    marginVertical: 16,
  },

  title: {
    fontSize: 32,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
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