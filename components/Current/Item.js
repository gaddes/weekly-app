import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { SwipeableRow } from '../common';
import Toggle from './Toggle';
import Title from './Title';
import Description from './Description';
// TODO: delete "Delete" component if not required, now that swipeable row has been implemented
// import Delete from './Delete';

export default function ListItem(props) {
  const [editing, setEditing] = useState(false);

  return (
    <SwipeableRow id={props.id}>
      <View style={styles.container}>
        <View style={styles.item}>
          <Toggle
            id={props.id}
            priority={props.priority}
            completed={props.completed}
          />

          <Title
            title={props.title}
            description={props.description}
            completed={props.completed}
            editing={editing}
            setEditing={setEditing}
          />

          {/*<Delete*/}
          {/*  id={props.id}*/}
          {/*  editing={editing}*/}
          {/*/>*/}
        </View>

        <Description
          description={props.description}
          editing={editing}
        />
      </View>
    </SwipeableRow>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // TODO: update this!
    // Hacky way to match the current (and very boring) background color
    backgroundColor: 'rgb(242, 242, 242)',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});