import { createSlice, createSelector } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';
import find from 'lodash/find';
import { v4 as uuidv4 } from 'uuid';

import mockData from '../mockData';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { day, title, description, priority } = action.payload;

      state.tasks[0][day].push({
        id: uuidv4(),
        title,
        description,
        completed: false,
        priority,
        dateCreated: new Date(),
      });
    },

    setInitialState: (state, action) => {
      state.tasks = action.payload;
    },

    setCompleted: (state, action) => {
      // Select item by ID
      const item = find(
        // Flatten current tasks into single array to allow easier searching by ID
        flatten(state.tasks[0]),
        // action.payload is the ID of the item we want to toggle completed
        { id: action.payload }
      );

      item.completed = !item.completed;
    },
  },
});

export const { addTask, setInitialState, setCompleted } = tasksSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchInitialState())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchInitialState = () => dispatch => {
  // const data = await fetchData();
  const data = mockData;
  dispatch(setInitialState(data));
};

export const toggleCompleted = id => dispatch => {
  dispatch(setCompleted(id));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.tasks.tasks)`
export const selectTasks = state => state.tasks.tasks;

export const selectCurrentTasks = createSelector(
  selectTasks,
  tasks => tasks[0],
);

export const selectArchiveTasks = createSelector(
  selectTasks,
  tasks => tasks[1],
);

export default tasksSlice.reducer;