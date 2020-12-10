import { createSlice } from '@reduxjs/toolkit';

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
  },
});

// These actions will be re-exported from a separate 'actions' file;
//  they should never be imported by a component directly from here.
export const { setInitialState, setCurrent } = taskSlice.actions;

export default taskSlice.reducer;