import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { Text } from '../common';

export default function Title(props) {
  const toggleEdit = () => {
    props.setEditing(!props.editing);
  };

  return (
    <TouchableOpacity
      onPress={toggleEdit}
      style={styles(props).title}
    >
      <Text style={styles(props).text}>
        {props.title}
      </Text>

      {/* Show icon when item contains a description */}
      {/* Provide double-exclamation to prevent react native error */}
      {/* https://stackoverflow.com/questions/38327133/react-native-unexpected-view-type-nested-under-text-node */}
      {!!props.description && (
        <Feather
          style={{ marginLeft: 12 }}
          name="align-left"
          size={18}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = props => StyleSheet.create({
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 16,

    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '100%',
  },

  text: {
    fontSize: 20,
    textDecorationLine: props.completed ? 'line-through' : 'none',
  },
});