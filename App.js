import React from 'react';
import { StoreProvider } from 'easy-peasy';

import Main from './Main';
import { store } from './data/store';

export default function App() {
  return (
    <StoreProvider store={store}>
      <Main />
    </StoreProvider>
  );
}
