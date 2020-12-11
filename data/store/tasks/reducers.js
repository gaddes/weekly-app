import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    current: [],
    archive: [],
    archivedDays: [],
  },
  reducers: {
    setInitialState: (state, action) => {
      const { current, archive, archivedDays } = action.payload;
      state.current = current;
      state.archive = archive;
      state.archivedDays = archivedDays;
    },

    setCurrent: (state, action) => {
      state.current = action.payload;
    },

    setArchive: (state, action) => {
      state.archive = action.payload;
    },

    setArchivedDays: (state, action) => {
      state.archivedDays = action.payload;
    },
  },
});

// These actions can be re-exported (if required) from a separate 'actions' file,
//  but they should never be imported by a component directly from here.
export const { setInitialState, setCurrent, setArchive, setArchivedDays } = taskSlice.actions;

export default taskSlice.reducer;