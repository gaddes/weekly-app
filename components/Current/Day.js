import React from 'react';
import { StyleSheet, View } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';

import { Text } from '../common';
import { useDayIndices } from '../../hooks';
import { days } from '../../helpers';

export default function Day(props) {
  if (isEmpty(props.items)) return null;

  const { currentDayIdx } = useDayIndices();

  const day = days[props.idx];
  const isToday = props.idx === currentDayIdx;
  const isNextWeek = some(props.items, 'nextWeek');

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        {day}
      </Text>

      {isToday && <Text style={styles.textSmall}>[today]</Text>}
      {isNextWeek && <Text style={styles.textSmall}>[next week]</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  text: {
    marginLeft: 20,
    marginRight: 12,
  },

  textSmall: {
    fontSize: 16,
  },
});