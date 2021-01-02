import React from 'react';

import { Create } from '../components';
import { Title, HorizontalLine, PageContainer } from '../components/common';

export default function CreateView() {
  return (
    <PageContainer>
      <Title>Create</Title>
      <HorizontalLine />

      <Create />
    </PageContainer>
  );
}