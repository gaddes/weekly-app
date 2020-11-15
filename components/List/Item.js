import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Toggle from './Toggle';
import Name from './Name';
import Description from './Description';
import Edit from './Edit';

export default function ListItem() {
  // For dev only. In reality this should be based on props.completed.
  // Also note that perhaps we can take value directly from core data
  //  and useState may not be required at all...
  const [completed, setCompleted] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Toggle
          completed={completed}
          setCompleted={setCompleted}
        />

        <Name
          completed={completed}
          editing={editing}
          setEditing={setEditing}
        />

        <Edit editing={editing} />
      </View>

      <Description editing={editing} />
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