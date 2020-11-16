import { createStore, action, thunk } from 'easy-peasy';

import mockData from '../mockData';

const store = createStore({
  tasks: [],

  addTask: action((state, payload) => {
    // TODO: rewrite this logic
    state.tasks.push({ text: payload, done: false });
  }),

  setInitialState: action((state, payload) => {
    state.tasks = payload;
  }),

  fetchInitialState: thunk(async actions => {
    // const data = await fetchData();
    const data = mockData;
    actions.setInitialState(data);
  })
});

export default store;