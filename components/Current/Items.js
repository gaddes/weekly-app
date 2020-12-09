import React from 'react';

import Item from './Item';

export default function CurrentItems(props) {
  if (!props.items.length) return null;

  return (
    props.items.map(task => (
      <Item
        key={task.id}
        id={task.id}
        dayIdx={props.dayIdx}
        title={task.title}
        description={task.description}
        completed={task.completed}
        priority={task.priority}
      />
    ))
  );
}