import { createSlice } from '@reduxjs/toolkit';

import mockData from '../mockData';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      // TODO: rewrite this logic?
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tasks.push({ text: action.payload, done: false });
    },

    setInitialState: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, setInitialState } = tasksSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchInitialState())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchInitialState = () => dispatch => {
  // const data = await fetchData();
  const data = mockData;
  dispatch(setInitialState(data));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.tasks.tasks)`
export const selectTasks = state => state.tasks.tasks;
export const selectCurrentTasks = state => state.tasks.tasks[0];
export const selectArchiveTasks = state => state.tasks.tasks[1];

export default tasksSlice.reducer;