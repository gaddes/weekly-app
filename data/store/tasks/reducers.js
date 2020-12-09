import { createSlice } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';
import find from 'lodash/find';
import { v4 as uuidv4 } from 'uuid';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    current: [],
    archive: [],
  },
  reducers: {
    addTask: (state, action) => {
      const { day, title, description, priority } = action.payload;

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
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

// These actions will be re-exported from a separate 'actions' file;
//  they should never be imported by a component directly from here.
export const { addTask, setInitialState, setCompleted } = taskSlice.actions;

export default taskSlice.reducer;