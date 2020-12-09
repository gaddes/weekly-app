import { createSlice } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';
import find from 'lodash/find';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    current: [],
    archive: [],
  },
  reducers: {
    setInitialState: (state, action) => {
      const { current, archive } = action.payload;
      state.current = current;
      state.archive = archive;
    },

    setCurrent: (state, action) => {
      state.current = action.payload;
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
export const { setInitialState, setCurrent, setCompleted } = taskSlice.actions;

export default taskSlice.reducer;