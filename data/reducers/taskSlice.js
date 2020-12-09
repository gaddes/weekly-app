import { createSlice, createSelector } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';
import find from 'lodash/find';
import { v4 as uuidv4 } from 'uuid';

import mockData, { current, archive } from '../mockData';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    current: [],
    archive: [],
  },
  reducers: {
    addTask: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { day, title, description, priority } = action.payload;

      state.current[day].push({
        id: uuidv4(),
        title,
        description,
        completed: false,
        priority,
        dateCreated: Date.now(),
      });
    },

    setInitialState: (state, action) => {
      const { current, archive } = action.payload;

      state.current = current;
      state.archive = archive;
    },

    setCompleted: (state, action) => {
      // Select item by ID
      const item = find(
        // Flatten current tasks into single array to allow easier searching by ID
        flatten(state.current),
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
  // TODO: fetch REAL data from core data
  dispatch(setInitialState({ current, archive }));
};

export const toggleCompleted = id => dispatch => {
  dispatch(setCompleted(id));
};

// Selectors
export const selectCurrentTasks = state => state.tasks.current;
export const selectArchiveTasks = state => state.tasks.archive;

export default tasksSlice.reducer;