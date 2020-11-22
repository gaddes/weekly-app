import React from 'react';
import { Provider } from 'react-redux';

import Main from './Main';
import { store } from './data/store';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
