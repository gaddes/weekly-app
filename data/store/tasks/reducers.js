import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    current: undefined,
    archive: undefined,
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

    setArchive: (state, action) => {
      state.archive = action.payload;
    },
  },
});

// These actions can be re-exported (if required) from a separate 'actions' file,
//  but they should never be imported by a component directly from here.
export const { setInitialState, setCurrent, setArchive } = taskSlice.actions;

export default taskSlice.reducer;