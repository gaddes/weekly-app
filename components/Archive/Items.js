import React from 'react';
import Item from './Item';

export default function ArchiveItems(props) {
  if (!props.items.length) return null;

  return props.items.map(task => (
    <Item
      key={task.id}
      title={task.title}
    />
  ));
}