import React from 'react';
import { ScrollView } from 'react-native';

import { Create } from '../components';

export default function CreateView() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Create />
    </ScrollView>
  );
}