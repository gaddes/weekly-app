import React from 'react';
import { View } from 'react-native';

import { days } from '../../helpers';
import { Text } from '../common';
import Day from './Day';

export default function Days(props) {
  return (
    <View>
      <Text>Day</Text>

      {days.map((day, idx) => (
        <Day
          key={day}
          idx={idx}
          day={day}
          {...props}
        />
      ))}
    </View>
  );
}