import React from 'react';
import { prioritise } from '../../helpers';
import Item from './Item';

export default function CurrentItems(props) {
  if (!props.items.length) return null;

  // Order by priority high > medium > low
  const tasks = prioritise(props.items);

  return (
    tasks.map(task => (
      <Item
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        completed={task.completed}
        priority={task.priority}
        navigate={props.navigate}
      />
    ))
  );
}