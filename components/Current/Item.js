import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Toggle from './Toggle';
import Title from './Title';
import Description from './Description';
import Delete from './Delete';

export default function ListItem(props) {
  const [editing, setEditing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Toggle
          id={props.id}
          priority={props.priority}
          completed={props.completed}
        />

        <Title
          title={props.title}
          completed={props.completed}
          editing={editing}
          setEditing={setEditing}
        />

        <Delete
          editing={editing}
        />
      </View>

      <Description
        description={props.description}
        editing={editing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});