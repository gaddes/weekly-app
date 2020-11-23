import React from 'react';

import Item from './Item';

export default function ListItems(props) {
  if (!props.items.length) return null;

  return (
    props.items.map(task => (
      <Item
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        completed={task.completed}
        priority={task.priority}
      />
    ))
  );
}