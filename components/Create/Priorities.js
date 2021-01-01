import React from 'react';
import { View } from 'react-native';

import { priorities } from '../../helpers';
import { Text } from '../common';
import Priority from './Priority';

export default function Priorities(props) {
  return (
    <View>
      <Text>Priority</Text>

      {priorities.map((priority, idx) => (
        <Priority key={priority} idx={idx} {...props} />
      ))}
    </View>
  );
}