import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { selectArchiveTasks } from '../data/reducers/taskSlice';
import { priorities } from '../helpers';
import { ArchiveItems, Priority } from '../components';

export default function ArchiveView() {
  const tasks = useSelector(selectArchiveTasks);

  // TODO: add loading spinner and/or "no archive tasks" screen
  if (!tasks) return null;

  return (
    <ScrollView>
      {tasks.map((items, idx) => (
        <View key={idx}>
          <Priority
            priority={priorities[idx]}
            items={items}
          />
          <ArchiveItems items={items} />
        </View>
      ))}
    </ScrollView>
  );
}